import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { Login } from '../components/auth/Login'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const token = localStorage.getItem('token')
    if (token) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  return (
    <Login
      onSuccess={() => {
        void navigate({ to: '/dashboard', replace: true })
      }}
    />
  )
}
