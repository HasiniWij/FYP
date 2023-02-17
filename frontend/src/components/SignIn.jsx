import React from 'react';
import logo from '../resources/image.png'; 
import './Style.css';

export default function StudentBookMeeting() {
  return (
    <div class="container">
      <div class='row'>
        
        {/* <div class='col' style={{ backgroundImage: `url(${''})` }}>x</div> */}
        <div class='col'>
          <img src={logo}/>
        </div>
        <div class='col'>
          <h1>Welcome to Mentee</h1>
        </div>
      </div>
    </div>
  );
}