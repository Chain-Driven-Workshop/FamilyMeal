import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { ingredients } from '../../data/mockData'

export const Route = createFileRoute('/_authenticated/ingredients/$ingredientId')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { ingredientId } = Route.useParams()

  const ingredient = useMemo(
    () => ingredients.find((item) => item.id === ingredientId),
    [ingredientId]
  )

  const [formData, setFormData] = useState(() => ({
    name: ingredient?.name ?? '',
    description: ingredient?.description ?? '',
    cost: ingredient?.cost.toString() ?? '',
    unit: ingredient?.unit ?? '',
    allergens: ingredient?.allergens ?? '',
  }))

  if (!ingredient) {
    return (
      <Box className="external-page" sx={{ minHeight: 'calc(100vh - 57px)', p: 3 }}>
        <Paper sx={{ maxWidth: 900, mx: 'auto', p: 3, backgroundColor: '#fff' }}>
          <Alert severity="error">Ingredient not found.</Alert>
        </Paper>
      </Box>
    )
  }

  return (
    <Box className="external-page" sx={{ minHeight: 'calc(100vh - 57px)', p: { xs: 2, md: 4 } }}>
      <Paper sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 3 }, backgroundColor: '#fff' }}>
        <Stack spacing={2}>
          <Typography variant="h4">Edit Ingredient</Typography>
          <TextField label="ID" value={ingredient.id} InputProps={{ readOnly: true }} fullWidth />
          <TextField
            label="Name"
            value={formData.name}
            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
            fullWidth
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(event) => setFormData({ ...formData, description: event.target.value })}
            fullWidth
          />
          <TextField
            label="Cost"
            type="number"
            value={formData.cost}
            onChange={(event) => setFormData({ ...formData, cost: event.target.value })}
            fullWidth
          />
          <TextField
            label="Unit"
            value={formData.unit}
            onChange={(event) => setFormData({ ...formData, unit: event.target.value })}
            fullWidth
          />
          <TextField
            label="Allergens"
            value={formData.allergens}
            onChange={(event) => setFormData({ ...formData, allergens: event.target.value })}
            fullWidth
          />
          <Stack direction="row" spacing={1.5}>
            <Button variant="contained" onClick={() => void navigate({ to: '/dashboard' })}>
              Save (Stub)
            </Button>
            <Button variant="outlined" onClick={() => void navigate({ to: '/dashboard' })}>
              Back to Dashboard
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}
