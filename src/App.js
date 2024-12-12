import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Account from './components/Account';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="container mt-5 d-flex justify-content-center">
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/account"
            element={<Account />}
          />
        </Routes>
      </div>
      <ToastContainer />
    </Router>

  );
}

export default App;