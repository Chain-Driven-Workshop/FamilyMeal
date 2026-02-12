import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Signup } from '../components/auth/Signup'

export const Route = createFileRoute('/signup')({
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
