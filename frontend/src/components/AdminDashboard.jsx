import React, { useState,useEffect  }  from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png'; 

export default function AdminDashboard() {
  const history = useHistory();
  const [authorized,setAuthorized]=useState(false)
  const homePage = () => {
    history.push("/adminDashboard")
  }
  const studentsPage = () => {
    history.push("/AdminStudentList")
  }
  const supervisorPage = () => {
    history.push("/adminSupervisorList")
  }
  const matchSupervisorsStudentsPage = () => {
    history.push("/matchSupervisorsStudents")
  }

  useEffect(() => {
    const role = localStorage.getItem('role');
    if(role=='admin') setAuthorized(true)
  },[]);

  return (
    <div>
    {authorized?
    <div class="container">
      <div class="row">
        <div class="col-2">
        <button class='logoButton' onClick={homePage}> <img src={logo} alt='logo'/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-8">
          <h1> Admin Dashboard</h1>
        </div>
      </div>
      <div class='row dashboardItemRow largeMarginTop'>
        <div class='offset-3 col-3'>
          <button class='dashboardItem orangeBackground' onClick={supervisorPage}> Supervisor List</button>
        </div>
        <div class='col-3'>
          <button class='dashboardItem pinkBackground' onClick={studentsPage}> Student List</button>
        </div>
      </div>
      <div class='row dashboardItemRow'>
        <div class='offset-3 col-3'>
          <button class='dashboardItem blueBackground'  onClick={matchSupervisorsStudentsPage}>Match supervisors with students</button>
        </div>
      </div>
    </div>
     : 
     <h1 className='unauthorized'>
       401 authorization required
     </h1>
     }
     </div>
  );
}