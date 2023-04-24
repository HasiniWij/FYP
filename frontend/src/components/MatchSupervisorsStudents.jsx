import React,{useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png';
import useLoader from "../hooks/useLoader";
import bin from '../resources/bin.png'; 
import disable from '../resources/disable.png';  
import search from '../resources/search.png'; 
import edit from '../resources/edit.png'; 

export default function MatchSupervisorsStudents() {

  const history = useHistory();
  const [loader, showLoader, hideLoader] = useLoader(); 
  const [studentCount, setStudentCount] = useState([]);
  const [totalCapacity, setTotalCapacity] = useState([]);
  const [authorized,setAuthorized]=useState(false)
  const adminDashboard = () => {
    history.push("/adminDashboard")
  }
  const studentsPage = () => {
    history.push("/AdminStudentList")
  }
  const supervisorPage = () => {
    history.push("/adminSupervisorList")
  }
  useEffect(() => { 
    const role = localStorage.getItem('role');
    if(role=='admin') setAuthorized(true)
    showLoader();
    const token = localStorage.getItem('userToken');
    axios.get(`http://127.0.0.1:8000/api/adminStatistics`,{ headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        hideLoader();
        setStudentCount(res.data.studentCount);
        setTotalCapacity(res.data.totalCapacity)
      })   
  },[]);

  const match = () =>{
    showLoader();
    const token = localStorage.getItem('userToken');
    axios.get(`http://127.0.0.1:8000/api/match`,{ headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      hideLoader();
     console.log(res.data)
    }) 
  }
  return (
    <div>
    {authorized?
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
            <button class='matchButton' onClick={match}> Match</button>
        </div>
        <div class='col-3'>
          <button class='dashboardItem purpleBackground' onClick={studentsPage}> Students</button>
        </div>
      </div>
      {loader}
      <div class='row marginTop'>
        <p class='mediumFontSize'>Number of students that can be accommodated by supervisors : {totalCapacity}</p>
        <p class='mediumFontSize'>Number of students  : {studentCount}</p>
      </div>
      <div class='row largeMarginTop'>
        <div class='offset-5 col-2'>
          <button class='secondaryButton' onClick={adminDashboard}>Back to dashboard</button>
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