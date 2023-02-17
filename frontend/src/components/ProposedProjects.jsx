import React  from 'react';
import { useHistory } from "react-router-dom";
import './Style.css';
import logo from '../resources/logo.png'; 
import filterIcon from '../resources/filterIcon.png'; 

export default function ProposedProjects() {
  const history = useHistory();
  const studentDashboard = () => {
    history.push("/studentDashboard");
  }
  const profilePage = () => {
    history.push("/profile")
  }

  const projects = [
    {
      description:'Online application to allow a supervisor to schedule project meetings and share relevant project information to their project students (individually or group)',
      areas:[{ label: "Web app development", value: "web" }],
      skill:['HTML','CSS','Javascript','PHP','Database']
    },
    {
      description:'Online application to allow a supervisor to schedule project meetings and share relevant project information to their project students (individually or group)',
      areas:[{ label: "Web app development", value: "web" },{ label: "User Interface", value: "ui" }],
      skill:['HTML','CSS','Javascript','PHP','Database']
    },
    {
      description:'Online application to allow a supervisor to schedule project meetings and share relevant project information to their project students (individually or group)',
      areas:[{ label: "Web app development", value: "web" },{ label: "User Interface", value: "ui" }],
      skill:['HTML','CSS','Javascript','PHP','Database','annother one','Database','annother one','data sceince']
    }
  ]
 
   const projectCards = projects.map((project) =>
    <div class="container grid-child projectCards">
        <p class='projectDescription'>
            {project.description}
        </p> 
        <span>Areas: </span>
        {
           project.areas.map((skill) =>
           <span class="">{skill.label},</span>
           )
        }
        <div class='skillTagProfileArea'>
        {
          project.skill.map((skill) =>
          <span class="badge tag">{skill}</span>
          )
        }
        </div>
    </div>
  );

  return (
    <div class="container">
      <div class='row'>
        <div class="col-2">
          <button class='logoButton' onClick={studentDashboard}> <img src={logo}/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-8">
          <h1> Proposed project topics</h1>
        </div>
        <div class="col-2 profileIconArea">
          <button class='profileButton' onClick={profilePage}>H</button>
        </div>
      </div>
      <div class='row'>
        <div class="offset-10 col-2">
          <button class='filterIcon'> <img src={filterIcon}/>  </button>
        </div>
      </div>
      <div class='projectCardContainer'>
            {projectCards}
      </div>
      <div class='row largeMarginTop marginBottom'>
        <div class='offset-5 col-2'>
          <button class='secondaryButton' onClick={studentDashboard}>Back to dashboard</button>
        </div>
      </div>
    </div>
  );
}