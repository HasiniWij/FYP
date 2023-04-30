import React, { useState } from 'react';
import logo from '../resources/logo.png';
import './Style.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useLoader from "../hooks/useLoader";

export default function SignIn() {

  const history = useHistory();
  const [loader, showLoader, hideLoader] = useLoader();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onEmailChange = event => {
    setEmail(event.target.value);
  };
  const onPasswordChange = event => {
    setPassword(event.target.value);
  };
  const login = () => {
    showLoader();
    const user = { 'email': email, 'password': password }
    axios.post(`http://127.0.0.1:8000/api/login`, user)
      .then(res => {
        hideLoader();
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
      .catch(() => {
        hideLoader();
        setEmail('');
        setPassword('');
        setError('Invalid email or password entered');
      });
  }

  return (
    <div className="container authFormContainer">
      <div className='row'>
        <div className='col-6 authFormLeft'>
          <img src={logo} className='authLogo' />
          <h1 className='authFormTitle'>Login to FYPHelper</h1>
        </div>
        <div className='col-4 offset-2 authFormRight'>
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
          {loader}
          <div className='row authButton'>
            <button className='primaryButton' onClick={login}>Login</button>
          </div>
          <div className='row largeMarginTop authNavigate'>
            <p>Don't have an account?
              <Link className='authLink' to={'signUp'}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}