import React from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png'; 

export default function RequestSupervision() {

  const history = useHistory();
  const studentDashboard = () => {
    history.push("/studentDashboard")
  }
  const profilePage = () => {
    history.push("/profile")
  }
  const supervisors = [
    {
      name:'Jon Doe',
      interests:'Data science, Web development'
    },
    {
      name:'Lavinia Handerson',
      interests:'Database, IOT'
    },
    {
      name:'Ben Ten',
      interests:'Data science, Web development'
    }
  ];
  
  const supervisorCards = supervisors.map((supervisor) =>
    <div class='offset-1 col-5 supervisorCard'>
      <h6>Name: {supervisor.name}</h6>
      <h6>Interested areas: {supervisor.interests} </h6>
      <button class='primaryButton projectIdeaButton'>Go to project ideas</button>
    </div>
  );

  return (
    <div class="container">
      <div class="row">
        <div class="col-2">
        <button class='logoButton' onClick={studentDashboard}> <img src={logo}/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-8">
          <h1> Supervisors List</h1>
        </div>
        <div class="col-2 profileIconArea">
          <button class='profileButton' onClick={profilePage}>H</button>
        </div>
      </div>
      <div class='row'>
        {supervisorCards}
      </div>
      <div class='row marginTop'>
        <div class='offset-5 col-2'>
          <button class='secondaryButton' onClick={studentDashboard}>Back to dashboard</button>
        </div>
      </div>
    </div>
  );
}