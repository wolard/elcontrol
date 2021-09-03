import React, {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';



import './App.css';
import WallOutlets from './components/WallOutlets'
import Lights from './components/Lights'

console.log(process.env.REACT_APP_API_IP);
const API_IP=process.env.REACT_APP_API_IP;
const ENDPOINT = "http://192.168.0.131:8888";



function App() {
  
  const [outlets, setOutlets] = useState([{}]);
  const [lights, setLights] = useState([{status:false}]);
 
 /* const handleSwitch = (card,relay,type) => {
   console.log("switch");
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
  
      .then(response => response.json())
      .then(data=> console.log(data))
    
  
    
  }
*/


const handleChange = (index) => {
  
  lights[index].status=!lights[index].status 
 
  const newLights = [...lights]      
  console.log(newLights)
  setLights(newLights);  
  

  
};

 
  useEffect(() => {

 
    const url = API_IP+':3000/init';

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        
       
       let lights={};
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

  
  /*
  const socket = socketIOClient(ENDPOINT);
    
  socket.on("FromAPI", data => {
    console.log(data);
  });
*/
});



  return (
<>
   
    <FormGroup row>
      <FormLabel component="legend">Laiturin pistorasiat</FormLabel>
    <Grid container  spacing={1}>
        <WallOutlets outlets={outlets}  />
     </Grid>
     </FormGroup>
  

      <FormGroup row>
      <FormLabel component="legend">Laiturin Valot</FormLabel>
    <Grid container  spacing={1}>
       <Lights lights={lights} handleChange={handleChange} />
     </Grid>
     </FormGroup>
   
  
  </>
  );
}

export default App;
