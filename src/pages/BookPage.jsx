import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const BookPage = ({ deleteBook }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const book = useLoaderData(); 
  const { currentUser } = useContext(AuthContext);

  const onDeleteClick = (bookId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this book?'
    );
    if (!confirm) return;

    deleteBook(bookId);
    toast.success('Book deleted successfully');
    navigate('/books');
  };

  const handleReservation = async () => {
    if (!currentUser) {
      toast.error('You must be logged in to reserve a book.');
      return;
    }

    try {
      const newReservation = {
        userId: currentUser.id,
        bookId: book.id,
        reservedDate: new Date().toISOString().split('T')[0],
        status: 'pending',
      };

      // Add to reservations
      const res = await fetch('http://localhost:8000/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReservation),
      });

      if (!res.ok) {
        throw new Error('Failed to reserve the book.');
      }

      // Update book reserved status
      await fetch(`http://localhost:8000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isReserved: true }),
      });

      toast.success('Book reserved successfully!');
    } catch (error) {
      console.error('Error reserving book:', error);
      toast.error('Failed to reserve the book.');
    }
  };

  return (
    <>
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            to='/books'
            className='text-indigo-500 hover:text-indigo-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' />
            Back to Books
          </Link>
        </div>
      </section>

      <section className='bg-indigo-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            
            <main>
              <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                
                <h1 className='text-3xl font-bold mb-4'>{book.title}</h1>
                
                <div className='text-gray-600 mb-2'>
                  <span className='font-semibold'>ID: </span>
                  {book.id}
                </div>

                <div className='text-gray-600 mb-2'>
                  <span className='font-semibold'>Author: </span>
                  {book.author}
                </div>

                <div className='text-gray-600 mb-2'>
                  <span className='font-semibold'>Publisher: </span>
                  {book.publisher}
                </div>

                <div className='text-gray-600 mb-2'>
                  <span className='font-semibold'>Published Date: </span>
                  {book.publishedDate}
                </div>

                <div className='text-gray-600 mb-2'>
                  <span className='font-semibold'>Borrowed: </span>
                  {book.isBorrowed ? 'Yes' : 'No'}
                </div>

                <div className='text-gray-600 mb-2'>
                  <span className='font-semibold'>Reserved: </span>
                  {book.isReserved ? 'Yes' : 'No'}
                </div>

                <div className='text-gray-600 mb-2'>
                  <span className='font-semibold'>Price: </span>
                  ${book.price}
                </div>
              </div>
            </main>

            <aside>
              {currentUser?.role === 'librarian' && (
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-bold mb-6'>Manage Book</h3>
                <Link
                  to={`/edit-book/${book.id}`}
                  className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline block'
                >
                  Edit Book
                </Link>
                <button
                  onClick={() => onDeleteClick(book.id)}
                  className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Delete Book
                </button>
              </div>
              )}

              {currentUser?.role === 'user' && !book.isReserved && !book.isBorrowed &&(
              <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
                <h3 className='text-xl font-bold mb-6'>Reserve This Book</h3>
                <button
                  onClick={handleReservation}
                  className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline block'
                >
                  Reserve Book
                </button>
              </div>
            )}
            </aside>

          </div>
        </div>
      </section>
    </>
  );
};

const bookLoader = async ({ params }) => {
  const res = await fetch(`/api/books/${params.id}`);
  const data = await res.json();
  return data;
};

export { BookPage as default, bookLoader };
