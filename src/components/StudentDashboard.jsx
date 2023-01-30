import React from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';

export default function StudentBookMeeting() {
  const history = useHistory();
  const coursesPage = () => {
    history.push("/studentBookMeeting")
  }
  return (

    <div class="container">
      <div class="d-flex justify-content-center title">
        <h1> Student Dashboard</h1>
      </div>
      <div class='row dashboardItemRow'>
        <div class='col-2'> </div>
        <div class='col-3'>
          <button class='dashboardItem purpleBackground'>View proposed project topics</button>
        </div>
        <div class='col-3'>
          <button class='dashboardItem pinkBackground'>View supervisor list</button>
        </div>
        <div class='col-3'>
          <button class='dashboardItem blueBackground'>Requests for supervision</button>
        </div>
      </div>
      <div class='row dashboardItemRow'>
        <div class='col-2'> </div>
        <div class='col-3'>
          <button class='dashboardItem greenBackground'  onClick={coursesPage}>Book meeting timeslots</button>
        </div>
        <div class='col-3'>
          <button class='dashboardItem yellowBackground'>Meeting logs</button>
        </div>
        <div class='col-3'>
          <button class='dashboardItem orangeBackground'>Messages</button>
        </div>
      </div>
      
    </div>
  );
}