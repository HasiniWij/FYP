import React, { useState }  from 'react';
import './Style.css';
import { useHistory,useParams } from "react-router-dom";
import logo from '../resources/logo.png'; 

export default function Logs() {

  const [logs, setLogs] = useState([
    {
        date:'11/12/2022',
        title:'Project proposal meeting',
        log:'Must add references and work on the lit review.  ' 
    },
    {
        date:'11/01/2023',
        title:'Progress meeting week 4',
        log:'Must add lit review.  ' 
    }
  ]);
  const meetings = [
    {
        date:'11/03/2023',
        title:'First code implementation'
    }
  ];
  let { name } = useParams();
  const history = useHistory();
  const studentDashboard = () => {
    history.push("/studentDashboard")
  }
  const studentsPage = () => {
    history.push("/studentsList")
  }
  const profilePage = () => {
    history.push("/profile")
  }
 
  const onDescriptionChange = event =>{
    let updateLogs = logs;
    updateLogs[event.target.id].log = event.target.value;
    setLogs(updateLogs);
  }


  const logCards = logs.map((log) =>
  <div class="container grid-child largeMarginTop">
     <h5>{log.title}{log.date}</h5>
     <textarea class="form-control" value={log.log} rows="3" id={logs.indexOf(log)} onChange={onDescriptionChange}/>
  </div>
);
  
    const meetingCards = meetings.map((meeting) =>
    <div class="container grid-child largeMarginTop">
        <h5>{meeting.title}{meeting.date}</h5>
        <p class="disabledLogs">Don't forget to log progress during the meeting!</p>
    </div>
    );

  return (
    <div class="container">
      <div class="row">
        <div class="col-2">
        <button class='logoButton' onClick={studentDashboard}> <img src={logo}/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-8">
            {name ?
                <h1> Meeting logs - {name}</h1>:
                <h1> Meeting logs</h1>
            }
          
        </div>
        <div class="col-2 profileIconArea">
          <button class='profileButton' onClick={profilePage}>H</button>
        </div>
      </div>      
      <div class='projectCardContainer'>
        {logCards}
        {meetingCards}
      </div>
      <div class='row marginTop'>
        <div class='offset-5 col-1'>
          <button class='primaryButton'>Save</button>
        </div>
        <div class='col-1'>
          <button class='secondaryButton' onClick={name?studentsPage:studentDashboard}>Back</button>
        </div>
      </div>
    </div>
  );
}