import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/Protectedroute';
import Unauthorized from './components/Unauthorized';

const API_IP=process.env.REACT_APP_API_IP;

function App() {

 

/* omitting some of the other LOC to save space */
  return (
   
    <div className="App">
      <Router>
        <Route exact path='/' component={Landing} />
       <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/unauthorized' component={Unauthorized} />
      </Router>
    </div>
  );
}


export default App;