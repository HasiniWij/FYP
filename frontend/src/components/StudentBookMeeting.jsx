import React, { useState, useEffect } from 'react';
import { ScheduleMeeting } from 'react-schedule-meeting';
import './Style.css';
import { useHistory, useParams } from "react-router-dom";
import profile from '../resources/profile.png';
import logo from '../resources/logo.png';
import axios from 'axios';

export default function StudentBookMeeting() {
  const [authorized, setAuthorized] = useState(false);
  const [timeSlots, setTimeSots] = useState([]);
  const [title, setTitle] = useState('');
  const [meetings, setMeetings] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(0);
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
    const role = localStorage.getItem('role');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (role == 'student' && isLoggedIn === 'true') setAuthorized(true);
    axios.get(`http://127.0.0.1:8000/api/meetings/` + meetingId, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        setTitle(res.data.title);
        setDuration(res.data.duration);
        setMeetings(res.data.meetings)
        availableTimeslots(res.data.meetings, res.data.duration)
      })
      .catch((error) => {
        if (error.response.status == 401) {
          setAuthorized(false);
          localStorage.setItem('isLoggedIn', false);
        }
      });
  }, []);

  const availableTimeslots = (allMeetings, duration) => {
    let dateTimes = []
    for (let meeting of allMeetings) {
      const date = new Date(meeting.dateTime);
      dateTimes.push({
        startTime: new Date(meeting.dateTime),
        endTime: new Date(date.getTime() + duration * 60000)
      });
    }
    setTimeSots(dateTimes)
  }

  const bookMeeting = () => {
    const token = localStorage.getItem('userToken');
    const selectedMeeting = meetings.filter((element) => new Date(selectedTime).getTime() == new Date(element.dateTime).getTime());
    const userId = localStorage.getItem('userId');

    axios.post(`http://127.0.0.1:8000/api/bookMeeting`, {
      'meetingId': selectedMeeting[0].id,
      'userId': userId
    }, { headers: { "Authorization": `Bearer ${token}` } })
      .then(res => {
        studentDashboard();
      })

  }

  const onTimeSelect = event => {
    setSelectedTime(event.startTime)
  }

  return (
    <div>
      {authorized ?
        <div className="container">
          <div className="row">
            <div className="col-2">
              <button className='logoButton' onClick={studentDashboard}> <img src={logo} />  </button>
            </div>
            <div className="d-flex justify-content-center title col-8">
              <h1> Book meeting timeslots</h1>
            </div>
            <div className="col-2 profileIconArea">
              <button className='profileButton' onClick={profilePage}>
                <img className='profileIcon' src={profile} />
              </button>
            </div>
          </div>
          <div className='bookMeeting largeMarginTop '>
            <h4 className="sub-title"> {title}</h4>
            <ScheduleMeeting
              borderRadius={10}
              primaryColor="#3f5b85"
              eventDurationInMinutes={duration}
              availableTimeslots={timeSlots}
              onStartTimeSelect={onTimeSelect}
              scheduleMeetingStyles={{ height: '420px' }}
            />
          </div>
          <div className='row marginBottom'>
            <div className='offset-5 col-1'>
              <button className='primaryButton' disabled={selectedTime == ''} onClick={bookMeeting}>Book</button>
            </div>
            <div className='col-1'>
              <button className='secondaryButton' onClick={studentDashboard}>Cancel</button>
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