import { useState, type ChangeEvent, type SyntheticEvent } from 'react';
import api from '../../api/axios';
import { AuthResponse } from '../../types/auth';

type LoginProps = {
  onSuccess?: () => void;
};

export const Login = ({ onSuccess }: LoginProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<AuthResponse>('/login', {
        user: formData
      });

      // Devise-JWT returns the token in the 'authorization' header
      const token = response.headers.authorization;
      
      if (token) {
        localStorage.setItem('token', token);
        onSuccess?.();
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ||
        'Invalid email or password.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error ? <div role="alert">{error}</div> : null}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

// TODO replace with app-wide styling
const styles = {
  container: { maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' },
  form: { display: 'flex', flexDirection: 'column' as const, gap: '1rem' },
  inputGroup: { display: 'flex', flexDirection: 'column' as const, gap: '0.5rem' }
};
