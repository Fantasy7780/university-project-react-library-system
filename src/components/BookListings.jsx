import { useState, useEffect } from 'react';
import BookListing from './BookListing';
import Spinner from './Spinner';

const BookListings = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filteredBooks, setFilteredBooks] = useState([]); 
  const [showAvailable, setShowAvailable] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
  
      try {
        const res = await fetch('http://localhost:8000/books');
        const data = await res.json();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); 

  const toggleAvailable = () => {
    if (showAvailable) {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter((book) => !book.isBorrowed && !book.isReserved));
    }
    setShowAvailable((prev) => !prev); 
  };

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          Books
        </h2>

        {/* Toggle Button */}
        <div className='text-center mb-6'>
          <button
            className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full'
            onClick={toggleAvailable}
          >
            {showAvailable ? 'Show All Books' : 'Show Available Books'}
          </button>
        </div>


        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {filteredBooks.map((book) => (
              <BookListing key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BookListings;

