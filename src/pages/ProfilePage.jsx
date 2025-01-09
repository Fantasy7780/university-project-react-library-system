import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);
  const [userName, setUserName] = useState(currentUser.userName);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState(''); 
  const [confirmFirstName, setConfirmFirstName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...currentUser,
      firstName,
      lastName,
      phoneNumber,
      userName,
      email,
      password: password || currentUser.password, 
    };

    try {
      const res = await fetch(`http://localhost:8000/users/${currentUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) {
        alert('Failed to update user information');
        return;
      }

      const updatedData = await res.json();

     
      localStorage.setItem('user', JSON.stringify(updatedData));
      setCurrentUser(updatedData);

      alert('Profile updated successfully!');
      navigate('/'); 
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  // delete account
  const handleDeleteAccount = async () => {
    if (!confirmFirstName) {
      alert('Please enter your first name to confirm account deletion.');
      return;
    }

    if (confirmFirstName !== currentUser.firstName) {
      alert('First name is incorrect. Account deletion failed.');
      return;
    }

    const confirm = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:8000/users/${currentUser.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        alert('Failed to delete account');
        return;
      }

      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setCurrentUser(null);

      alert('Account deleted successfully!');
      navigate('/register'); 
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Error deleting account');
    }
  };

  return (
    <div className='max-w-md mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700'>First Name</label>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='w-full px-3 py-2 border rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Last Name</label>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='w-full px-3 py-2 border rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Phone Number</label>
          <input
            type='text'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className='w-full px-3 py-2 border rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>User Name</label>
          <input
            type='text'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className='w-full px-3 py-2 border rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-3 py-2 border rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-3 py-2 border rounded'
            placeholder='Leave blank to keep current password'
          />
        </div>
        <button
          type='submit'
          className='w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600'
        >
          Save Changes
        </button>
      </form>

      <div className='mt-6'>
        <h3 className='text-xl font-bold text-red-600 mb-4'>Delete Account</h3>
        <div className='mb-4'>
          <label className='block text-gray-700'>Confirm First Name</label>
          <input
            type='text'
            value={confirmFirstName}
            onChange={(e) => setConfirmFirstName(e.target.value)}
            className='w-full px-3 py-2 border rounded'
            placeholder='Enter your first name to confirm'
          />
        </div>
        <button
          onClick={handleDeleteAccount}
          className='w-full bg-red-500 text-white py-2 rounded hover:bg-red-600'
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
