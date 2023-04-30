import React, { useState }  from 'react';
import './Style.css';
import { useHistory,useParams } from "react-router-dom";
import logo from '../resources/logo.png'; 
import profile from '../resources/profile.png';

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


  const logCards = logs.map((log,index) =>
  <div className="container grid-child largeMarginTop" key={index}>
     <h5>{log.title}{log.date}</h5>
     <textarea className="form-control" value={log.log} rows="3" id={logs.indexOf(log)} onChange={onDescriptionChange}/>
  </div>
);
  
    const meetingCards = meetings.map((meeting,index) =>
    <div className="container grid-child largeMarginTop" key={index}>
        <h5>{meeting.title}{meeting.date}</h5>
        <p className="disabledLogs">Don't forget to log progress during the meeting!</p>
    </div>
    );

  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
        <button className='logoButton' onClick={studentDashboard}> <img src={logo}/>  </button>
        </div>
        <div className="d-flex justify-content-center title col-8">
            {name ?
                <h1> Meeting logs - {name}</h1>:
                <h1> Meeting logs</h1>
            }
          
        </div>
        <div className="col-2 profileIconArea">
          <button className='profileButton' onClick={profilePage}>
          <img className='profileIcon' src={profile} />
          </button>
        </div>
      </div>      
      <div className='projectCardContainer'>
        {logCards}
        {meetingCards}
      </div>
      <div className='row marginTop'>
        <div className='offset-5 col-1'>
          <button className='primaryButton'>Save</button>
        </div>
        <div className='col-1'>
          <button className='secondaryButton' onClick={name?studentsPage:studentDashboard}>Back</button>
        </div>
      </div>
    </div>
  );
}