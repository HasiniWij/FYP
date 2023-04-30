import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png';
import axios from 'axios';
import logoutIcon from '../resources/logout.png';
import useLoader from "../hooks/useLoader";
import profile from '../resources/profile.png';

export default function SupervisorDashboard() {
  const [loader, showLoader, hideLoader] = useLoader();
  const history = useHistory();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('role');
    if (role == 'supervisor' && isLoggedIn === 'true') setAuthorized(true);
  }, []);

  const profilePage = () => {
    history.push("/profile")
  }
  const homePage = () => {
    history.push("/supervisorDashboard")
  }
  const studentsPage = () => {
    history.push("/studentsList")
  }
  const supervisionRequestsPage = () => {
    history.push("/supervisionRequests")
  }
  const scheduleMeetingsPage = () => {
    history.push("/scheduleMeetings")
  }
  const logout = () => {
    showLoader();
    const token = localStorage.getItem('userToken');
    axios.get(`http://127.0.0.1:8000/api/logout/`, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        hideLoader();
        localStorage.clear();
        history.push('/signIn');
      })
  }

  return (
    <div>
      {authorized ?
        <div className="container">
          <div className="row">
            <div className="col-2">
              <button className='logoButton' onClick={homePage}> <img src={logo} alt='logo' />  </button>
            </div>
            <div className="d-flex justify-content-center title col-7">
              <h1> Supervisor Dashboard</h1>
            </div>
            <div className="col-1 profileIconArea">
              <button className='profileButton' onClick={profilePage}>
                <img className='profileIcon' src={profile} />
              </button>
            </div>
            <div className='col-1 profileIconArea'>
              <button className='logoutIcon' onClick={logout} ><img src={logoutIcon} /></button>
            </div>
          </div>
          <div className='row dashboardItemRow largeMarginTop'>
            <div className='offset-3 col-3'>
              <button className='dashboardItem orangeBackground' onClick={studentsPage}>Students</button>
            </div>
            <div className='col-3'>
              <button className='dashboardItem blueBackground' onClick={scheduleMeetingsPage}>Schedule meetings</button>
            </div>
          </div>
          <div className='row dashboardItemRow'>
            <div className='offset-3 col-3'>
              <button className='dashboardItem pinkBackground' onClick={supervisionRequestsPage}>Requests for supervision</button>
            </div>
            <div className='col-3'>
              <button className='dashboardItem greenBackground'>Messages</button>
            </div>
          </div>
          {loader}
        </div> :
        <h1 className='unauthorized'>
          401 authorization required
        </h1>
      }
    </div>
  );
}