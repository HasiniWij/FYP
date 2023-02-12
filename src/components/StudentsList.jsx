import React from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png'; 

export default function StudentsList() {

  const history = useHistory();
  const supervisorDashboard = () => {
    history.push("/supervisorDashboard")
  }
  const profilePage = () => {
    history.push("/profile")
  }
  const logsPage = (name) => {
    history.push("/logs/"+name);
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
  
  const studentCards = students.map((student) =>
    <button class='offset-1 col-2 studentCard text-center' onClick={() => logsPage(student.name)}>
      <h6>{student.name}</h6>
    </button>
  );

  return (
    <div class="container">
      <div class="row marginTop">
        <div class="col-2">
        <button class='logoButton' onClick={supervisorDashboard}> <img src={logo}/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-8">
          <h1> Students</h1>
        </div>
        <div class="col-2 profileIconArea">
          <button class='profileButton' onClick={profilePage}>H</button>
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