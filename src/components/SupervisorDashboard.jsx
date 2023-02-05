import React from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png'; 

export default function SupervisorDashboard() {
  const history = useHistory();
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
  
  return (

    <div class="container">
      <div class="row">
        <div class="col-2">
        <button class='logoButton' onClick={homePage}> <img src={logo} alt='logo'/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-8">
          <h1> Supervisor Dashboard</h1>
        </div>
        <div class="col-2 profileIconArea">
          <button class='profileButton' onClick={profilePage}>H</button>
        </div>
      </div>
      <div class='row dashboardItemRow largeMarginTop'>
        <div class='offset-3 col-3'>
          <button class='dashboardItem orangeBackground' onClick={studentsPage}>Students</button>
        </div>
        <div class='col-3'>
          <button class='dashboardItem pinkBackground' onClick={supervisionRequestsPage}>Requests for supervision</button>
        </div>
      </div>
      <div class='row dashboardItemRow'>
        <div class='offset-3 col-3'>
          <button class='dashboardItem blueBackground'  onClick={scheduleMeetingsPage}>Schedule meetings</button>
        </div>
        <div class='col-3'>
          <button class='dashboardItem greenBackground'>Messages</button>
        </div>
      </div>
    </div>
  );
}