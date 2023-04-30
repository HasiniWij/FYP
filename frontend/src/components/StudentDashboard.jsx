import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png';
import logoutIcon from '../resources/logout.png';
import profile from '../resources/profile.png';
import axios from 'axios';
import useLoader from "../hooks/useLoader";

export default function StudentDashboard() {
  const history = useHistory();
  const [loader, showLoader, hideLoader] = useLoader();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (role == 'student'  && isLoggedIn==='true') setAuthorized(true)
  }, []);

  const bookMeetingPage = () => {
    history.push("/studentMeeting")
  }
  const requestSupervisionPage = () => {
    history.push("/requestSupervision")
  }
  const supervisorListPage = () => {
    history.push("/supervisorsList")
  }
  const profilePage = () => {
    history.push("/profile")
  }
  const homePage = () => {
    history.push("/studentDashboard")
  }
  const proposedProjectsPage = () => {
    history.push("/proposedProjects")
  }
  const logsPage = () => {
    history.push("/logs")
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
              <button className='logoButton' onClick={homePage}> <img src={logo} />  </button>
            </div>
            <div className="d-flex justify-content-center title col-7">
              <h1> Student Dashboard</h1>
            </div>
            <div className="col-1 profileIconArea">
              <button className='profileButton' onClick={profilePage}><img className='profileIcon' src={profile} /></button>
            </div>
            <div className="col-1 profileIconArea">
              <button className='logoutIcon' onClick={logout} ><img src={logoutIcon} /></button>
            </div>
          </div>
          <div className='row dashboardItemRow largeMarginTop'>
            <div className='col-2'> </div>
            <div className='col-3'>
              <button className='dashboardItem purpleBackground' onClick={proposedProjectsPage}>View proposed project topics</button>
            </div>
            <div className='col-3'>
              <button className='dashboardItem pinkBackground' onClick={supervisorListPage}>View supervisor list</button>
            </div>
            <div className='col-3'>
              <button className='dashboardItem greenBackground' onClick={bookMeetingPage}>Book meeting time slots</button>

            </div>
          </div>
          <div className='row dashboardItemRow'>
            <div className='col-2'> </div>
            <div className='col-3'>
              <button className='dashboardItem blueBackground' onClick={requestSupervisionPage}>Request for a supervisor</button>
            </div>
            <div className='col-3'>
              <button className='dashboardItem yellowBackground' onClick={logsPage}>Meeting logs</button>
            </div>
            <div className='col-3'>
              <button className='dashboardItem orangeBackground'>Messages</button>
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