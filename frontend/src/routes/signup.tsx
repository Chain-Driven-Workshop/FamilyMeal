import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { Signup } from '../components/auth/Signup'
import { store } from '../store'
import { setToken, validateToken } from '../store/authSlice'

export const Route = createFileRoute('/signup')({
  beforeLoad: async () => {
    const token = store.getState().auth.token
    if (token) {
      try {
        await store.dispatch(validateToken()).unwrap()
        throw redirect({ to: '/dashboard' })
      } catch {
        // Token exists but is invalid; stay on signup.
      }
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  return (
    <Signup
      onSuccess={(token) => {
        store.dispatch(setToken(token))
        void navigate({ to: '/dashboard', replace: true })
      }}
    />
  )
}
