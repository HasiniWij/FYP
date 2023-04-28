import React from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png'; 
import profile from '../resources/profile.png';

export default function RequestSupervision() {
  
  const history = useHistory();
  const dashboard = () => {
    history.push("/studentDashboard")
  }
  const profilePage = () => {
    history.push("/profile")
  }
  const homePage = () => {
    history.push("/studentDashboard")
  }

  const supervisors = ['Jon Doe','Lavinia Handerson','Ben Ten'];
  const options = supervisors.map((supervisor) =>
    <option >{supervisor}</option>
  );

  return (
    <div class="container">
      <div class="row marginTop">
        <div class="col-2">
        <button class='logoButton' onClick={homePage}> <img src={logo}/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-8">
          <h1> Request for a supervisor</h1>
        </div>
        <div class="col-2 profileIconArea">
          <button class='profileButton' onClick={profilePage}>
          <img className='profileIcon' src={profile} />
          </button>
        </div>
      </div>
      <div class='row largeMarginTop'>
        <div class='offset-1 col-5'>
         <h3>Supervisor want to request to</h3>
        </div>
        <div class='col-5'>
          <select class="form-select">
            <option disabled selected>Select the name</option>
            {options}
          </select>
        </div>
      </div>
      <div class='row marginTop'>
        <div class='offset-5 col-1'>
          <button class='primaryButton'>Request</button>
        </div>
        <div class='col-1'>
          <button class='secondaryButton' onClick={dashboard}>Cancel</button>
        </div>
      </div>
    </div>
  );
}