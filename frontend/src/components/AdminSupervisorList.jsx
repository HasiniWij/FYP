import React, { useState,useEffect  }  from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png';
import bin from '../resources/bin.png'; 
import disable from '../resources/disable.png';  
import search from '../resources/search.png'; 
import edit from '../resources/edit.png'; 
import axios from 'axios';

export default function AdminSupervisorList() {

  const [supervisors, setSupervisors] = useState([]);
  const history = useHistory();
  const adminDashboard = () => {
    history.push("/adminDashboard")
  }
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    axios.get(`http://127.0.0.1:8000/api/supervisors`,{ headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        setSupervisors(res.data)
      })
  },[]);
  
  const supervisorCard = supervisors.map((supervisor) =>
    <div class='offset-1 col-5 supervisorCard'>
      <h5>{supervisor.name}</h5>
      <h5>{supervisor.email}</h5>
      <div class='row'>
        <div class="col-6">
          <h5>Number of students: {supervisor.allocations} </h5>
        </div>
        <div class='col-3'>
          <button class='adminIcon editIcon'> <img src={edit}/>  </button>
        </div>
        {/* Luxury feature */}
        {/* <div class="col-3">
        <button class='adminIcon'> <img src={bin}/>  </button>
        <button class='adminIcon'> <img src={disable}/>  </button>
        </div> */}
      </div>
    </div>
  );

  return (
    <div class="container">
      <div class="row marginTop">
        <div class="col-3">
        <button class='logoButton' onClick={adminDashboard}> <img src={logo}/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-5">
          <h1> Supervisors List</h1>
        </div>
        <div class='col-4 searchBar'>
          <div class="input-group">
            <input type="search" class="form-control" placeholder="Search for supervisor by ID"/>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button">
                <img src={search}/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class='row marginTop'>
        {supervisorCard}
      </div>
      <div class='row largeMarginTop'>
        <div class='offset-5 col-2'>
          <button class='secondaryButton' onClick={adminDashboard}>Back to dashboard</button>
        </div>
      </div>
    </div>
  );
}