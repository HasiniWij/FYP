import React, { useState,useEffect  }  from 'react';
import './Style.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import logo from '../resources/logo.png'; 
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateMeeting() {
  
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const[dates,setDates]= useState([]);
  const [authorized,setAuthorized]=useState(false);

  const history = useHistory();
  const studentDashboard = () => {
    history.push("/supervisorDashboard")
  }

  useEffect(() => {
    
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    if(role=='student'|| role=='supervisor') setAuthorized(true)
  },[]);

  const addDates = () => {
    const newList = dates.concat(date);
    setDates(newList);
  }
  const onTitleChange = event => {
    setTitle(event.target.value);
  };
  const onDurationChange = event =>{
    setDuration(event.target.value);
  }
 
  const dateCards = dates.map((date) =>
       <span className="badge dates">{date.toString()}</span>
  );
  const createMeeting = ()=>{
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
    const meeting={
        'title':title,
        'duration':duration,
        'dates':dates,
        'userId':userId
    }
    axios.post(`http://127.0.0.1:8000/api/saveMeeting`,meeting,{ headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
        history.push("/scheduleMeetings")
    })
  }
   
  return (
    <div>
    {authorized?
    <div className="container">
      <div className="row">
        <div className="col-2">
        <button className='logoButton' onClick={studentDashboard}> <img src={logo}/>  </button>
        </div>
        <div className="d-flex justify-content-center title col-8">
          <h1> Create meeting series</h1>
        </div>
      </div>
      <div className='row marginTop'>
        <div className='offset-1 col-3'>
          <h4>Meeting title </h4>
        </div>
        <div className='col-6'>
            <input type="text" className="form-control skillInput" onChange={onTitleChange}  value={title}/>
        </div>     
      </div>
      <div className='row marginTop'>
        <div className='offset-1 col-3'>
          <h4>Duration </h4>
        </div>
        <div className='col-1'>
            <input type="text" className="form-control skillInput" onChange={onDurationChange} value={duration}/> 
        </div>  
        <div className='col-3'>
            minutes
        </div>     
      </div>      
      <div className='row marginTop'>
        <div className='offset-1 col-3'>
          <h4>Date and start time</h4>
        </div>
        <div className='col-2'>
        <DatePicker
        selected={date}
        onChange={(date) => setDate(date)}
        showTimeSelect
        dateFormat="Pp"
        />
        </div>  
        <div className='col-3'>
            <button className='primaryButton' onClick={addDates}> Add</button>
          </div>   
      </div>
      <div className='row profileNewTagArea marginTop'>
          <div className='offset-1 col-11'>
            {dateCards}
          </div>
      </div>
      <div className='row marginBottom largeMarginTop'>
        <div className='offset-4 col-2'>
          <button className='secondaryButton' onClick={studentDashboard}>Back to dashboard</button>
        </div>
        <div className='col-2'>
          <button className='primaryButton' onClick={createMeeting}>Create meeting</button>
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