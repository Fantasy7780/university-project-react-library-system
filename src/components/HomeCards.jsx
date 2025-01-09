import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Card from './Card';

const HomeCards = () => {

  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return ;
  }

  return (
    <section className='py-4'>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          {/* Librarian can see "For Librarian" card */}
          {currentUser.role === 'librarian' && (
            <Card bg='bg-indigo-100'>
              <h2 className='text-2xl font-bold'>For Librarian</h2>
              <p className='mt-2 mb-4'>Add a new book to our library!</p>
              <Link
                to='/add-book'
                className='inline-block bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600'
              >
                Add Book
              </Link>
            </Card>
          )}

          {/* Regular user can see "For Readers" card */}
          {currentUser.role === 'user' && (
            <Card>
              <h2 className='text-2xl font-bold'>For Readers</h2>
              <p className='mt-2 mb-4'>Take a look at books in our library!</p>
              <Link
                to='/books'
                className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700'
              >
                Browse Books
              </Link>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};
export default HomeCards;
