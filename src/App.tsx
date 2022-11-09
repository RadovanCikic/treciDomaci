import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { User } from './types';
import Form from './components/Form';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ActorsPage from './components/ActorsPage';
import MoviesPage from './components/MoviesPage';
axios.defaults.baseURL = 'http://localhost:8000/api'
function App() {
  const [user, setUser] = useState<User | undefined>(undefined);

  if (!user) {
    return (
      <div className='container mt-5'>
        <h1 className='text-center m-3'>Login</h1>
        <Form
          onSubmit={async val => {
            try {
              const res = await axios.post('/login', val);
              setUser(res.data.user);
              axios.defaults.headers.common.authorization = 'Bearer ' + res.data.token;
            } catch (error) {

            }
          }}
          inputs={[
            {
              label: 'Email',
              name: 'email',
              required: true,
              type: 'email'
            },
            {
              label: 'Password',
              name: 'password',
              required: true,
              type: 'password'
            }
          ]}
        />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={(<MoviesPage />)} />
        <Route path='/actors' element={<ActorsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
