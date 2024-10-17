import React, { useState } from 'react';
import './Login.css'; 
import axios from 'axios';

function Login({onLoginSuccess}) {
  const userEmail = 'user@email.com';
  const userPassword = 'psw';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Here, you would typically make an API call to your backend
    // to authenticate the user. For now, we'll just log the input.

    try{
      const log = axios.get('http://localhost:8000/users?email='+userEmail+'}')
      .then(function(response){
        if(response.status != 200){
          throw new Error("Error in login");
        }
        console.log(response);
      });
    } catch(exception){
      console.error(exception, response)
    }

    // If authentication is successful, redirect to the main app.
    if(userEmail == email && userPassword == password){
      onLoginSuccess();
      console.log("Logged in succesfully")
    }
  };
  const handleRegister = () => {
    const emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
    if(email.length == 0 || !emailPattern.test(email)){
      console.log("Error registering user");
    }else {
      console.log("Registered user")
    }
    console.log('Email:', email);
    console.log('Password:', password);
  };
  return (
    <div className="login-container">
      <h2>Welcome to Onlycats!</h2>
      <form>
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
}
export default Login;