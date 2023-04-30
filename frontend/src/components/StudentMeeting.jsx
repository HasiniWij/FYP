import React, { useState, useEffect } from 'react';
import './Style.css';
import { useHistory } from "react-router-dom";
import useLoader from "../hooks/useLoader";
import logo from '../resources/logo.png';
import profile from '../resources/profile.png';
import axios from 'axios';

export default function StudentBookMeeting() {
  const [authorized, setAuthorized] = useState(false);
  const [loader, showLoader, hideLoader] = useLoader();
  const [meetings, setMeetings] = useState([]);
  const [bookedMeetings, setBookedMeetings] = useState([]);
  const history = useHistory();

  const profilePage = () => {
    history.push("/profile")
  }
  const studentDashboard = () => {
    history.push("/studentDashboard")
  }

  const bookMeeting = (meeting) => {
    history.push("/studentBookMeeting/" + meeting.id)
  }

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (role == 'student' && isLoggedIn === 'true') setAuthorized(true);
    showLoader();
    axios.get(`http://127.0.0.1:8000/api/bookedMeetingSeries/` + userId, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        hideLoader();
        setMeetings(res.data.meetingSeries);
        setBookedMeetings(res.data.bookedMeeting)
      })
      .catch((error) => {
        hideLoader();
        if (error.response.status == 401) {
          setAuthorized(false);
          localStorage.setItem('isLoggedIn', false);
        }
      });
  }, []);

  const meetingCard = meetings.map((meeting, index) => {
    const bookedMeeting = bookedMeetings.filter(e => e.seriesId === meeting.id);
    if (bookedMeeting.length) {
      return (
        <div key={index} className='offset-1 col-5 studentCard text-center'>
          <h6>{meeting.title}- {new Date(bookedMeeting[0].dateTime).toString()}</h6>
        </div>
      )
    }
    else {
      return (
        <button className='offset-1 col-5 studentCard text-center'
          onClick={() => bookMeeting(meeting)} key={index}>
          <h6>{meeting.title}</h6>
        </button>
      )
    }
  });

  return (
    <div>
      {authorized ?
        <div className="container">
          <div className="row marginTop">
            <div className="col-2">
              <button className='logoButton' onClick={studentDashboard}> <img src={logo} alt='alt' />  </button>
            </div>
            <div className="d-flex justify-content-center title col-8">
              <h1> Supervisor meetings</h1>
            </div>
            <div className="col-2 profileIconArea">
              <button className='profileButton' onClick={profilePage}>
                <img className='profileIcon' src={profile} />
              </button>
            </div>
          </div>
          <div className='row marginTop'>
            {meetingCard}
          </div>
          {loader}
          {
            !bookedMeetings.length && !meetings.length && <h2 className='noSupervisor'>No meetings scheduled yet !</h2>
          }
          <div className='row largeMarginTop'>
            <div className='offset-5 col-2'>
              <button className='secondaryButton' onClick={studentDashboard}>Back to dashboard</button>
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