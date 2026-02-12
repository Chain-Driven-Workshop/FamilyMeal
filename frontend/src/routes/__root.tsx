import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/login" className="[&.active]:font-bold">Login</Link>
        <Link to="/signup" className="[&.active]:font-bold">Signup</Link>
        <Link to="/dashboard" className="[&.active]:font-bold">Dashboard</Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})
