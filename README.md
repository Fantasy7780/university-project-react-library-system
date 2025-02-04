
## Introduction

This is a React-based library management system that integrates JSON Server and JSON Server Auth for data and authentication. It supports two roles:  **User** and **Librarian**.

## Features

1. User Registration & Login  
   - JWT-based authentication handled by `json-server-auth`.
   - Role-based access control for `user` and `librarian`.

2. Book Management  
   - Use: Can browse available books and reserve any unreserved ones.  
   - Librarian: Can add new books, edit existing books, or delete books.

3. Reservations & Orders 
   - Reservations: Users can create reservations, while librarians can approve them and mark books as borrowed.  
   - Orders: Shows borrowed books. Librarians can process returns.

4. Profile Management  
   - Users can update their personal details or delete their account.  
   - Librarians have additional privileges for managing library data.

5. Role-Specific Dashboards  
   - User Dashboard: Displays user’s own reservations and borrowed books.  
   - Librarian Dashboard: Displays all reservations and orders, enabling book borrow/return.

## Tech Stack

- Frontend: React, React Router, Tailwind CSS, Vite  
- Backend: JSON Server, JSON Server Auth  
- State Management: React Context API  
- Authentication: JWT-based with `json-server-auth`  

## Usage

### Install Dependencies

```bash
npm install
```

### Run JSON Server

Use the following command to start the server:

```bash
npm run server
```

The server will run on `http://localhost:8000`. 

- Users Data: `http://localhost:8000/users`
- Books Data: `http://localhost:8000/books`
- Reservations Data: `http://localhost:8000/reservations`
- Orders Data: `http://localhost:8000/orders`

### Run Vite Frontend

Use the following command to start the development server:

```bash
npm run dev
```

The app will be accessible at `http://localhost:3000`. 

## Reference

This project is based on the tutorial available at:  
`https://youtu.be/LDB4uaJ87e0`
