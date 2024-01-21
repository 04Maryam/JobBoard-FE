import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
  
      axios
        .post('http://localhost:8000/signup/', { username, password })
        .then((response) => {
          // Handle successful signup response
          console.log(response.data);
        })
        .catch((error) => {
          // Handle signup error
          setError('Failed to sign up. Please try again.');
          console.log(error);
        });
    };
  
    return (
      <div>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
}
