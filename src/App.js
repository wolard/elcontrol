import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/Protectedroute';
import Unauthorized from './components/Unauthorized';



function App() {

  const [user, setUser] = useState(false);
  const [user2, setUser2] = useState('test');

const handleLogin = e => {
  e.preventDefault();
  setUser(true);
  setUser2('pimpelipom')
}
const handleLogout = e => {
  e.preventDefault();
  setUser(false);
}

/* omitting some of the other LOC to save space */
  return (
   
    <div className="App">
      <Router>
        <Route exact path='/' handleLogin={handleLogin} render={
           ()=> <Landing  user={user.toString()} user2={user2}
            handleLogin={handleLogin} />} />
       <ProtectedRoute exact path='/dashboard' user={user} handleLogout={handleLogout} component={Dashboard} />
        <Route exact path='/unauthorized' component={Unauthorized} />
      </Router>
    </div>
  );
}


export default App;