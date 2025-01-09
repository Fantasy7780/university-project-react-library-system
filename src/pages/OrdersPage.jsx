import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const OrdersPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [ordersRes, booksRes, usersRes] = await Promise.all([
          fetch('http://localhost:8000/orders'),
          fetch('http://localhost:8000/books'),
          fetch('http://localhost:8000/users'),
        ]);

        const [ordersData, booksData, usersData] = await Promise.all([
          ordersRes.json(),
          booksRes.json(),
          usersRes.json(),
        ]);

        if (currentUser.role === 'user') {
          const userOrders = ordersData.filter(
            (order) => order.userId === currentUser.id
          );
          setOrders(userOrders);
        } else {
          setOrders(ordersData);
        }

        setBooks(booksData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const getBookTitle = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    return book ? book.title : 'Unknown';
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.userName : 'Unknown';
  };

  const handleReturnBook = async (orderId, bookId) => {
    try {

      await fetch(`http://localhost:8000/orders/${orderId}`, {
        method: 'DELETE',
      });

      await fetch(`http://localhost:8000/books/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isBorrowed: false }),
      });

      setOrders((prev) => prev.filter((order) => order.id !== orderId));

      toast.success('Book returned successfully!');
    } catch (error) {
      console.error('Error returning book:', error);
      toast.error('Failed to return book.');
    }
  };

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {currentUser.role === 'librarian' ? 'All Orders' : 'My Borrowed Books'}
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : orders.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {orders.map((order) => (
              <div key={order.id} className='bg-white p-4 rounded-lg shadow-md'>
                <p className='text-lg font-bold'>Book: {getBookTitle(order.bookId)}</p>
                <p>User: {getUserName(order.userId)}</p>
                <p>Borrowed Date: {order.borrowedDate}</p>

                {currentUser.role === 'librarian' && (
                  <button
                    onClick={() => handleReturnBook(order.id, order.bookId)}
                    className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4'
                  >
                    Return Book
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className='text-center text-gray-700'>
            No orders found.
          </p>
        )}
      </div>
    </section>
  );
};

export default OrdersPage;
