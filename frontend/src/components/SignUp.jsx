import React, { useState } from 'react';
import logo from '../resources/logo.png';
import './Style.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function SignUp() {

  const history = useHistory();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onNameChange = event => {
    setFullName(event.target.value);
  };
  const onEmailChange = event => {
    setEmail(event.target.value);
  };
  const onPasswordChange = event => {
    setPassword(event.target.value);
  };

  const register = () => {
    const user = { 'name': fullName, 'email': email, 'password': password }
    axios.post(`http://127.0.0.1:8000/api/register`, user)
      .then(res => {
        localStorage.setItem('userToken', res.data.access_token)
        localStorage.setItem('userId', res.data.user.id)
        localStorage.setItem('role', res.data.user.role)
        localStorage.setItem('isLoggedIn', true)
        if (res.data.user.role === 'supervisor') {
          history.push("/supervisorDashboard")
        }
        else if (res.data.user.role === 'student') {
          history.push("/studentDashboard")
        }
        else if (res.data.user.role === 'admin') {
          history.push("/adminDashboard")
        }
      })
      .catch(error => {
        setEmail('');
        setPassword('');
        setFullName('');
        let message =''
        if(error.response.data.errors['email']){
          let index = 0;
          const elements = error.response.data.errors['email'];
          while (index <elements .length) 
          {
              message = message + ' ' +elements[index]
              index++;
          }
        }
        if(error.response.data.errors['name']){
          let index = 0;
          const elements = error.response.data.errors['name'];
          while (index <elements .length) 
          {
              message = message + ' ' +elements[index]
              index++;
          }
        }
        if(error.response.data.errors['password']){
          let index = 0;
          const elements = error.response.data.errors['password'];
          while (index <elements .length) 
          {
              message = message + ' ' +elements[index]
              index++;
          }
        }
        setError(message);
      });
  }

  return (
    <div className="container authFormContainer">
      <div className='row'>
        <div className='col-6 authFormLeft'>
          <img src={logo} className='authLogo' />
          <h1 className='authFormTitle'>Welcome to FYPHelper</h1>
        </div>
        <div className='col-4 offset-2 authFormRight'>
          <div className='row'>
            <h5>Full Name</h5>
            <input type="text" className="form-control" onChange={onNameChange} placeholder="Enter your full name" value={fullName} />
          </div>
          <div className='row largeMarginTop'>
            <h5>University Email</h5>
            <input type="email" className="form-control" onChange={onEmailChange} placeholder="Enter your email" value={email} />
          </div>
          <div className='row largeMarginTop'>
            <h5>Password</h5>
            <input type="password" className="form-control" onChange={onPasswordChange} placeholder="Enter your password" value={password} />
          </div>
          <div className='row marginTop authError'>
            <p>{error}</p>
          </div>
          <div className='row authButton'>
            <button className='primaryButton' onClick={register}>Create Account</button>
          </div>
          <div className='row largeMarginTop authNavigate'>
            <p>Already have an account?
              <Link className='authLink' to={'signIn'}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}