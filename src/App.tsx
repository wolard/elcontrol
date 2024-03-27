//import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Landing} from './components/Landing';
import Dashboard from './components/Dashboard';
import Search from './components/Search';
import Unauthorized from './components/Unauthorized';
import { socket } from './socket';
import { ILight } from '../types';



function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<any>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
  
    function onDisconnect() {
      setIsConnected(false);
    
    }
  
    function onFooEvent(value: any) {
      setFooEvents((previous: any) => [...previous, value]);
    }
  
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
  
  
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
 
    };
  }, []);

/* omitting some of the other LOC to save space */
  return (
   
    <div className="App">
      <Router>
        <Route exact path='/' component={Landing} />
       <Route exact path='/dashboard' component={Dashboard} />
       <Route exact path='/search' component={Search} />
        <Route exact path='/unauthorized' component={Unauthorized} />
      </Router>
    </div>
  );
}


export default App;