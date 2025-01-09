import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const AddBookPage = ({ addBookSubmit }) => {

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [price, setPrice] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      id: uuidv4(),
      title,
      author,
      publisher,
      publishedDate,
      isBorrowed,
      isReserved,
      price,
    };

    addBookSubmit(newBook);

    toast.success('Book Added Successfully!');

    return navigate('/books');
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={handleSubmit}>
            <h2 className='text-3xl text-center font-semibold mb-6'>
              Add Book
            </h2>

            {/* Title */}
            <div className='mb-4'>
              <label
                htmlFor='title'
                className='block text-gray-700 font-bold mb-2'
              >
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
              <label
                htmlFor='author'
                className='block text-gray-700 font-bold mb-2'
              >
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
              <label
                htmlFor='publisher'
                className='block text-gray-700 font-bold mb-2'
              >
                Publisher
              </label>
              <input
                type='text'
                id='publisher'
                name='publisher'
                className='border rounded w-full py-2 px-3 mb-2'
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

            {/* isBorrowed */}
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

            {/* isReserved */}
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
              <label
                htmlFor='price'
                className='block text-gray-700 font-bold mb-2'
              >
                Price
              </label>
              <input
                type='number'
                id='price'
                name='price'
                className='border rounded w-full py-2 px-3 mb-2'
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
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddBookPage;

