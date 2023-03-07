import React, { useState,useEffect  }  from 'react';
import './Style.css';
import { MultiSelect } from "react-multi-select-component";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import logo from '../resources/logo.png'; 

export default function Profile() {

  const [tags, setTags] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [userInterests, setUserInterests] = useState([]);
  const [description, setDescription] = useState('');
  const [projectAreas, setProjectAreas] = useState([]);
  const [projects, setProjects] = useState([]);
  const [areas, setAreas] = useState([]);

  const history = useHistory();
  const studentDashboard = () => {
    history.push("/studentDashboard")
  }

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    axios.get(`http://127.0.0.1:8000/api/project`,{ headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        setAreas(res.data);
      })
  },[]);
  const addTags = () => {
    const newList = tags.concat(newSkill);
    setTags(newList);
    setNewSkill('');
  }
  const onSkillChange = event => {
    setNewSkill(event.target.value);
  };
  const onDescriptionChange = event =>{
    setDescription(event.target.value);
  }
  const addProject = () => {
    const newProjectList = projects.concat({
      'description':description,
      'areas':projectAreas,
      'skill':tags
  });
    setProjects(newProjectList);
    setDescription('');
    setTags([]);
    setProjectAreas([]);
  };

  const tagCards = tags.map((tag) =>
       <span class="badge tag">{tag}</span>
  );
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
      <div class="row">
        <div class="col-2">
        <button class='logoButton' onClick={studentDashboard}> <img src={logo}/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-8">
          <h1> Profile</h1>
        </div>
      </div>
      <div class='row marginTop'>
        <div class='offset-1 col-5'>
          <h4>What areas are you interested in? </h4>
        </div>
        <div class='col-5'>
          <MultiSelect
          options={areas}
          value={userInterests}
          onChange={setUserInterests}
          labelledBy="Select"
          />
        </div>     
      </div>
      <div class='row largeMarginTop'>
        <div class='offset-1 col-5'>
          <h4>Potential ideas you want to work on? </h4>
        </div>
        <div class='col-5'>
          <textarea class="form-control" value={description} rows="3" onChange={onDescriptionChange}></textarea>
        </div>     
      </div>
      <div class='row profileRow'>
        <div class='offset-6 col-5'>
          <MultiSelect
            options={areas}
            value={projectAreas}
            onChange={setProjectAreas}
            labelledBy="Select"
            />
        </div>  
        <div class='row profileRow'>
          <div class='offset-6 col-3'>
            <input type="text" class="form-control skillInput" onChange={onSkillChange} placeholder="Add required technical skills" value={newSkill}/>
          </div>
          <div class='col-3'>
            <button class='primaryButton' onClick={addTags}> Add</button>
          </div>
        </div> 
        <div class='row profileNewTagArea'>
          <div class='offset-6 col-3'>
            {tagCards}
          </div>
        </div>
        <div class='row profileRow'>
          <div class='offset-8 col-3'>
            <button class='primaryButton' onClick={addProject}> Save idea</button>
          </div>
        </div>  
      </div>
      <div class='projectCardContainer'>
        {projectCards}
      </div>
      <div class='row marginBottom marginTop'>
        <div class='offset-5 col-2'>
          <button class='secondaryButton' onClick={studentDashboard}>Back to dashboard</button>
        </div>
      </div>
    </div>
  );
}