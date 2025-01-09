import { Link } from 'react-router-dom';

const BookListing = ({ book }) => {


  return (
    <div className='bg-white rounded-xl shadow-md relative'>
      <div className='p-4'>
        <div className='mb-6'>
          <h3 className='text-xl font-bold'>{book.title}</h3>
        </div>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <Link
            to={`/books/${book.id}`}
            className='h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookListing;

