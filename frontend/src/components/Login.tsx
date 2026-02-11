import React, { useState, ChangeEvent } from 'react';
import api from '../api/axios';
import { AuthResponse } from '../types/auth';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post<AuthResponse>('/login', {
        user: formData
      });

      // Devise-JWT returns the token in the 'authorization' header
      const token = response.headers.authorization;
      
      if (token) {
        localStorage.setItem('token', token);
        // You would typically update a Global Context or Redux store here
        window.location.href = '/dashboard'; 
      }
    } catch (error: any) {
      console.error("Login error:", error.response?.data);
      alert(error.response?.data?.error || "Invalid email or password.");
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

export default Login;