import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { store } from '../store'
import { clearAuth, validateToken } from '../store/authSlice'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const token = store.getState().auth.token
    if (!token) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }

    try {
      await store.dispatch(validateToken()).unwrap()
    } catch {
      store.dispatch(clearAuth())
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }

    if (location.pathname === '/') {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: () => <Outlet />,
})
