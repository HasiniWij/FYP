import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import useLoader from "../hooks/useLoader";
import axios from 'axios';
import './Style.css';
import logo from '../resources/logo.png';
import profile from '../resources/profile.png';

export default function StudentsList() {

  const history = useHistory();
  const [loader, showLoader, hideLoader] = useLoader();

  const [students, setStudents] = useState([]);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('role');
    const userId = localStorage.getItem('userId');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (role == 'supervisor' && isLoggedIn === 'true') setAuthorized(true);
    showLoader();
    axios.get(`http://127.0.0.1:8000/api/supervisorStudents/` + userId, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        hideLoader()
        setStudents(res.data.students);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          hideLoader();
          setAuthorized(false);
          localStorage.setItem('isLoggedIn', false);
        }
      })
  }, []);

  const supervisorDashboard = () => {
    history.push("/supervisorDashboard")
  }
  const profilePage = () => {
    history.push("/profile")
  }
  const logsPage = (name) => {
    history.push("/logs/" + name);
  }

  const studentCards = students.map((student, index) =>
    <button key={index} className='offset-1 col-2 studentCard text-center' onClick={() => logsPage(student.name)}>
      <h6>{student.name}</h6>
    </button>
  );

  return (
    <div>
      {authorized ?
        <div className="container">
          <div className="row marginTop">
            <div className="col-2">
              <button className='logoButton' onClick={supervisorDashboard}> <img src={logo} />  </button>
            </div>
            <div className="d-flex justify-content-center title col-8">
              <h1> Students</h1>
            </div>
            <div className="col-2 profileIconArea">
              <button className='profileButton' onClick={profilePage}>
                <img className='profileIcon' src={profile} />
              </button>
            </div>
          </div>
          <div className='row marginTop'>
            {studentCards}
          </div>
          {loader}
          {
            !students.length && <h2 className='noProjects'>No students assigned yet</h2>
          }
          <div className='row largeMarginTop'>
            <div className='offset-5 col-2'>
              <button className='secondaryButton' onClick={supervisorDashboard}>Back to dashboard</button>
            </div>
          </div>
        </div> :
        <h1 className='unauthorized'>
          401 authorization required
        </h1>
      }
    </div>
  );
}