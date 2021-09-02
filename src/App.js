import React, {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

import './App.css';
import WallOutlets from './components/WallOutlets'
import Lights from './components/Lights'

console.log(process.env.REACT_APP_API_IP);
const API_IP=process.env.REACT_APP_API_IP;
const ENDPOINT = "http://192.168.0.131:8888";


withStyles()
function App() {
  
 
  const handleButtonClick = (card,relay,type) => {
    let lobj= {
      card:card,
      relay:relay,
      type:type
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lobj)
  };
  fetch(API_IP+':3000/light', requestOptions)
  
      .then(response => console.log(response))
    
   // console.log(response);
    
  }

  const [outlets, setOutlets] = useState([{}]);
  const [lights, setLights] = useState([{}]);
  useEffect(() => {

   let lights;
    const url = API_IP+':3000/init';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        
        var lights={};
       
        lights= json.filter( outl=> outl.group === "valot");
        console.log("lights",lights);
        
        let outlets={};
        outlets= json.filter( outl=> outl.group === "pistorasiat" );
        console.log('outlets',outlets);
    
        setOutlets(outlets);
        setLights(lights);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
}, []);
useEffect(() => {
  const socket = socketIOClient(ENDPOINT);
    
  socket.on("FromAPI", data => {
    console.log(data);
  });

});
  return (
<>
   
    <FormGroup row>
      <FormLabel component="legend">Laiturin pistorasiat</FormLabel>
    <Grid container  spacing={1}>
        <WallOutlets outlets={outlets} handleButtonClick={handleButtonClick} />
     </Grid>
     </FormGroup>
  

      <FormGroup row>
      <FormLabel component="legend">Laiturin Valot</FormLabel>
    <Grid container  spacing={1}>
       <Lights lights={lights} handleButtonClick={handleButtonClick} />
     </Grid>
     </FormGroup>
   
  
  </>
  );
}

export default App;
