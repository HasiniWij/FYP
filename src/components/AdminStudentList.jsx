import React from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png';
import bin from '../resources/bin.png'; 
import disable from '../resources/disable.png';  
import search from '../resources/search.png'; 

export default function AdminStudentList() {

  const history = useHistory();
  const adminDashboard = () => {
    history.push("/adminDashboard")
  }
  const students = [
    {
      name:'Jon Doe',
      universityId:'w1789285'
    },
    {
      name:'Lavinia Handerson',
      universityId:'w1789285'
    },
    {
      name:'Ben Ten',
      universityId:'w1789285'
    },
    {
      name:'Jon Doe',
      universityId:'w1789285'
    },
    {
      name:'Lavinia Handerson',
      universityId:'w1789285'
    },
    {
      name:'Ben Ten',
      universityId:'w1789285'
    }
  ];
  
  const studentCards = students.map((student) =>
    <div class='offset-1 col-3 supervisorCard'>
      <h5>{student.name}</h5>
      <div class='row'>
        <div class="col-7">
          <h5>{student.universityId} </h5>
        </div>
        <div class="col-5">
        <button class='adminIcon'> <img src={bin}/>  </button>
        <button class='adminIcon'> <img src={disable}/>  </button>
        </div>
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
          <h1> Students List</h1>
        </div>
        <div class='col-4 searchBar'>
          <div class="input-group">
            <input type="search" class="form-control" placeholder="Search for student by ID"/>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button">
                <img src={search}/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class='row'>
        {studentCards}
      </div>
      <div class='row largeMarginTop'>
        <div class='offset-5 col-2'>
          <button class='secondaryButton' onClick={adminDashboard}>Back to dashboard</button>
        </div>
      </div>
    </div>
  );
}