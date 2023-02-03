import React, { useState }  from 'react';
import './Style.css';
import { MultiSelect } from "react-multi-select-component";

export default function Profile() {

  const [tags, setTags] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [userInterests, setUserInterests] = useState([]);
  const [description, setDescription] = useState('');
  const [projectAreas, setProjectAreas] = useState([]);
  const [projects, setProjects] = useState([]);

  const areas = [
    { label: "Mobile app development", value: "mobile" },
    { label: "Web app development", value: "web" },
    { label: "User Interface", value: "ui" },
    { label: "Computer vision", value: "computerVision" },
    { label: "Robotics", value: "robotics" },
    { label: "Machine learning", value: "ml" },
    { label: "Game development", value: "game" },
    { label: "Multi modal human interaction", value: "humanInteraction" },
    { label: "Artificial intelligence", value: "ai" },
    { label: "Database", value: "database" },
    { label: "Maths", value: "maths" },
    { label: "Intelligent systems", value: "ai" },
    { label: "Formal methods", value: "formalMethods" },
    { label: "Logic", value: "logic" },
    { label: "Automated Reasoning", value: "automatedReasoning" },
    { label: "Business Analytic", value: "businessAnalytic" },
    { label: "NLP", value: "nlp" },
    { label: "Analytics", value: "analytics" },
    { label: "Programming", value: "programming" },
    { label: "Sentiment Analysis", value: "sentimentAnalysis" },
    { label: "Computer Architecture Design", value: "computerArchitecture" },
    { label: "Processor Design", value: "processorDesign" },
    { label: "Internet of things", value: "iot" },
    { label: "Data analysis and processing", value: "dataAnalysis" },
    { label: "Security", value: "security" },
    { label: "Malware", value: "malware" },
    { label: "Forensics", value: "forensics" },
    { label: "DDoS attacks", value: "ddosAttacks" },
    { label: "data visualization", value: "dataVisualization" },
    { label: "Safety Critical software", value: "safetyCritical" },
    { label: "Virtual Reality", value: "vr" },
    { label: "Game engine", value: "gameEngine" },
    { label: "Cloud Computing", value: "cloudComputing" },
    { label: "Networking", value: "networking" },
    { label: "Distributed Computing", value: "distributedComputing" },
    { label: "Deep learning", value: "deepLearning" },
    { label: "Interactive design", value: "interactiveDesign" },
    { label: "Neural networks", value: "neuralNetworks" },
    { label: "Data science", value: "dataScience" },
    { label: "Image processing", value: "ImageProcessing" },
    { label: "IDE development", value: "IDE" },
  ];  
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
      <div class="d-flex justify-content-center title">
        <h1> Profile </h1>
      </div>
      <div class='row'>
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
      <div class='row marginTop'>
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
    </div>
  );
}