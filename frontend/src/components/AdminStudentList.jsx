import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import useLoader from "../hooks/useLoader";
import './Style.css';
import logo from '../resources/logo.png';
import search from '../resources/search.png';
import axios from 'axios';

export default function AdminStudentList() {

  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [loader, showLoader, hideLoader] = useLoader();
  const [authorized, setAuthorized] = useState(false);
  const [searchWord, setSearchWord] = useState('')
  const history = useHistory();
  const adminDashboard = () => {
    history.push("/adminDashboard")
  }

  useEffect(() => {
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('userToken');
    if (role == 'admin' && isLoggedIn === 'true') setAuthorized(true)
    showLoader();
    axios.get(`http://127.0.0.1:8000/api/students`, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        hideLoader();
        setStudents(res.data.students)
        setAllStudents(res.data.students)
      })
      .catch((error) => {
        if (error.response.status == 401) {
          setAuthorized(false);
          localStorage.setItem('isLoggedIn', false);
        }
      });
  }, []);

  const studentCards = students.map((student, index) =>
    <div className='offset-1 col-3 supervisorCard' key={index}>
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

  const searchWordChange = event => {
    setSearchWord(event.target.value.trim());
  }
  const onSearch = () => {
    const filteredStudents = allStudents.filter(student => student.universityId.includes(searchWord));
    setStudents(filteredStudents);
  }
  return (
    <div>
      {authorized ?
        <div className="container">
          <div className="row marginTop">
            <div className="col-3">
              <button className='logoButton' onClick={adminDashboard}> <img src={logo} />  </button>
            </div>
            <div className="d-flex justify-content-center title col-5">
              <h1> Students List</h1>
            </div>
            <div className='col-4 searchBar'>
              <div className="input-group">
                <input type="search" className="form-control" onChange={searchWordChange} value={searchWord} placeholder="Search for student by ID" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" onClick={onSearch} type="button">
                    <img src={search} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            {studentCards}
          </div>
          {loader}
          <div className='row largeMarginTop marginBottom'>
            <div className='offset-5 col-2'>
              <button className='secondaryButton' onClick={adminDashboard}>Back to dashboard</button>
            </div>
          </div>
        </div>
        :
        <h1 className='unauthorized'>
          401 authorization required
        </h1>
      }
    </div>
  );
}