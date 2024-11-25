import React, { useState } from 'react';
import './Login.css'; 
import axios from 'axios';

function Login({onLoginSuccess}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    //Get user for login once i have the waypoint done, doesn't work on json-server
    try{
      axios.post('http://localhost:8000/onlycats/login', {
        email: email,
        password: password
      })
      .then(function(response){
        if(response.status != 200){
          throw new Error("Error in login");
        }
        const token = response.data; 
        document.cookie = `jwt=${token}; path=/; domain=localhost`; 
        //console.log("Logged in", token);
        onLoginSuccess();
      });
    } catch(exception){
      console.error(exception, response)
    }
  };
  const handleRegister = async () => {
    const emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
    if(email.length == 0 || !emailPattern.test(email)){
      //console.log("Error with email");
    }else {
      try{
        await axios.post('http://localhost:8000/onlycats/register', {
            displayname: email,
            username: "@"+email,
            email: email,
            password: password
          }).then(function(response){
            if(response.status != 204) throw new Error("Error while registering")
              axios.post('http://localhost:8000/onlycats/login', {
                email: email,
                password: password
              }).then(function(response){
                if(response.status != 200)
                  throw new Error("Error while login after register");
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