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
    <div className="container">
      <div className="row marginTop">
        <div className="col-2">
        <button className='logoButton' onClick={homePage}> <img src={logo}/>  </button>
        </div>
        <div className="d-flex justify-content-center title col-8">
          <h1> Request for a supervisor</h1>
        </div>
        <div className="col-2 profileIconArea">
          <button className='profileButton' onClick={profilePage}>
          <img className='profileIcon' src={profile} />
          </button>
        </div>
      </div>
      <div className='row largeMarginTop'>
        <div className='offset-1 col-5'>
         <h3>Supervisor want to request to</h3>
        </div>
        <div className='col-5'>
          <select className="form-select">
            <option disabled selected>Select the name</option>
            {options}
          </select>
        </div>
      </div>
      <div className='row marginTop'>
        <div className='offset-5 col-1'>
          <button className='primaryButton'>Request</button>
        </div>
        <div className='col-1'>
          <button className='secondaryButton' onClick={dashboard}>Cancel</button>
        </div>
      </div>
    </div>
  );
}