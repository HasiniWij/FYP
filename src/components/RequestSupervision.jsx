import React from 'react';
import './Style.css';

export default function RequestSupervision() {
  
  const supervisors = ['Jon Doe','Lavinia Handerson','Ben Ten'];
  const options = supervisors.map((supervisor) =>
    <option >{supervisor}</option>
  );

  return (
    <div class="container">
      <div class="d-flex justify-content-center title">
        <h1> Request for a supervisor </h1>
      </div>
      <div class='row marginTop'>
        <div class='offset-1 col-5'>
         <h3>Supervisor want to request to</h3>
        </div>
        <div class='col-5'>
          <select class="form-select">
            {options}
          </select>
        </div>
      </div>
      <div class='row marginTop'>
        <div class='offset-5 col-1'>
          <button class='primaryButton'>Request</button>
        </div>
        <div class='col-1'>
          <button class='secondaryButton'>Cancel</button>
        </div>
      </div>
    </div>
  );
}