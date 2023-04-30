import React, { useState,useEffect  }  from 'react';
import './Style.css';
import axios from 'axios';
import { useHistory,useParams } from "react-router-dom";
import logo from '../resources/logo.png'; 
import "react-datepicker/dist/react-datepicker.css";
import useLoader from "../hooks/useLoader";

export default function MeetingInformation() {
  
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const[dates,setDates]= useState([]);
  const [loader, showLoader, hideLoader] = useLoader();
  const [authorized,setAuthorized]=useState(false);

  const history = useHistory();
  const scheduleMeetingsPage = () => {
    history.push("/scheduleMeetings")
  }
  const supervisorDashboard = () => {
    history.push("/supervisorDashboard")
  }

  let { meetingId } = useParams();
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(role=='supervisor' && isLoggedIn==='true') setAuthorized(true)
    showLoader();
    console.log(meetingId)
    axios.get(`http://127.0.0.1:8000/api/meetingInformation/`+meetingId,{ headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      setTitle(res.data.title);
      setDuration(res.data.duration);
      setDates(res.data.timeslots);
      hideLoader();
    })
  },[]);


  const dateCards = dates.map((date) =>{
    return( 
      <div className="badge dates">
        <h6>{new Date(date.time).toString()}</h6>
        <h5>{date.studentName?date.studentName: ' - '}</h5>
      </div>
    )
  }  
  );
 
  
   
  return (
    <div>
    {authorized?
    <div className="container">
      <div className="row">
        <div className="col-2">
        <button className='logoButton' onClick={supervisorDashboard}> <img src={logo}/>  </button>
        </div>
        <div className="d-flex justify-content-center title col-8">
          <h1> Meeting Information</h1>
        </div>
      </div>
      <div className='row marginTop'>
        <div className='offset-1 col-3'>
          <h4>Title </h4>
        </div>
        <div className='col-3'>
           <h5>{title} </h5>
        </div>     
      </div> 
      <div className='row marginTop'>
        <div className='offset-1 col-3'>
          <h4>Duration </h4>
        </div>
        <div className='col-3'>
           <h5>{duration} minutes</h5>
        </div>     
      </div>      
      <div className='row marginTop'>
        <div className='offset-1 col-3'>
          <h4>Date and start times</h4>
        </div>  
      </div>
      <div className='row profileNewTagArea marginTop'>
          <div className='offset-1 col-11'>
            {dateCards}
          </div>
      </div>
      {loader}
      <div className='row marginBottom largeMarginTop'>
        <div className='offset-6 col-2'>
          <button className='secondaryButton' onClick={scheduleMeetingsPage}>Back</button>
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