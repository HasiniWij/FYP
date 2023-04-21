import React, { useState,useEffect  }  from 'react';
import { ScheduleMeeting } from 'react-schedule-meeting';
import './Style.css';
import { useHistory,useParams } from "react-router-dom";
import logo from '../resources/logo.png'; 
import axios from 'axios';
import { forEach } from 'lodash';

export default function StudentBookMeeting() {
  const [authorized,setAuthorized]=useState(false);
  const [timeSlots,setTimeSots]=useState([]);
  const [title,setTitle]=useState('');
  const [meetings,setMeetings]=useState([]);
  const [selectedTime,setSelectedTime]=useState('');
  const [duration,setDuration]=useState(0);
  const history = useHistory();
  const profilePage = () => {
    history.push("/profile")
  }
  const studentDashboard = () => {
    history.push("/studentMeeting")
  }

  let { meetingId } = useParams();
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    if(role=='student') setAuthorized(true);
    axios.get(`http://127.0.0.1:8000/api/meetings/`+meetingId,{ headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        setTitle(res.data.title);
        setDuration(res.data.duration);
        setMeetings(res.data.meetings)
        availableTimeslots(res.data.meetings,res.data.duration)
      })
  },[]);

  const availableTimeslots = (allMeetings,duration) =>{
      let dateTimes=[]
      for (let meeting of allMeetings) {
        const date = new Date(meeting.dateTime) ;
        dateTimes.push({
              startTime: new Date(meeting.dateTime),
              endTime: new Date(date.getTime() + duration*60000)
        });
      }
      setTimeSots(dateTimes)
  }

  const bookMeeting = () =>{
    const selectedMeeting = meetings.filter((element) => new Date(selectedTime).getTime() == new Date(element.dateTime).getTime());  
    const userId = localStorage.getItem('userId');  
    
    axios.post(`http://127.0.0.1:8000/api/bookMeeting`,{
      'meetingId':selectedMeeting[0].id,
      'userId': userId
    })
    .then(res => {
      studentDashboard();
    })

  }

  const onTimeSelect = event =>{
    setSelectedTime(event.startTime)
  }

  return (
    <div class="container">
      <div class="row">
        <div class="col-2">
        <button class='logoButton' onClick={studentDashboard}> <img src={logo}/>  </button>
        </div>
        <div class="d-flex justify-content-center title col-8">
          <h1> Book meeting timeslots</h1>
        </div>
        <div class="col-2 profileIconArea">
          <button class='profileButton' onClick={profilePage}>H</button>
        </div>
      </div>
      <div class='bookMeeting largeMarginTop '>
        <h4 class="sub-title"> {title}</h4>
          <ScheduleMeeting
          borderRadius={10}
          primaryColor="#3f5b85"
          eventDurationInMinutes={duration}
          availableTimeslots={timeSlots}
          onStartTimeSelect={onTimeSelect}
          scheduleMeetingStyles={{height:'420px'}}
          />
      </div>
      <div class='row marginBottom'>
        <div class='offset-5 col-1'>
          <button class='primaryButton' onClick={bookMeeting}>Book</button>
        </div>
        <div class='col-1'>
          <button class='secondaryButton' onClick={studentDashboard}>Cancel</button>
        </div>
      </div>
    </div>
  );
}