import React, { useState, useEffect } from 'react';
import { useHistory,useParams } from "react-router-dom";
import axios from 'axios';
import './Style.css';
import logo from '../resources/logo.png';
import profile from '../resources/profile.png';
import useLoader from "../hooks/useLoader";

export default function ProposedProjects() {
  const history = useHistory();
  const [loader, showLoader, hideLoader] = useLoader();

  const [projects, setProjects] = useState([]);
  const [authorized, setAuthorized] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('role');
    if(role=='student'  && isLoggedIn==='true') setAuthorized(true)
    showLoader();
    axios.get((`http://127.0.0.1:8000/api/projects/`+(id? id : '')),
      { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        hideLoader();
        setProjects(res.data.projects);
      })
      .catch((error) => {
        if(error.response.status == 401){
          hideLoader();
          setAuthorized(false);
          localStorage.setItem('isLoggedIn', false);
        }
    });
  }, []);

  const studentDashboard = () => {
    history.push("/studentDashboard");
  }
  const profilePage = () => {
    history.push("/profile")
  }

  const projectCards = projects.map((project,index) =>
    <div className=" projectCards" key={index}>
      <p className='projectDescription'>
        {project.description}
      </p>
      {project.areas.length ?<span>Areas: {project.areas}</span>:''}
      <div className='skillTagProfileArea'>
        {
          project.skills.map((skill,skillIndex) =>
            <span className="badge tag" key={skillIndex}>{skill}</span>
          )
        }
      </div>
    </div>
  );

  return (
    <div >
      {authorized ?
        <div className="container">
          <div className='row'>
            <div className="col-2">
              <button className='logoButton' onClick={studentDashboard}> <img src={logo} />  </button>
            </div>
            <div className="d-flex justify-content-center title col-8">
              <h1> Proposed project topics</h1>
            </div>
            <div className="col-2 profileIconArea">
              <button className='profileButton' onClick={profilePage}><img className='profileIcon' src={profile} /></button>
            </div>
          </div>
          <div className='row projectCardContainer marginTop'>
            {projectCards}
          </div>
          {loader}
          {
            !projects.length && <h2 className='noProjects'>No projects added yet</h2>
          }
          <div className='row largeMarginTop marginBottom'>
            <div className='offset-5 col-2'>
              <button className='secondaryButton' onClick={studentDashboard}>Back to dashboard</button>
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