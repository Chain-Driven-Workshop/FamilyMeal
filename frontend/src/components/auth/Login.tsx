import { useState, type ChangeEvent, type SyntheticEvent } from 'react'
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import api from '../../api/axios'
import { AuthResponse } from '../../types/auth'

type LoginProps = {
  onSuccess?: (token: string) => void
}

export const Login = ({ onSuccess }: LoginProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await api.post<AuthResponse>('/login', {
        user: formData,
      })

      // Devise-JWT returns the token in the 'authorization' header
      const token = response.headers.authorization

      if (token) {
        localStorage.setItem('token', token)
        onSuccess?.(token)
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ||
        'Invalid email or password.'
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
        Login
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
          {error ? <Alert severity="error">{error}</Alert> : null}
          <Button type="submit" variant="contained" disabled={loading} fullWidth>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Stack>
      </Box>
    </Paper>
  )
}
