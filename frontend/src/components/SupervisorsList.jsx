import React,{useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './Style.css';
import logo from '../resources/logo.png'; 
import useLoader from "../hooks/useLoader";

export default function SupervisorsList() {
  const [loader, showLoader, hideLoader] = useLoader(); 
  const history = useHistory();
  const studentDashboard = () => {
    history.push("/studentDashboard")
  }
  const profilePage = () => {
    history.push("/profile")
  }
  const [supervisors, setSupervisors] = useState([]);
  const [authorized,setAuthorized]=useState(false);

  useEffect(() => { 
    const role = localStorage.getItem('role');
    if(role=='student') setAuthorized(true);
    showLoader();
    const token = localStorage.getItem('userToken');
    axios.get(`http://127.0.0.1:8000/api/supervisors`,{ headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        setSupervisors(res.data);
        hideLoader();
      })
  },[]);
  
  const supervisorCards = supervisors.map((supervisor) =>
    <div key={supervisor.name} className='offset-1 col-5 supervisorCard'>
      <h6>Name: {supervisor.name}</h6>
      <h6>Interested areas: {supervisor.interests} </h6>
      <button className='primaryButton projectIdeaButton'>Go to project ideas</button>
    </div>
  );

  return (
    <div>
    {authorized?
    <div className="container">
      <div className="row">
        <div className="col-2">
        <button className='logoButton' onClick={studentDashboard}> <img src={logo}/>  </button>
        </div>
        <div className="d-flex justify-content-center title col-8">
          <h1> Supervisors List</h1>
        </div>
        <div className="col-2 profileIconArea">
          <button className='profileButton' onClick={profilePage}>H</button>
        </div>
      </div>
      <div className='row'>
        {supervisorCards}
      </div>
      {loader}
      <div className='row marginTop'>
        <div className='offset-5 col-2'>
          <button className='secondaryButton' onClick={studentDashboard}>Back to dashboard</button>
        </div>
      </div>
      </div>: 
    <h1 className='unauthorized'>
      401 authorization required
    </h1>
    }
    </div>
  );
}