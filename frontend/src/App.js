import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';

import StudentBookMeeting from './components/StudentBookMeeting';
import StudentDashboard from './components/StudentDashboard';
import SupervisorDashboard from './components/SupervisorDashboard';
import RequestSupervision from './components/RequestSupervision';
import SupervisorsList from './components/SupervisorsList';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import ProposedProjects from './components/ProposedProjects';
import StudentsList from './components/StudentsList';
import SupervisionRequests from './components/SupervisionRequests';
import ScheduleMeetings from './components/ScheduleMeetings';
import AdminDashboard from './components/AdminDashboard';
import AdminStudentList from './components/AdminStudentList';
import AdminSupervisorList from './components/AdminSupervisorList';
import MatchSupervisorsStudents from './components/MatchSupervisorsStudents';
import Logs from './components/Logs';
import CreateMeeting from './components/CreateMeeting';
import StudentMeeting from './components/StudentMeeting';
import MeetingInformation from './components/MeetingInformation';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={SignIn} />
      <Route path="/studentBookMeeting/:meetingId" exact component={StudentBookMeeting} />
      <Route path="/studentDashboard" exact component={StudentDashboard} />
      <Route path="/requestSupervision" component={RequestSupervision} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/supervisorsList" component={SupervisorsList} />
      <Route path="/profile" component={Profile} />
      <Route path="/proposedProjects/:id?" component={ProposedProjects} />
      <Route path="/supervisorDashboard" exact component={SupervisorDashboard} />
      <Route path="/studentsList" exact component={StudentsList} />
      <Route path="/supervisionRequests" exact component={SupervisionRequests} />
      <Route path="/scheduleMeetings" exact component={ScheduleMeetings} />
      <Route path="/adminDashboard" exact component={AdminDashboard} />
      <Route path="/adminStudentList" exact component={AdminStudentList} />
      <Route path="/adminSupervisorList" exact component={AdminSupervisorList} />
      <Route path="/matchSupervisorsStudents" exact component={MatchSupervisorsStudents} />
      <Route path="/createMeeting" exact component={CreateMeeting} />
      <Route path="/logs/:name?" component={Logs} />
      <Route path="/studentMeeting" component={StudentMeeting} />
      <Route path="/meetingInformation/:meetingId" component={MeetingInformation} />
    </Router>
  )
}
export default App