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
  
  const studentCards = students.map((student,index) =>
    <div className='offset-1 col-5 text-center row marginBottom' key={index}>
      <div className='col-5 studentCard'>
        <h6>{student.name}</h6>
      </div>
      <div  className='col-3 respondButton'>
        <button className='primaryButton'>Accept</button>
      </div>
      <div  className='col-3 respondButton'>
        <button className='declineButton'>Decline</button>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="row marginTop">
        <div className="col-2">
        <button className='logoButton' onClick={supervisorDashboard}> <img src={logo}/>  </button>
        </div>
        <div className="d-flex justify-content-center title col-8">
          <h1> Requests for supervisions </h1>
        </div>
        <div className="col-2 profileIconArea">
          <button className='profileButton' onClick={profilePage}>
            <img className='profileIcon' src={profile} />
          </button>
        </div>
      </div>
      <div className='row marginTop'>
        {studentCards}
      </div>
      <div className='row largeMarginTop'>
        <div className='offset-5 col-2'>
          <button className='secondaryButton' onClick={supervisorDashboard}>Back to dashboard</button>
        </div>
      </div>
    </div>
  );
}