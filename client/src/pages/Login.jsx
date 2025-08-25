// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Login failed');
      }

      // Save token in state (if handler provided) and in localStorage
      if (typeof setToken === 'function') {
        setToken(data.token);
      }
      localStorage.setItem('token', data.token);

      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.message);
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-800">
      <div className="bg-gray-700 p-8 rounded-lg shadow-xl w-full max-w-sm">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit}>
          {message && (
            <div className="mb-4 p-3 rounded-md bg-red-500 text-white text-center">
              {message}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-300 font-medium mb-1">Username</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md border border-gray-600 bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-emerald-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
