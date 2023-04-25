import React, { useState,useEffect  }  from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import axios from 'axios';
import logo from '../resources/logo.png'; 
import useLoader from "../hooks/useLoader";

export default function ScheduleMeetings() {

  const history = useHistory();
  const [meetings, setMeetings] = useState([]);
  const [loader, showLoader, hideLoader] = useLoader(); 
  const [authorized,setAuthorized]=useState(false);
  const supervisorDashboard = () => {
    history.push("/supervisorDashboard")
  }
  const profilePage = () => {
    history.push("/profile")
  }
  const createMeetingPage = () => {
    history.push("/createMeeting")
  }

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(role=='supervisor' && isLoggedIn ) setAuthorized(true)
    showLoader();
    axios.get(`http://127.0.0.1:8000/api/meetingSeries/`+userId,{ headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        setMeetings(res.data.meetingSeries);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          hideLoader();
          setAuthorized(false);
          localStorage.setItem('isLoggedIn', false);
        }
      })
  },[]);
  
  const meetingCard = meetings.map((meeting) =>
    <div class='offset-1 col-5 studentCard text-center '>
      <h6>{meeting.title}</h6>
    </div>
  );

  return (
    <div>
    {authorized?
    <div class="container">
      <div class="row marginTop">
        <div class="col-2">
        <button class='logoButton' onClick={supervisorDashboard}> <img src={logo} alt='alt'/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-8">
          <h1> Schedule meetings</h1>
        </div>
        <div class="col-2 profileIconArea">
          <button class='profileButton' onClick={profilePage}>H</button>
        </div>
      </div>
      <div class='row marginTop'>
        {meetingCard}
        <div class='offset-1 col-5 text-center '>
          <button class='newMeetingButton' onClick={createMeetingPage}>
            <span class='largeFontSize'>+</span>
            <span>  New Meeting</span>
          </button>
        </div>
      </div>
      {loader}
      <div class='row largeMarginTop'>
        <div class='offset-5 col-2'>
          <button class='secondaryButton' onClick={supervisorDashboard}>Back to dashboard</button>
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