import React from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png'; 

export default function StudentBookMeeting() {
  const history = useHistory();
  const bookMeetingPage = () => {
    history.push("/studentBookMeeting")
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
  
  return (

    <div class="container">
      <div class="row">
        <div class="col-2">
        <button class='logoButton' onClick={homePage}> <img src={logo}/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-8">
          <h1> Student Dashboard</h1>
        </div>
        <div class="col-2 profileIconArea">
          <button class='profileButton' onClick={profilePage}>H</button>
        </div>
      </div>
      <div class='row dashboardItemRow largeMarginTop'>
        <div class='col-2'> </div>
        <div class='col-3'>
          <button class='dashboardItem purpleBackground' onClick={proposedProjectsPage}>View proposed project topics</button>
        </div>
        <div class='col-3'>
          <button class='dashboardItem pinkBackground' onClick={supervisorListPage}>View supervisor list</button>
        </div>
        <div class='col-3'>
          <button class='dashboardItem blueBackground'  onClick={requestSupervisionPage}>Request for a supervisor</button>
        </div>
      </div>
      <div class='row dashboardItemRow'>
        <div class='col-2'> </div>
        <div class='col-3'>
          <button class='dashboardItem greenBackground'  onClick={bookMeetingPage}>Book meeting time slots</button>
        </div>
        <div class='col-3'>
          <button class='dashboardItem yellowBackground'>Meeting logs</button>
        </div>
        <div class='col-3'>
          <button class='dashboardItem orangeBackground'>Messages</button>
        </div>
      </div>
      
    </div>
  );
}