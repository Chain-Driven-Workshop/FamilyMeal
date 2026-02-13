import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { ingredients as mockIngredients, recipes, type Ingredient } from '../../data/mockData'

export const Route = createFileRoute('/_authenticated/recipes/$recipeId')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { recipeId } = Route.useParams()

  const recipe = useMemo(() => recipes.find((item) => item.id === recipeId), [recipeId])

  const [formData, setFormData] = useState(() => ({
    name: recipe?.name ?? '',
    description: recipe?.description ?? '',
    instructions: recipe?.instructions ?? '',
    notes: recipe?.notes ?? '',
  }))
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<string[]>(
    recipe?.ingredients ?? []
  )
  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>(mockIngredients)
  const [ingredientToAdd, setIngredientToAdd] = useState<Ingredient | null>(null)
  const [isNewIngredientModalOpen, setIsNewIngredientModalOpen] = useState(false)
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    description: '',
    cost: '',
    unit: '',
    allergens: '',
  })

  const selectedIngredients = useMemo(
    () =>
      selectedIngredientIds
        .map((id) => availableIngredients.find((ingredient) => ingredient.id === id))
        .filter((ingredient): ingredient is Ingredient => Boolean(ingredient)),
    [availableIngredients, selectedIngredientIds]
  )

  const addIngredientToRecipe = (ingredient: Ingredient) => {
    if (!selectedIngredientIds.includes(ingredient.id)) {
      setSelectedIngredientIds((prev) => [...prev, ingredient.id])
    }
  }

  const handleCreateIngredient = () => {
    if (!newIngredient.name.trim()) {
      return
    }

    const createdIngredient: Ingredient = {
      id: `i-custom-${Date.now()}`,
      name: newIngredient.name.trim(),
      description: newIngredient.description.trim(),
      cost: Number.parseFloat(newIngredient.cost) || 0,
      unit: newIngredient.unit.trim() || 'unit',
      allergens: newIngredient.allergens.trim() || 'None',
    }

    setAvailableIngredients((prev) => [...prev, createdIngredient])
    addIngredientToRecipe(createdIngredient)
    setNewIngredient({
      name: '',
      description: '',
      cost: '',
      unit: '',
      allergens: '',
    })
    setIsNewIngredientModalOpen(false)
  }

  if (!recipe) {
    return (
      <Box className="external-page" sx={{ minHeight: 'calc(100vh - 57px)', p: 3 }}>
        <Paper sx={{ maxWidth: 900, mx: 'auto', p: 3, backgroundColor: '#fff' }}>
          <Alert severity="error">Recipe not found.</Alert>
        </Paper>
      </Box>
    )
  }

  return (
    <Box className="external-page" sx={{ minHeight: 'calc(100vh - 57px)', p: { xs: 2, md: 4 } }}>
      <Paper sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 3 }, backgroundColor: '#fff' }}>
        <Stack spacing={2}>
          <Typography variant="h4">Edit Recipe</Typography>
          <TextField label="ID" value={recipe.id} InputProps={{ readOnly: true }} fullWidth />
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
            label="Instructions"
            value={formData.instructions}
            onChange={(event) => setFormData({ ...formData, instructions: event.target.value })}
            multiline
            minRows={4}
            fullWidth
          />
          <TextField
            label="Notes"
            value={formData.notes}
            onChange={(event) => setFormData({ ...formData, notes: event.target.value })}
            multiline
            minRows={3}
            fullWidth
          />
          <Stack spacing={1.5}>
            <Typography variant="h6">Ingredients</Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5} alignItems="center">
              <Autocomplete
                value={ingredientToAdd}
                onChange={(_, value) => {
                  setIngredientToAdd(value)
                  if (value) {
                    addIngredientToRecipe(value)
                    setIngredientToAdd(null)
                  }
                }}
                options={availableIngredients.filter(
                  (ingredient) => !selectedIngredientIds.includes(ingredient.id)
                )}
                getOptionLabel={(option) => `${option.name} (${option.id})`}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Add Ingredient" />}
              />
              <Button
                variant="outlined"
                onClick={() => {
                  setIsNewIngredientModalOpen(true)
                }}
              >
                New Ingredient
              </Button>
            </Stack>
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{ maxHeight: 10 * 53, overflowY: 'auto' }}
            >
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Cost</TableCell>
                    <TableCell align="center">Remove</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedIngredients.map((ingredient) => (
                    <TableRow key={ingredient.id}>
                      <TableCell>{ingredient.name}</TableCell>
                      <TableCell>{ingredient.description}</TableCell>
                      <TableCell align="right">${ingredient.cost.toFixed(2)}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          aria-label={`Remove ${ingredient.name}`}
                          onClick={() => {
                            setSelectedIngredientIds((prev) =>
                              prev.filter((id) => id !== ingredient.id)
                            )
                          }}
                        >
                          X
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
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

      <Dialog
        open={isNewIngredientModalOpen}
        onClose={() => {
          setIsNewIngredientModalOpen(false)
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>New Ingredient</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Name"
              value={newIngredient.name}
              onChange={(event) =>
                setNewIngredient((prev) => ({ ...prev, name: event.target.value }))
              }
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={newIngredient.description}
              onChange={(event) =>
                setNewIngredient((prev) => ({ ...prev, description: event.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Cost"
              type="number"
              value={newIngredient.cost}
              onChange={(event) =>
                setNewIngredient((prev) => ({ ...prev, cost: event.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Unit"
              value={newIngredient.unit}
              onChange={(event) =>
                setNewIngredient((prev) => ({ ...prev, unit: event.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Allergens"
              value={newIngredient.allergens}
              onChange={(event) =>
                setNewIngredient((prev) => ({ ...prev, allergens: event.target.value }))
              }
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsNewIngredientModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateIngredient}>
            Create Ingredient
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
