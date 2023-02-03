import React  from 'react';
import './Style.css';

export default function ProposedProjects() {
  
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
      <div class="d-flex justify-content-center title">
        <h1> Proposed project topics </h1>
      </div>
      <div class='projectCardContainer'>
            {projectCards}
      </div>
    </div>
  );
}