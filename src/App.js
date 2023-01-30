import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';

import StudentBookMeeting from './components/StudentBookMeeting';
import StudentDashboard from './components/StudentDashboard';
import RequestSupervision from './components/RequestSupervision';
import SupervisorsList from './components/SupervisorsList';
import SignIn from './components/SignIn';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={StudentBookMeeting} />
      <Route path="/studentBookMeeting" exact component={StudentBookMeeting} />
      <Route path="/studentDashboard" exact component={StudentDashboard} />
      <Route path="/requestSupervision" component={RequestSupervision} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/supervisorsList" component={SupervisorsList} />
    </Router>
  );
}

export default App;