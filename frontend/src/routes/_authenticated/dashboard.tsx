import { createFileRoute } from '@tanstack/react-router'
import { Box, Typography } from '@mui/material'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Dashboard</Typography>
    </Box>
  )
}
