import { useState, type ChangeEvent, type SyntheticEvent } from 'react'
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import api from '../../api/axios'
import { AuthResponse } from '../../types/auth'

type SignupProps = {
  onSuccess?: (token: string) => void
}

export const Signup = ({ onSuccess }: SignupProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await api.post<AuthResponse>('/signup', {
        user: formData,
      })

      const token = response.headers.authorization
      if (token) {
        localStorage.setItem('token', token)
        onSuccess?.(token)
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { status?: { message?: string } } } })?.response?.data
          ?.status?.message || 'An error occurred'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        maxWidth: 420,
        mx: 'auto',
        p: 3,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Sign Up
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            id="email"
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            id="password"
            type="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            label="Confirm Password"
            value={formData.password_confirmation}
            onChange={handleChange}
            required
            fullWidth
          />
          {error ? <Alert severity="error">{error}</Alert> : null}
          <Button type="submit" variant="contained" disabled={loading} fullWidth>
            {loading ? 'Creating account...' : 'Register'}
          </Button>
        </Stack>
      </Box>
    </Paper>
  )
}
