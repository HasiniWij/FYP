import React from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png'; 

export default function ScheduleMeetings() {

  const history = useHistory();
  const supervisorDashboard = () => {
    history.push("/supervisorDashboard")
  }
  const profilePage = () => {
    history.push("/profile")
  }
  const meetings = [
    {
      title:'1st Code implementation  ',
    },
    {
      title:'1st Code implementation  ',
    },
    {
      title:'1st Code implementation  ',
    },
  ];
  
  const meetingCard = meetings.map((meeting) =>
    <div class='offset-1 col-5 studentCard text-center '>
      <h6>{meeting.title}</h6>
    </div>
  );

  return (
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
          <button class='newMeetingButton'>
            <span class='largeFontSize'>+</span>
            <span>  New Meeting</span>
          </button>
        </div>
      </div>
      <div class='row largeMarginTop'>
        <div class='offset-5 col-2'>
          <button class='secondaryButton' onClick={supervisorDashboard}>Back to dashboard</button>
        </div>
      </div>
    </div>
  );
}