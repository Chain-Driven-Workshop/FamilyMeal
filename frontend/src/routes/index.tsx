import { createFileRoute } from '@tanstack/react-router'
import { Box, Paper, Stack, Typography } from '@mui/material'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Box
      className="external-page"
      sx={{
        minHeight: 'calc(100vh - 57px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 900,
          p: { xs: 3, md: 5 },
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          color: '#fff',
          backdropFilter: 'blur(3px)',
        }}
      >
        <Stack spacing={2}>
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, color: '#fff', lineHeight: 1.1, textTransform: 'none' }}
          >
            Scalar Recipe Book
          </Typography>
          <Typography variant="h6" sx={{ color: '#fff', maxWidth: 760 }}>
            Create and store all your recipes in one place, then scale any recipe by any ingredient
            quantity with precision. Scalar Recipe Book also helps you plan smarter by providing cost
            estimates for the ingredients in each recipe.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}
