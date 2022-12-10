import React from 'react';

import StudentBookMeeting from './components/StudentBookMeeting';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={StudentBookMeeting} />
      {/* <Route path="/chat" component={Chat} /> */}
    </Router>
  );
}

export default App;