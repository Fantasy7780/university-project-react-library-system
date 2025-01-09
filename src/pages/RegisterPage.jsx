import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 

  const role = 'user';

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); 

    const newUser = {
      firstName,
      lastName,
      phoneNumber,
      userName,
      email,
      password,
      role,
    };

    console.log('Registering =>', newUser);

    try {
      const res = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) {
        console.error('Register failed:', await res.json());
        alert('Register failed');
        setLoading(false); 
        return;
      }

      const data = await res.json();
      console.log('Register success =>', data);

      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      alert('Register success!');
      navigate('/books'); 
    } catch (error) {
      console.error('Register error:', error);
      alert('Register error');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={handleSubmit}>
            <h2 className='text-3xl text-center font-semibold mb-6'>
              Register
            </h2>

            {/* User Name */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                User Name
              </label>
              <input
                type='text'
                className='border rounded w-full py-2 px-3'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* First Name */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                First Name
              </label>
              <input
                type='text'
                className='border rounded w-full py-2 px-3'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Last Name
              </label>
              <input
                type='text'
                className='border rounded w-full py-2 px-3'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Phone Number */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Phone Number
              </label>
              <input
                type='text'
                className='border rounded w-full py-2 px-3'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Email
              </label>
              <input
                type='email'
                className='border rounded w-full py-2 px-3'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Password
              </label>
              <input
                type='password'
                className='border rounded w-full py-2 px-3'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type='submit'
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                disabled={loading} 
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;

