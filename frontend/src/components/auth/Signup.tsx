import { useState, type ChangeEvent, type SyntheticEvent } from 'react';
import api from '../../api/axios';
import { AuthResponse } from '../../types/auth';

type SignupProps = {
  onSuccess?: () => void;
};

export const Signup = ({ onSuccess }: SignupProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<AuthResponse>('/signup', {
        user: formData
      });

      const token = response.headers.authorization;
      if (token) {
        localStorage.setItem('token', token);
        onSuccess?.();
      }
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { status?: { message?: string } } } })?.response?.data
          ?.status?.message || 'An error occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password_confirmation" 
          placeholder="Confirm Password" 
          onChange={handleChange} 
          required 
        />
        {error ? <div role="alert">{error}</div> : null}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
    </div>
  );
};
