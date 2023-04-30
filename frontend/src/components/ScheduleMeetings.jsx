import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import axios from 'axios';
import logo from '../resources/logo.png';
import useLoader from "../hooks/useLoader";
import profile from '../resources/profile.png';

export default function ScheduleMeetings() {

  const history = useHistory();
  const [meetings, setMeetings] = useState([]);
  const [loader, showLoader, hideLoader] = useLoader();
  const [authorized, setAuthorized] = useState(false);
  const supervisorDashboard = () => {
    history.push("/supervisorDashboard")
  }
  const profilePage = () => {
    history.push("/profile")
  }
  const createMeetingPage = () => {
    history.push("/createMeeting")
  }
  const meetingInformationPage = (meetingId) => {
    history.push("/meetingInformation/" + meetingId)

  }

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (role == 'supervisor' && isLoggedIn === 'true') setAuthorized(true)
    showLoader();
    axios.get(`http://127.0.0.1:8000/api/meetingSeries/` + userId, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        setMeetings(res.data.meetingSeries);
        hideLoader();
      })
      .catch((error) => {
        if (error.response.status == 401) {
          hideLoader();
          setAuthorized(false);
          localStorage.setItem('isLoggedIn', false);
        }
      })
  }, []);

  const meetingCard = meetings.map((meeting, index) =>
    <button key={index} className='offset-1 col-5 studentCard text-center ' onClick={() => meetingInformationPage(meeting.id)}>
      <h6>{meeting.title}</h6>
    </button>
  );

  return (
    <div>
      {authorized ?
        <div className="container">
          <div className="row marginTop">
            <div className="col-2">
              <button className='logoButton' onClick={supervisorDashboard}> <img src={logo} alt='alt' />  </button>
            </div>
            <div className="d-flex justify-content-center title col-8">
              <h1> Schedule meetings</h1>
            </div>
            <div className="col-2 profileIconArea">
              <button className='profileButton' onClick={profilePage}>
                <img className='profileIcon' src={profile} />
              </button>
            </div>
          </div>
          <div className='row marginTop'>
            {meetingCard}
            <div className='offset-1 col-5 text-center '>
              <button className='newMeetingButton' onClick={createMeetingPage}>
                <span className='largeFontSize'>+</span>
                <span>  New Meeting</span>
              </button>
            </div>
          </div>
          {loader}
          <div className='row largeMarginTop'>
            <div className='offset-5 col-2'>
              <button className='secondaryButton' onClick={supervisorDashboard}>Back to dashboard</button>
            </div>
          </div>
        </div>
        :
        <h1 className='unauthorized'>
          401 authorization required
        </h1>
      }
    </div>
  );
}