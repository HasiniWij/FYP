import React from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png'; 
import profile from '../resources/profile.png';

export default function SupervisionRequests() {

  const history = useHistory();
  const supervisorDashboard = () => {
    history.push("/supervisorDashboard")
  }
  const profilePage = () => {
    history.push("/profile")
  }
  const students = [
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
    },
    {
      name:'Ben Ten',
      interests:'Data science, Web development'
    }
  ];
  
  const studentCards = students.map((student) =>
    <div class='offset-1 col-5 text-center row marginBottom'>
      <div class='col-5 studentCard'>
        <h6>{student.name}</h6>
      </div>
      <div  class='col-3 respondButton'>
        <button class='primaryButton'>Accept</button>
      </div>
      <div  class='col-3 respondButton'>
        <button class='declineButton'>Decline</button>
      </div>
    </div>
  );

  return (
    <div class="container">
      <div class="row marginTop">
        <div class="col-2">
        <button class='logoButton' onClick={supervisorDashboard}> <img src={logo}/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-8">
          <h1> Requests for supervisions </h1>
        </div>
        <div class="col-2 profileIconArea">
          <button class='profileButton' onClick={profilePage}>
            <img className='profileIcon' src={profile} />
          </button>
        </div>
      </div>
      <div class='row marginTop'>
        {studentCards}
      </div>
      <div class='row largeMarginTop'>
        <div class='offset-5 col-2'>
          <button class='secondaryButton' onClick={supervisorDashboard}>Back to dashboard</button>
        </div>
      </div>
    </div>
  );
}