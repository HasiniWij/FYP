import React from 'react';

import StudentBookMeeting from './components/StudentBookMeeting';
import StudentDashboard from './components/StudentDashboard';
import RequestSupervision from './components/RequestSupervision';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={StudentBookMeeting} />
      <Route path="/studentBookMeeting" exact component={StudentBookMeeting} />
      <Route path="/studentDashboard" exact component={StudentDashboard} />
      <Route path="/requestSupervision" component={RequestSupervision} />
    </Router>
  );
}

export default App;