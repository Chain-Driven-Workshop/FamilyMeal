import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { Box } from '@mui/material'
import { Login } from '../components/auth/Login'
import { store } from '../store'
import { setToken, validateToken } from '../store/authSlice'

export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    const token = store.getState().auth.token
    if (token) {
      try {
        await store.dispatch(validateToken()).unwrap()
        throw redirect({ to: '/dashboard' })
      } catch {
        // Token exists but is invalid; stay on login.
      }
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  return (
    <Box
      className="external-page"
      sx={{ minHeight: 'calc(100vh - 57px)', display: 'flex', alignItems: 'center', px: 2 }}
    >
      <Login
        onSuccess={(token) => {
          store.dispatch(setToken(token))
          void navigate({ to: '/dashboard', replace: true })
        }}
      />
    </Box>
  )
}
