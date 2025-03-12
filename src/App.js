import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    setErrors(errors);
    setSuccessMessage(isValid ? 'Form submitted successfully!' : '');
  };
  
return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Fill the form below:</p>
        
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        
        <button onClick={validateForm}>Submit</button>
        
        {successMessage && <span style={{ color: 'green' }}>{successMessage}</span>}

        <p> Edit <code>src/App.js</code> and save to reload. </p>
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
