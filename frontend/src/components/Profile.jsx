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

  const role = localStorage.getItem('role');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
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
      })
      if(role=='student'){
        axios.get(`http://127.0.0.1:8000/api/assignedSupervisor/`+userId,{ headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        hideLoader();
        setSupervisorDetails(res.data.details)
      });
      }
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
  const projectPlaceholder = (selected, _options) => {
    return !selected.length &&  "Add the technical areas the project is falling under";
  };
  const userInterestPlaceholder = (selected, _options) => {
    return !selected.length &&  "Add areas wanted to work on"
  }
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

  const tagCards = tags.map((tag,index) =>
       <span className="badge tag" key={index}>{tag}</span>
  );

  const deleteProject = (id) =>{
    showLoader();
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
  const projectCards = projects.map((project,index) =>
  <div className="container grid-child projectCards" key={index}>
      <p className='projectDescription'>
          {project.description}
      </p> 
      { project.areas.length?<span>Areas: </span>:''}
      {
         project.areas.map((skill,index) =>
         <span key={index}>{skill.label}{index+1==project.areas.length?'':', '}</span>
         )
      }
      <div className='skillTagProfileArea'>
      {
        project.skills.map((skill,index) =>
        <span className="badge tag" key={index}>{skill}</span>
        )
      }
      </div>
      
    <button className='float' onClick={()=>deleteProject(project.id)}><img src={remove}/></button>
  </div>
);
  
  return (
    <div>
    {authorized?
    <div className="container">
      <div className="row">
        <div className="col-2">
        <button className='logoButton' onClick={studentDashboard}> <img src={logo}/>  </button>
        </div>
        <div className="d-flex justify-content-center title col-8">
          <h1> Profile</h1>
        </div>
      </div>      
      {role=='student'&& <div className='row largeMarginTop'>
        <div className='offset-1 col-5'>
          <h4>Assigned supervisor:</h4>
        </div>
        <div className='col-6'>
        <h4>{supervisorDetails?supervisorDetails : ' - ' }</h4>
        </div>     
      </div>
      }
      <div className='row marginTop'>
        <div className='offset-1 col-5'>
          <h4>What areas are you interested in? </h4>
        </div>
        <div className='col-3'>
          <MultiSelect
          options={areas}
          value={userInterests}
          onChange={setUserInterests}
          labelledBy="Select"
          valueRenderer ={userInterestPlaceholder}
          />
        </div>  
        <div className='col-2'>
          <button className='primaryButton' disabled={JSON.stringify(currentUserInterests)==JSON.stringify(userInterests)} onClick={saveInterest}> Save Interests</button>
        </div>   
      </div>
      <div className='row largeMarginTop'>
        <div className='offset-1 col-5'>
          <h4>Potential ideas you want to work on? </h4>
        </div>
        <div className='col-5'>
          <textarea className="form-control" value={description} rows="3" onChange={onDescriptionChange}></textarea>
        </div>     
      </div>
      <div className='row profileRow'>
        <div className='offset-6 col-5'>
          <MultiSelect
            options={areas}
            value={projectAreas}
            onChange={setProjectAreas}
            labelledBy="Select"
            valueRenderer ={projectPlaceholder}
            />
        </div>  
        <div className='row profileRow'>
          <div className='offset-6 col-3'>
            <input type="text" className="form-control skillInput" onChange={onSkillChange} placeholder="Add required technical skills" value={newSkill}/>
          </div>
          <div className='col-3'>
            <button className='primaryButton' onClick={addTags} disabled={newSkill===''}> Add</button>
          </div>
        </div> 
        <div className='row profileNewTagArea'>
          <div className='offset-6 col-3'>
            {tagCards}
          </div>
        </div>
        <div className='row profileRow'>
          <div className='offset-8 col-3'>
            <button className='primaryButton' disabled={description==''} onClick={addProject}> Save idea</button>
          </div>
        </div>  
      </div>
      <div className='projectCardContainer'>
        {projectCards}
      </div>
      {loader}
      <div className='row marginBottom marginTop'>
        <div className='offset-5 col-2'>
          <button className='secondaryButton' onClick={studentDashboard}>Back to dashboard</button>
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