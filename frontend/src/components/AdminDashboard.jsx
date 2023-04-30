import React, { useState,useEffect  }  from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png'; 
import logoutIcon from '../resources/logout.png';
import axios from 'axios';
import useLoader from "../hooks/useLoader";

export default function AdminDashboard() {
  const history = useHistory();
  const [loader, showLoader, hideLoader] = useLoader();
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
  const logout = () =>{
    showLoader();
    const token = localStorage.getItem('userToken');
    axios.get(`http://127.0.0.1:8000/api/logout/`, { headers: { "Authorization": `Bearer ${token}` } })
    .then(res => {
      hideLoader();
      localStorage.clear();
      history.push('/signIn');
    })
  }

  useEffect(() => {
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(role=='admin' && isLoggedIn==='true') setAuthorized(true)
  },[]);

  return (
    <div>
    {authorized?
    <div className="container">
      <div className="row">
        <div className="col-2">
        <button className='logoButton' onClick={homePage}> <img src={logo} alt='logo'/>  </button>
        </div>
        <div className="d-flex justify-content-center title col-8">
          <h1> Admin Dashboard</h1>
        </div>
        <div className="col-1 profileIconArea">
              <button className='profileButton' onClick={logout} ><img src={logoutIcon} /></button>
        </div>
      </div>
      <div className='row dashboardItemRow largeMarginTop'>
        <div className='offset-3 col-3'>
          <button className='dashboardItem orangeBackground' onClick={supervisorPage}> Supervisor List</button>
        </div>
        <div className='col-3'>
          <button className='dashboardItem pinkBackground' onClick={studentsPage}> Student List</button>
        </div>
      </div>
      <div className='row dashboardItemRow'>
        <div className='offset-3 col-3'>
          <button className='dashboardItem blueBackground'  onClick={matchSupervisorsStudentsPage}>Match supervisors with students</button>
        </div>
      </div>
      {loader}
    </div>
     : 
     <h1 className='unauthorized'>
       401 authorization required
     </h1>
     }
     </div>
  );
}