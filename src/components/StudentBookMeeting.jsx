import React from 'react';
import { ScheduleMeeting } from 'react-schedule-meeting';
import './Style.css';

export default function StudentBookMeeting() {
  // this generates basic available timeslots for the next 6 days
  const availableTimeslots = [
    {
          startTime: new Date("2022-12-22").setHours(9, 0, 0, 0),
          endTime: new Date("2022-12-22").setHours(15, 0, 0, 0),
    }
  ]
  

  return (

    <div class="container">
      <div class="d-flex justify-content-center title">
        <h1> Book meeting timeslots</h1>
      </div>
      <div>
        <h3 class="sub-title"> First code implementation review</h3>
        <ScheduleMeeting
        borderRadius={10}
        primaryColor="#3f5b85"
        eventDurationInMinutes={30}
        availableTimeslots={availableTimeslots}
        onStartTimeSelect={console.log}
        />
      </div>
      <div>
        <h3 class="sub-title"> Progress meeting week 5</h3>
        <ScheduleMeeting
        borderRadius={10}
        primaryColor="#3f5b85"
        eventDurationInMinutes={30}
        availableTimeslots={availableTimeslots}
        onStartTimeSelect={console.log}
        />
      </div>
    </div>
  );
}