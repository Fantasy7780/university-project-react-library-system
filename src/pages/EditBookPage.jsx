import { useState } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditBookPage = ({ updateBookSubmit }) => {
  
  const book = useLoaderData();
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [publisher, setPublisher] = useState(book.publisher);
  const [publishedDate, setPublishedDate] = useState(book.publishedDate);
  const [isBorrowed, setIsBorrowed] = useState(book.isBorrowed);
  const [isReserved, setIsReserved] = useState(book.isReserved);
  const [price, setPrice] = useState(book.price);

  const submitForm = (e) => {
    e.preventDefault();

    const updatedBook = {
      id,
      title,
      author,
      publisher,
      publishedDate,
      isBorrowed,
      isReserved,
      price,
    };

    updateBookSubmit(updatedBook);

    toast.success('Book updated successfully!');

    navigate(`/books/${id}`);
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>
              Update Book
            </h2>

            {/* Book ID (Read-Only) */}
            <div className='mb-4'>
              <label htmlFor='id' className='block text-gray-700 font-bold mb-2'>
                Book ID
              </label>
              <input
                type='text'
                id='id'
                name='id'
                className='border rounded w-full py-2 px-3 mb-2 bg-gray-100 cursor-not-allowed'
                value={id}
                readOnly 
              />
            </div>

            {/* Title */}
            <div className='mb-4'>
              <label htmlFor='title' className='block text-gray-700 font-bold mb-2'>
                Title
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='border rounded w-full py-2 px-3 mb-2'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Author */}
            <div className='mb-4'>
              <label htmlFor='author' className='block text-gray-700 font-bold mb-2'>
                Author
              </label>
              <input
                type='text'
                id='author'
                name='author'
                className='border rounded w-full py-2 px-3 mb-2'
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            {/* Publisher */}
            <div className='mb-4'>
              <label htmlFor='publisher' className='block text-gray-700 font-bold mb-2'>
                Publisher
              </label>
              <input
                type='text'
                id='publisher'
                name='publisher'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='e.g. Prentice Hall'
                required
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
            </div>

            {/* Published Date */}
            <div className='mb-4'>
              <label
                htmlFor='publishedDate'
                className='block text-gray-700 font-bold mb-2'
              >
                Published Date
              </label>
              <input
                type='date'
                id='publishedDate'
                name='publishedDate'
                className='border rounded w-full py-2 px-3 mb-2'
                required
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
              />
            </div>

            {/* isBorrowed (checkbox) */}
            <div className='mb-4 flex items-center'>
              <input
                type='checkbox'
                id='isBorrowed'
                name='isBorrowed'
                className='mr-2'
                checked={isBorrowed}
                onChange={(e) => setIsBorrowed(e.target.checked)}
              />
              <label
                htmlFor='isBorrowed'
                className='block text-gray-700 font-bold'
              >
                Borrowed
              </label>
            </div>

            {/* isReserved (checkbox) */}
            <div className='mb-4 flex items-center'>
              <input
                type='checkbox'
                id='isReserved'
                name='isReserved'
                className='mr-2'
                checked={isReserved}
                onChange={(e) => setIsReserved(e.target.checked)}
              />
              <label
                htmlFor='isReserved'
                className='block text-gray-700 font-bold'
              >
                Reserved
              </label>
            </div>

            {/* Price */}
            <div className='mb-4'>
              <label htmlFor='price' className='block text-gray-700 font-bold mb-2'>
                Price
              </label>
              <input
                type='number'
                id='price'
                name='price'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='e.g. 45'
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Update Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditBookPage;

