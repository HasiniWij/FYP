import React, { useState, useEffect } from 'react';
import { useHistory,useParams } from "react-router-dom";
import axios from 'axios';
import './Style.css';
import logo from '../resources/logo.png';
import filterIcon from '../resources/filterIcon.png';
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
    if(role=='student' && isLoggedIn) setAuthorized(true)
    showLoader();
    axios.get((`http://127.0.0.1:8000/api/projects/`+(id? id : '')),
      { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        hideLoader();
        setProjects(res.data);
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

  const projectCards = projects.map((project) =>
    <div class="container grid-child projectCards">
      <p class='projectDescription'>
        {project.description}
      </p>
      <span>Areas: {project.areas}</span>
      {/* {
           project.areas.map((skill) =>
           <span class="">{skill.label},</span>
           )
        } */}
      <div class='skillTagProfileArea'>
        {
          project.skills.map((skill) =>
            <span class="badge tag">{skill}</span>
          )
        }
      </div>
    </div>
  );

  return (
    <div >
      {authorized ?
        <div class="container">
          <div class='row'>
            <div class="col-2">
              <button class='logoButton' onClick={studentDashboard}> <img src={logo} />  </button>
            </div>
            <div class="d-flex justify-content-center title col-8">
              <h1> Proposed project topics</h1>
            </div>
            <div class="col-2 profileIconArea">
              <button class='profileButton' onClick={profilePage}>H</button>
            </div>
          </div>
          <div class='row projectCardContainer'>
            {projectCards}
          </div>
          {loader}
          <div class='row largeMarginTop marginBottom'>
            <div class='offset-5 col-2'>
              <button class='secondaryButton' onClick={studentDashboard}>Back to dashboard</button>
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