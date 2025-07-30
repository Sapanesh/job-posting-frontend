import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './screens/Login/Login';
import Navigation from './navigation';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
    </>
  );
}

export default App;
