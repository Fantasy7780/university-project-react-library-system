import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ReservationsPage = () => {
  const { currentUser } = useContext(AuthContext);
  const [reservations, setReservations] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const [reservationsRes, booksRes, usersRes] = await Promise.all([
          fetch('http://localhost:8000/reservations'),
          fetch('http://localhost:8000/books'),
          fetch('http://localhost:8000/users'),
        ]);

        const [reservationsData, booksData, usersData] = await Promise.all([
          reservationsRes.json(),
          booksRes.json(),
          usersRes.json(),
        ]);

        if (currentUser.role === 'user') {
          const userReservations = reservationsData.filter(
            (reservation) => reservation.userId === currentUser.id
          );
          setReservations(userReservations);
        } else {
          setReservations(reservationsData);
        }

        setBooks(booksData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [currentUser]);

  const getBookTitle = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    return book ? book.title : 'Unknown';
  };

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.userName : 'Unknown';
  };

  const handleBorrowBook = async (reservationId, bookId, userId) => {
    try {

      const newOrder = {
        userId,
        bookId,
        borrowedDate: new Date().toISOString().split('T')[0],
        status: 'borrowed',
      };

      const res = await fetch('http://localhost:8000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });

      if (!res.ok) {
        throw new Error('Failed to create order.');
      }


      await fetch(`http://localhost:8000/reservations/${reservationId}`, {
        method: 'DELETE',
      });


      await fetch(`http://localhost:8000/books/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isReserved: false, isBorrowed: true }),
      });

      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== reservationId)
      );

      toast.success('Book borrowed successfully!');
    } catch (error) {
      console.error('Error borrowing book:', error);
      toast.error('Failed to borrow book.');
    }
  };

  const handleCancelReservation = async (reservationId, bookId) => {
    try {
      
      await fetch(`http://localhost:8000/reservations/${reservationId}`, {
        method: 'DELETE',
      });

      await fetch(`http://localhost:8000/books/${bookId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isReserved: false }),
      });

      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== reservationId)
      );

      toast.success('Reservation cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      toast.error('Failed to cancel reservation.');
    }
  };

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {currentUser.role === 'librarian' ? 'All Reservations' : 'My Reservations'}
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : reservations.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className='bg-white p-4 rounded-lg shadow-md'
              >
                <p className='text-lg font-bold'>Book: {getBookTitle(reservation.bookId)}</p>
                <p>User: {getUserName(reservation.userId)}</p>
                <p>Reserved Date: {reservation.reservedDate}</p>

                {currentUser.role === 'librarian' && (
                  <button
                    onClick={() =>
                      handleBorrowBook(
                        reservation.id,
                        reservation.bookId,
                        reservation.userId
                      )
                    }
                    className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4'
                  >
                    Borrow Book
                  </button>
                )}

                {currentUser.role === 'user' && (
                  <button
                    onClick={() =>
                      handleCancelReservation(reservation.id, reservation.bookId)
                    }
                    className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4'
                  >
                    Cancel Reservation
                  </button>
                )}  

              </div>
            ))}
          </div>
        ) : (
          <p className='text-center text-gray-700'>
            No reservations found.
          </p>
        )}
      </div>
    </section>
  );
};

export default ReservationsPage;
