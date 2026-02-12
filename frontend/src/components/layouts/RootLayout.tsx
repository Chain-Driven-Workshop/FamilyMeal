import { Link, Outlet, useNavigate } from '@tanstack/react-router'
import api from '../../api/axios'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { clearAuth } from '../../store/authSlice'

export function RootLayout() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  const handleLogout = () => {
    void api.delete('/logout').catch(() => undefined)
    localStorage.removeItem('token')
    dispatch(clearAuth())
    void navigate({ to: '/login', replace: true })
  }

  return (
    <>
      <div className="p-2 flex gap-2">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="[&.active]:font-bold">
              Dashboard
            </Link>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="[&.active]:font-bold">
              Login
            </Link>
            <Link to="/signup" className="[&.active]:font-bold">
              Signup
            </Link>
          </>
        )}
      </div>
      <hr />
      <Outlet />
    </>
  )
}
