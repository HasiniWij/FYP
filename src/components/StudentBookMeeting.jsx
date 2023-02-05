import React from 'react';
import { ScheduleMeeting } from 'react-schedule-meeting';
import './Style.css';
import { useHistory } from "react-router-dom";
import logo from '../resources/logo.png'; 

export default function StudentBookMeeting() {
  const history = useHistory();
  const profilePage = () => {
    history.push("/profile")
  }
  const studentDashboard = () => {
    history.push("/studentDashboard")
  }

  // this generates basic available timeslots for the next 6 days
  const availableTimeslots = [
    {
          startTime: new Date("2023-02-22").setHours(9, 0, 0, 0),
          endTime: new Date("2023-02-22").setHours(15, 0, 0, 0),
    }
  ]

  return (

    <div class="container">
      <div class="row">
        <div class="col-2">
        <button class='logoButton' onClick={studentDashboard}> <img src={logo}/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-8">
          <h1> Book meeting timeslots</h1>
        </div>
        <div class="col-2 profileIconArea">
          <button class='profileButton' onClick={profilePage}>H</button>
        </div>
      </div>
      <div class='bookMeeting largeMarginTop '>
        <h4 class="sub-title"> First code implementation review</h4>
          <ScheduleMeeting
          borderRadius={10}
          primaryColor="#3f5b85"
          eventDurationInMinutes={30}
          availableTimeslots={availableTimeslots}
          onStartTimeSelect={console.log}
          scheduleMeetingStyles={{height:'420px'}}
          />
      </div>
      <div class='row marginBottom'>
        <div class='offset-5 col-1'>
          <button class='primaryButton'>Book</button>
        </div>
        <div class='col-1'>
          <button class='secondaryButton' onClick={studentDashboard}>Cancel</button>
        </div>
      </div>
    </div>
  );
}