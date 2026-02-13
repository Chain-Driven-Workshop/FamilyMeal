import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  Box,
  Paper,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { ingredients, recipes } from '../../data/mockData'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)

  return (
    <Box
      className="external-page"
      sx={{
        minHeight: 'calc(100vh - 57px)',
        p: { xs: 2, md: 4 },
      }}
    >
      <Paper sx={{ maxWidth: 1100, mx: 'auto', p: { xs: 2, md: 3 }, backgroundColor: '#fff' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Dashboard
        </Typography>
        <Tabs value={tab} onChange={(_, newValue: number) => setTab(newValue)} sx={{ mb: 2 }}>
          <Tab label="Recipes" />
          <Tab label="Ingredients" />
        </Tabs>

        {tab === 0 ? (
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recipes.map((recipe) => (
                  <TableRow
                    key={recipe.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      void navigate({ to: '/recipes/$recipeId', params: { recipeId: recipe.id } })
                    }}
                  >
                    <TableCell>{recipe.name}</TableCell>
                    <TableCell>{recipe.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredients.map((ingredient) => (
                  <TableRow
                    key={ingredient.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      void navigate({
                        to: '/ingredients/$ingredientId',
                        params: { ingredientId: ingredient.id },
                      })
                    }}
                  >
                    <TableCell>{ingredient.name}</TableCell>
                    <TableCell>{ingredient.description}</TableCell>
                    <TableCell>${ingredient.cost.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  )
}
