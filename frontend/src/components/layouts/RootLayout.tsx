import { Link as RouterLink, Outlet, useNavigate } from '@tanstack/react-router'
import { Box, Button, Divider, Stack } from '@mui/material'
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
      <Box sx={{ px: 2, py: 1.5 }}>
        {isAuthenticated ? (
          <Stack direction="row" spacing={1.5}>
            <Button component={RouterLink} to="/dashboard" variant="text">
              Dashboard
            </Button>
            <Button type="button" onClick={handleLogout} variant="outlined" color="inherit">
              Logout
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1.5}>
            <Button component={RouterLink} to="/login" variant="text">
              Login
            </Button>
            <Button component={RouterLink} to="/signup" variant="text">
              Signup
            </Button>
          </Stack>
        )}
      </Box>
      <Divider />
      <Outlet />
    </>
  )
}
