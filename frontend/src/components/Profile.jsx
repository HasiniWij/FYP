import React, { useState,useEffect  }  from 'react';
import './Style.css';
import { MultiSelect } from "react-multi-select-component";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import logo from '../resources/logo.png'; 
import remove from '../resources/bin.png'; 
import useLoader from "../hooks/useLoader";

export default function Profile() {

  const [loader, showLoader, hideLoader] = useLoader(); 

  const [tags, setTags] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [userInterests, setUserInterests] = useState([]);
  const [currentUserInterests, setCurrentUserInterests] = useState([]);
  const [description, setDescription] = useState('');
  const [supervisorDetails, setSupervisorDetails] = useState('');
  const [projectAreas, setProjectAreas] = useState([]);
  const [projects, setProjects] = useState([]);
  const [areas, setAreas] = useState([]);
  const [authorized,setAuthorized]=useState(false);

  const history = useHistory();
  const studentDashboard = () => {
    const role = localStorage.getItem('role');
    if(role==='supervisor'){
      history.push("/supervisorDashboard")
    }
    else{
      history.push("/studentDashboard")
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    showLoader();
    if((role=='student'|| role=='supervisor' )  && isLoggedIn==='true' ) setAuthorized(true);

    axios.get(`http://127.0.0.1:8000/api/areas`,{ headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        setAreas(res.data.areas);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          hideLoader();
          setAuthorized(false);
          localStorage.setItem('isLoggedIn', false);
        }
      })
      
      axios.get(`http://127.0.0.1:8000/api/userAreas/`+userId,{ headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        setCurrentUserInterests(res.data.userAreas);
        setUserInterests(res.data.userAreas);
      })
      axios.get(`http://127.0.0.1:8000/api/userProjects/`+userId,{ headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        hideLoader();
        setProjects(res.data.projects)
      }).catch(e => console.log(e))
      axios.get(`http://127.0.0.1:8000/api/assignedSupervisor/`+userId,{ headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        hideLoader();
        setSupervisorDetails(res.data.details)
      }).catch(e => console.log(e))
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
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
    axios.post(`http://127.0.0.1:8000/api/saveProject`,{
      'description':description,
      'areas':projectAreas,
      'skills':tags,
      'userId':userId
    },{ headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      const newProjectList = projects.concat({
        'description':description,
        'areas':projectAreas,
        'skills':tags,
        'id':res.data.projectId
      });
      setProjects(newProjectList);
      setDescription('');
      setTags([]);
      setProjectAreas([]);
    })
  };
      
  const saveInterest = ()=>{
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('userToken');
    const removedInterests = currentUserInterests.filter(interest=> !userInterests.includes(interest))
    const newInterests = userInterests.filter(interest=> !currentUserInterests.includes(interest))
    axios.post(`http://127.0.0.1:8000/api/saveUserAreas`,{
      'removedInterests':removedInterests,
      'newInterests':newInterests,
      'userId':userId
    },{ headers: {"Authorization" : `Bearer ${token}`}})
  }

  const tagCards = tags.map((tag) =>
       <span class="badge tag">{tag}</span>
  );

  const deleteProject = (id) =>{
    showLoader();
    console.log(id);
    const token = localStorage.getItem('userToken');
    axios.get(`http://127.0.0.1:8000/api/deleteProject/`+id, { headers: { "Authorization": `Bearer ${token}` } })
    .then(res => {
      hideLoader();
      const currentProjects = projects.filter(project=> project.id!=id)
      setProjects(currentProjects);
    })
    .catch((error) => {
        hideLoader();
      })
  }
  const projectCards = projects.map((project) =>
  <div class="container grid-child projectCards">
      <p class='projectDescription'>
          {project.description}
      </p> 
      { project.areas.length?<span>Areas: </span>:''}
      {
         project.areas.map((skill,index) =>
         <span>{skill.label}{index+1==project.areas.length?'':', '}</span>
         )
      }
      <div class='skillTagProfileArea'>
      {
        project.skills.map((skill) =>
        <span class="badge tag">{skill}</span>
        )
      }
      </div>
      
    <button className='float' onClick={()=>deleteProject(project.id)}><img src={remove}/></button>
  </div>
);
  
  return (
    <div>
    {authorized?
    <div class="container">
      <div class="row">
        <div class="col-2">
        <button class='logoButton' onClick={studentDashboard}> <img src={logo}/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-8">
          <h1> Profile</h1>
        </div>
      </div>      
      <div class='row largeMarginTop'>
        <div class='offset-1 col-5'>
          <h4>Assigned supervisor:</h4>
        </div>
        <div class='col-6'>
        <h4>{supervisorDetails?supervisorDetails : ' - ' }</h4>
        </div>     
      </div>
      <div class='row marginTop'>
        <div class='offset-1 col-5'>
          <h4>What areas are you interested in? </h4>
        </div>
        <div class='col-3'>
          <MultiSelect
          options={areas}
          value={userInterests}
          onChange={setUserInterests}
          labelledBy="Select"
          />
        </div>  
        <div class='col-2'>
          <button class='primaryButton' disabled={JSON.stringify(currentUserInterests)==JSON.stringify(userInterests)} onClick={saveInterest}> Save Interests</button>
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
            <button class='primaryButton' onClick={addTags} disabled={newSkill===''}> Add</button>
          </div>
        </div> 
        <div class='row profileNewTagArea'>
          <div class='offset-6 col-3'>
            {tagCards}
          </div>
        </div>
        <div class='row profileRow'>
          <div class='offset-8 col-3'>
            <button class='primaryButton' disabled={description==''} onClick={addProject}> Save idea</button>
          </div>
        </div>  
      </div>
      <div class='projectCardContainer'>
        {projectCards}
      </div>
      {loader}
      <div class='row marginBottom marginTop'>
        <div class='offset-5 col-2'>
          <button class='secondaryButton' onClick={studentDashboard}>Back to dashboard</button>
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