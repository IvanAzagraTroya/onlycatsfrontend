import React, { useState } from 'react';
import './Login.css'; 
import axios from 'axios';

function Login({onLoginSuccess}) {
  const userEmail = 'new@email.com';
  const userPassword = 'psw';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    //Get user for login once i have the waypoint done, doesn't work on json-server
    try{
      const log = await axios.get('http://localhost:8000/users?email='+userEmail+'}')
      .then(function(response){
        if(response.status != 200){
          throw new Error("Error in login");
        }

        //Until i have the users waypoint and db
        response.data.forEach(element => {
          if(element.email == email){
            onLoginSuccess();
            console.log("Logged in");
          }
        });
        
        console.log(response);
      });
    } catch(exception){
      console.error(exception, response)
    }

    if(userEmail == email && userPassword == password){
      onLoginSuccess();
      console.log("Logged in succesfully")
    }
  };
  const handleRegister = async () => {
    const emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
    if(email.length == 0 || !emailPattern.test(email)){
      console.log("Error with email");
    }else {
      try{
        const formData = await axios.post('http://localhost:8000/users', {
            id: 10,
            display_name: email,
            username: "@"+email,
            profile_picture: "",
            follower_number: 0,
            following_number: 0,
            number_posts: 0
          },{
              headers: {
                  'Content-Type': 'multipart/json',
                  //'Authorization': 
              }
          });
          if (formData.status != 201) {
              throw new Error(`Error registering user: ${formData.request.status}`);
          }
      } catch (error) {
          console.error('Upload failed:', error);
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