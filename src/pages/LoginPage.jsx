import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import React, { useContext } from 'react';

function LoginPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('final password to submit =>', password);

    try {
      const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        alert('Login failed');
        return;
      }

      const data = await res.json();
      console.log('Login response:', data);

      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      setCurrentUser(data.user); 
      navigate('/books');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-10 bg-white p-6 shadow rounded-md'>
      <h2 className='text-2xl font-bold mb-4'>Login</h2>
      <form onSubmit={handleSubmit}>
        <label className='block mb-2 font-semibold'>Email</label>
        <input
          type='text'
          className='border w-full p-2 mb-4'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className='block mb-2 font-semibold'>Password</label>
        <input
          type='password'
          className='border w-full p-2 mb-4'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type='submit'
          className='bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600'
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
