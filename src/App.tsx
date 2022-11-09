import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { User } from './types';
import Form from './components/Form';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000/api'
function App() {
  const [user, setUser] = useState<User | undefined>(undefined);

  if (!user) {
    return (
      <div className='container mt-5'>
        <h1 className='text-center m-3'>Login</h1>
        <Form
          initialState={{ email: '', password: '' }}
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
              inputType: 'input',
              required: true,
              type: 'email'
            },
            {
              label: 'Password',
              name: 'password',
              inputType: 'input',
              required: true,
              type: 'password'
            }
          ]}
        />
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
