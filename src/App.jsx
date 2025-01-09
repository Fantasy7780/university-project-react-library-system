import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import NotFoundPage from './pages/NotFoundPage';
import BookPage, { bookLoader } from './pages/BookPage';
import AddBookPage from './pages/AddBookPage';
import EditBookPage from './pages/EditBookPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage'; 
import ReservationsPage from './pages/ReservationsPage';
import OrdersPage from './pages/OrdersPage';

const App = () => {
  
  const addBook = async (newBook) => {
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });
    return;
  };

  // Delete Book
  const deleteBook = async (id) => {
    const res = await fetch(`/api/books/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  // Update Book
  const updateBook = async (Book) => {
    const res = await fetch(`/api/books/${Book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Book),
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/books' element={<BooksPage />} />
        <Route path='/add-book' element={<AddBookPage addBookSubmit={addBook} />} />
        <Route
          path='/edit-book/:id'
          element={<EditBookPage updateBookSubmit={updateBook} />}
          loader={bookLoader}
        />
        
        <Route
          path='/books/:id'
          element={<BookPage deleteBook={deleteBook} />}
          loader={bookLoader}
        />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/reservations' element={<ReservationsPage />} />
        <Route path='/orders' element={<OrdersPage />} />

      </Route>
    )
  );
  return(
    <AuthProvider>
     <RouterProvider router={router} />
  </AuthProvider>
  )
  
};
export default App;
