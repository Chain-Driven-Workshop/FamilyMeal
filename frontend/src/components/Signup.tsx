import React, { useState, ChangeEvent, SyntheticEvent } from 'react';
import api from '../api/axios';
import { AuthResponse } from '../types/auth';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      // We specify the expected response shape in the post call
      const response = await api.post<AuthResponse>('/signup', {
        user: formData
      });

      const token = response.headers.authorization;
      if (token) {
        localStorage.setItem('token', token);
        console.log('User data:', response.data.data);
        alert("Account created successfully!");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.status?.message || "An error occurred";
      alert(errorMessage);
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Signup;