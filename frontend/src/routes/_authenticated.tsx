import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'
import { store } from '../store'
import { clearAuth, validateToken } from '../store/authSlice'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    if (location.pathname === '/') {
      return
    }

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
  },
  component: () => <Outlet />,
})
