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
  const [authorized, setAuthorized] = useState(false);
  const [searchWord,setSearchWord]=useState('');
  const [allSupervisors, setAllSupervisors] = useState([]);
  const history = useHistory();
  const [loader, showLoader, hideLoader] = useLoader();
  const adminDashboard = () => {
    history.push("/adminDashboard")
  }
  useEffect(() => {
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('userToken');
    if(role=='admin' && isLoggedIn==='true') setAuthorized(true)
    showLoader();
    axios.get(`http://127.0.0.1:8000/api/supervisors`, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        setSupervisors(res.data.supervisors)
        setAllSupervisors(res.data.supervisors);
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

  const searchWordChange = event =>{
    setSearchWord(event.target.value.trim());
  }
  const onSearch = () =>{
    const filteredStudents = allSupervisors.filter(supervisor => supervisor.email.includes(searchWord));
    setSupervisors(filteredStudents);
  }
  const supervisorCard = supervisors.map((supervisor, index) =>
    <div className='offset-1 col-5 supervisorCard' key={index}>
      <h5>{supervisor.name}</h5>
      <h5>{supervisor.email}</h5>
      <div className='row'>
        <div className="col-6">
          <h5>Number of students: {editSupervisorId !== supervisor.id && supervisor.capacity} </h5>
        </div>
        {editSupervisorId == supervisor.id ?
          <>
            <div className='col-2'>
              <input type="number" onKeyDown={(event) => validateInput(event)}
                className="form-control capacityInput" onChange={onCapacityChange} value={newCapacity} />
            </div>
            <div className='col-2'>
              <button className='primaryButton capacityInput'
                onClick={() => saveCapacity(supervisor)} disabled={newCapacity===''}>Save</button>
            </div>
            <div className='col-1 capacityInput'>
              <button className='secondaryButton' onClick={cancelEdit}>Cancel</button>
            </div>
          </>
          :
          <div className='col-2'>
            <button className='adminIcon editIcon' onClick={() => editCapacity(supervisor)}> <img src={edit} />  </button>
          </div>
        }
        {/* Luxury feature */}
        {/* <div className="col-3">
        <button className='adminIcon'> <img src={bin}/>  </button>
        <button className='adminIcon'> <img src={disable}/>  </button>
        </div> */}
      </div>
    </div>
  );

  return (
    <div>
      {authorized ?
        <div className="container">
          <div className="row marginTop">
            <div className="col-3">
              <button className='logoButton' onClick={adminDashboard}> <img src={logo} />  </button>
            </div>
            <div className="d-flex justify-content-center title col-5">
              <h1> Supervisors List</h1>
            </div>
            <div className='col-4 searchBar'>
              <div className="input-group">
                <input type="search" className="form-control" onChange={searchWordChange} value={searchWord} placeholder="Search supervisor by email" />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" onClick={onSearch} type="button">
                    <img src={search} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='row marginTop'>
            {supervisorCard}
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