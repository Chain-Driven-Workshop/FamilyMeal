import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { Signup } from '../components/auth/Signup'

export const Route = createFileRoute('/signup')({
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
    <Signup
      onSuccess={() => {
        void navigate({ to: '/dashboard', replace: true })
      }}
    />
  )
}
