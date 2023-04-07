import React, { useState,useEffect  }  from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png';
import bin from '../resources/bin.png'; 
import disable from '../resources/disable.png';  
import search from '../resources/search.png'; 
import axios from 'axios';

export default function AdminStudentList() {

  const [students, setStudents] = useState([]);

  const history = useHistory();
  const adminDashboard = () => {
    history.push("/adminDashboard")
  }

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    axios.get(`http://127.0.0.1:8000/api/students`,{ headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        setStudents(res.data)
      })
  },[]);
  
  const studentCards = students.map((student) =>
    <div className='offset-1 col-3 supervisorCard'>
      <h5>{student.name}</h5>
      <div className='row'>
        <div className="col-7">
          <h5>{student.universityId} </h5>
        </div>
        {/* Luxury feature */}
        {/* <div className="col-5">
        <button className='adminIcon'> <img src={bin}/>  </button>
        <button className='adminIcon'> <img src={disable}/>  </button>
        </div> */}
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="row marginTop">
        <div className="col-3">
        <button className='logoButton' onClick={adminDashboard}> <img src={logo}/>  </button>
        </div>
        <div className="d-flex justify-content-center title col-5">
          <h1> Students List</h1>
        </div>
        <div className='col-4 searchBar'>
          <div className="input-group">
            <input type="search" className="form-control" placeholder="Search for student by ID"/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                <img src={search}/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        {studentCards}
      </div>
      <div className='row largeMarginTop'>
        <div className='offset-5 col-2'>
          <button className='secondaryButton' onClick={adminDashboard}>Back to dashboard</button>
        </div>
      </div>
    </div>
  );
}