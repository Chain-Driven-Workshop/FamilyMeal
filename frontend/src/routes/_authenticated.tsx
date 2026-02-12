import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem('token')
    if (!token) {
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
