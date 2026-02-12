import { Link, Outlet, useNavigate } from '@tanstack/react-router'

export function RootLayout() {
  const navigate = useNavigate()
  const isAuthenticated = Boolean(localStorage.getItem('token'))

  const handleLogout = () => {
    localStorage.removeItem('token')
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
