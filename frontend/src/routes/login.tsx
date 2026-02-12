import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Login } from '../components/auth/Login'

export const Route = createFileRoute('/login')({
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
