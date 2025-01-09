import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import React, { useContext } from 'react';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/login'); 
  };

  return (
    <nav className='bg-indigo-700 border-b border-indigo-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
              <img className='h-10 w-auto' src={logo} alt='React Library' />
              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                React Library
              </span>
            </NavLink>
            <div className='md:ml-auto'>
              <div className='flex space-x-2'>
                <NavLink to='/' className={linkClass}>
                  Home
                </NavLink>
                <NavLink to='/books' className={linkClass}>
                  Books
                </NavLink>
                
                {currentUser && (
                  <NavLink to='/reservations' className={linkClass}>
                    Reservations
                  </NavLink>
                  
                )}
                {currentUser && (
                  <NavLink to='/orders' className={linkClass}>
                    Orders
                  </NavLink>
                  
                )}
                {/* Librarian can see Add Book */}
                {currentUser?.role === 'librarian' && (
                  <NavLink to='/add-book' className={linkClass}>
                    Add Book
                  </NavLink>
                )}

                {!currentUser ? (
                  <>
                    <NavLink to='/register' className={linkClass}>
                      Register
                    </NavLink>
                    <NavLink to='/login' className={linkClass}>
                      Login
                    </NavLink>
                  </>
                ) : (
                  
                  <>
                    <button
                      onClick={() => navigate('/profile')}
                      className='text-white font-bold px-3 py-2 underline'
                    >
                      Welcome, {currentUser.firstName}
                    </button>
                    <button
                      onClick={handleLogout}
                      className='bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-2 rounded-md'
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
