import React from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png';
import bin from '../resources/bin.png'; 
import disable from '../resources/disable.png';  
import search from '../resources/search.png'; 
import edit from '../resources/edit.png'; 

export default function MatchSupervisorsStudents() {

  const history = useHistory();
  const adminDashboard = () => {
    history.push("/adminDashboard")
  }
  const studentsPage = () => {
    history.push("/AdminStudentList")
  }
  const supervisorPage = () => {
    history.push("/adminSupervisorList")
  }

  return (
    <div class="container">
      <div class="row marginTop">
        <div class="col-2">
        <button class='logoButton' onClick={adminDashboard}> <img src={logo}/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-8">
          <h1> Match supervisors with students</h1>
        </div>
      </div>
      <div class='row largeMarginTop dashboardItemRow'>
        <div class='offset-2 col-3'>
          <button class='dashboardItem purpleBackground' onClick={supervisorPage}> Supervisors</button>
        </div>
        <div class='col-3'>
            <button class='matchButton'> Match</button>
        </div>
        <div class='col-3'>
          <button class='dashboardItem purpleBackground' onClick={studentsPage}> Students</button>
        </div>
      </div>
      <div class='row marginTop'>
        <p class='mediumFontSize'>Number of students that can be accommodated by supervisors : 200</p>
        <p class='mediumFontSize'>Number of students  : 200</p>
      </div>
      <div class='row largeMarginTop'>
        <div class='offset-5 col-2'>
          <button class='secondaryButton' onClick={adminDashboard}>Back to dashboard</button>
        </div>
      </div>
    </div>
  );
}