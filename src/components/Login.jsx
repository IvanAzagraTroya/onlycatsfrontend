import React, { useState } from 'react';
import './Login.css'; 
import axios from 'axios';

function Login({ onLoginSuccess }) {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:8000/onlycats/login', {
        email: email,
        password: password
      })
      .then(function(response) {
        if (response.status !== 200) {
          throw new Error("Error in login");
        }
        const token = response.data; 
        document.cookie = `jwt=${token}; path=/; domain=localhost`; 
        onLoginSuccess();
        location.reload();
      });
    } catch (exception) {
      console.error(exception);
    }
  };

  const handleRegister = async () => {
    const emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
    if (email.length === 0 || !emailPattern.test(email)) {
      console.error("Error with email");
    } else {
      try {
        await axios.post('http://localhost:8000/onlycats/register', {
          displayname: displayName,
          username: username,
          email: email,
          password: password
        }).then(function(response) {
          if (response.status !== 204) throw new Error("Error while registering");
          axios.post('http://localhost:8000/onlycats/login', {
            email: email,
            password: password
          }).then(function(response) {
            if (response.status !== 200) throw new Error("Error while login after register");
            const token = response.data.token; 
            document.cookie = `jwt=${token}; path=/; secure; HttpOnly`; 
            console.log("Registered and Logged in", response.data);
            onLoginSuccess();
          });
        });
      } catch (error) {
        console.error('Register failed:', error);
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome to Onlycats!</h2>
      <div className="button-group">
        <button type="button" onClick={() => setIsRegister(false)}>
          Login
        </button>
        <button type="button" onClick={() => setIsRegister(true)}>
          Register
        </button>
      </div>
      <form>
        {isRegister && (
          <>
            <div className="form-group">
              <label htmlFor="displayName">Display Name:</label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="profilePicture">Profile Picture:</label>
              <input
                type="file"
                id="profilePicture"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </div>
          </>
        )}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isRegister ? (
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        ) : (
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        )}
      </form>
    </div>
  );
}

export default Login;