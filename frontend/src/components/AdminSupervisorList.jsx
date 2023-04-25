import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import useLoader from "../hooks/useLoader";
import './Style.css';
import logo from '../resources/logo.png';
import bin from '../resources/bin.png';
import disable from '../resources/disable.png';
import search from '../resources/search.png';
import edit from '../resources/edit.png';
import axios from 'axios';

export default function AdminSupervisorList() {

  const [supervisors, setSupervisors] = useState([]);
  const [newCapacity, setNewCapacity] = useState('');
  const [editSupervisorId, setEditSupervisorId] = useState('');
  const [authorized, setAuthorized] = useState(false)
  const history = useHistory();
  const [loader, showLoader, hideLoader] = useLoader();
  const adminDashboard = () => {
    history.push("/adminDashboard")
  }
  useEffect(() => {
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('userToken');
    if(role=='admin' && isLoggedIn) setAuthorized(true)
    showLoader();
    axios.get(`http://127.0.0.1:8000/api/supervisors`, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        setSupervisors(res.data)
        hideLoader();
      })
      .catch((error) => {
        if (error.response.status == 401) {
          hideLoader();
          setAuthorized(false);
          localStorage.setItem('isLoggedIn', false);
        }
      })
  }, []);
  const editCapacity = (supervisor) => {
    setEditSupervisorId(supervisor.id);
    setNewCapacity(supervisor.capacity)
  }
  const onCapacityChange = event => {
    setNewCapacity(event.target.value);
  }
  const saveCapacity = (supervisor) => {
    const token = localStorage.getItem('userToken');
    axios.post(`http://127.0.0.1:8000/api/updateCapacity`, {
      'id': supervisor.id,
      'capacity': newCapacity,
    }, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        for (const supervisor of supervisors) {
          if (supervisor.id == editSupervisorId) {
            supervisor.capacity = newCapacity;
            setEditSupervisorId("");
            return;
          }
        }
      })
  }
  const cancelEdit = () => {
    setEditSupervisorId("");
  }

  const validateInput = (evt) => {
    (evt.key === 'e' || evt.key === '-' || evt.key === '.') && evt.preventDefault()
  }

  const supervisorCard = supervisors.map((supervisor) =>
    <div class='offset-1 col-5 supervisorCard'>
      <h5>{supervisor.name}</h5>
      <h5>{supervisor.email}</h5>
      <div class='row'>
        <div class="col-6">
          <h5>Number of students: {editSupervisorId !== supervisor.id && supervisor.capacity} </h5>
        </div>
        {editSupervisorId == supervisor.id ?
          <>
            <div class='col-2'>
              <input type="number" onKeyDown={(event) => validateInput(event)}
                class="form-control capacityInput" onChange={onCapacityChange} value={newCapacity} />
            </div>
            <div class='col-2'>
              <button class='primaryButton capacityInput'
                onClick={() => saveCapacity(supervisor)}>Save</button>
            </div>
            <div class='col-1 capacityInput'>
              <button class='secondaryButton' onClick={cancelEdit}>Cancel</button>
            </div>
          </>
          :
          <div class='col-2'>
            <button class='adminIcon editIcon' onClick={() => editCapacity(supervisor)}> <img src={edit} />  </button>
          </div>
        }
        {/* Luxury feature */}
        {/* <div class="col-3">
        <button class='adminIcon'> <img src={bin}/>  </button>
        <button class='adminIcon'> <img src={disable}/>  </button>
        </div> */}
      </div>
    </div>
  );

  return (
    <div>
      {authorized ?
        <div class="container">
          <div class="row marginTop">
            <div class="col-3">
              <button class='logoButton' onClick={adminDashboard}> <img src={logo} />  </button>
            </div>
            <div class="d-flex justify-content-center title col-5">
              <h1> Supervisors List</h1>
            </div>
            <div class='col-4 searchBar'>
              <div class="input-group">
                <input type="search" class="form-control" placeholder="Search for supervisor by ID" />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button">
                    <img src={search} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class='row marginTop'>
            {supervisorCard}
          </div>
          {loader}
          <div class='row largeMarginTop'>
            <div class='offset-5 col-2'>
              <button class='secondaryButton' onClick={adminDashboard}>Back to dashboard</button>
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