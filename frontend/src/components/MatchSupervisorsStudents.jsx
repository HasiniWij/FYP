import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png';
import useLoader from "../hooks/useLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingOverlay from 'react-loading-overlay';

export default function MatchSupervisorsStudents() {

  const history = useHistory();
  const [loader, showLoader, hideLoader] = useLoader();
  const [studentCount, setStudentCount] = useState([]);
  const [totalCapacity, setTotalCapacity] = useState([]);
  const [authorized, setAuthorized] = useState(false)
  const [isMatching, setIsMatching] = useState(false)

  const notify = () => toast.success('Successfully assigned supervisors to students', {
    position: "top-center",
    theme: "colored",
  });

  const adminDashboard = () => {
    history.push("/adminDashboard")
  }
  const studentsPage = () => {
    history.push("/AdminStudentList")
  }
  const supervisorPage = () => {
    history.push("/adminSupervisorList")
  }
  useEffect(() => {
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (role == 'admin' && isLoggedIn === 'true') setAuthorized(true)
    showLoader();
    const token = localStorage.getItem('userToken');
    axios.get(`http://127.0.0.1:8000/api/adminStatistics`, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        hideLoader();
        setStudentCount(res.data.studentCount);
        setTotalCapacity(res.data.totalCapacity)
      })
      .catch((error) => {
        if (error.response.status == 401) {
          hideLoader();
          setAuthorized(false);
          localStorage.setItem('isLoggedIn', false);
        }
      })
  }, []);

  const match = () => {
    const token = localStorage.getItem('userToken');
    setIsMatching(true);
    axios.get(`http://127.0.0.1:8000/api/match`, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        setIsMatching(isMatching);
        notify();
      })
  }
  return (
    <div>
      {authorized ?
        <LoadingOverlay
          active={isMatching}
          spinner
          text='Trying to find the best matches so it might take some  time ...'
        >
          <div className="container matchContainer">
            <div className="row marginTop">
              <div className="col-2">
                <button className='logoButton' onClick={adminDashboard}> <img src={logo} />  </button>
              </div>
              <div className="d-flex justify-content-center title col-8">
                <h1> Match supervisors with students</h1>
              </div>
            </div>
            <div className='row largeMarginTop dashboardItemRow'>
              <div className='offset-2 col-3'>
                <button className='dashboardItem purpleBackground' onClick={supervisorPage}> Supervisors</button>
              </div>
              <div className='col-3'>
                <button className='matchButton' disabled={studentCount > totalCapacity} onClick={match}> Match</button>
              </div>
              <div className='col-3'>
                <button className='dashboardItem purpleBackground' onClick={studentsPage}> Students</button>
              </div>
            </div>
            {loader}
            <div className='row marginTop'>
              <p className='mediumFontSize'>Number of students that can be accommodated by supervisors : {totalCapacity}</p>
              <p className='mediumFontSize'>Number of students  : {studentCount}</p>
            </div>
            <div className='row largeMarginTop'>
              <div className='offset-5 col-2'>
                <button className='secondaryButton' onClick={adminDashboard}>Back to dashboard</button>
              </div>
            </div>
            <ToastContainer
              position="top-center"
              autoClose={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="colored" />
          </div>
        </LoadingOverlay>
        :
        <h1 className='unauthorized'>
          401 authorization required
        </h1>
      }
    </div>
  );
}