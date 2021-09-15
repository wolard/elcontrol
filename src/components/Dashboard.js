import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles, } from '@material-ui/core/styles';



//import './App.css';
import WallOutlets from './WallOutlets'
import Lights from './Lights'


const StyledFormlabel = withStyles({
  root: {
    background: 'white',
    borderRadius: 3,
    border: 0,
    color: 'black',
    height: 48,
    padding: '15px 15px 0px 15px',
    fontSize: 25
    
    

  }

})(FormLabel);



const API_IP=process.env.REACT_APP_API_IP;
/*
const socket = socketIOClient(API_IP+':3000');
socket.on("FromAPI", data => {
  console.log(data.relay);
  
});
*/
let socket;
const initiateSocketConnection = () => {
  socket = socketIOClient(API_IP+':3000');
  console.log(`Connecting socket...`);
}
const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}
const subscribeToChat = (cb) => {
	socket.emit('my message', 'Hello there from React.');
  if (!socket) return(true);
  socket.on('my broadcast', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}

const subscribeToMessages = (cb) => {
  if (!socket) return(true);
  socket.on('my broadcast', msg => {
    console.log('Room event received!');
   
    return cb(null, msg);
  });
  
}


function Dashboard() {
  
  const [outlets, setOutlets] = useState([{status:false}]);
  const [lights, setLights] = useState([{status:false}]);
 
  const history = useHistory();
 
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

const handleLogout = e => {
  e.preventDefault();
  localStorage.removeItem('user');
  return history.push('/');
}


const handleChangeLights = (index) => {
 lights[index].status=!lights[index].status 
 
 let card=lights[index].card;
let relay=lights[index].relay;
let type=lights[index].type;
  const newLights = [...lights]      
  console.log(newLights)
  setLights(newLights);  
  let lobj= {
    card:card,
    relay:relay,
    type:type
  }
  console.log(lobj);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lobj)
};
fetch(API_IP+':3000/light', requestOptions)

    .then(response => response.status)
  //  .then(data=> console.log(data))
  
};





const handleChangeOutlets = (index) => {
  
  outlets[index].status=!outlets[index].status 
  let card=outlets[index].card;
  let relay=outlets[index].relay;
  let type=outlets[index].type;
 
  const newOutlets = [...outlets]      
  console.log(newOutlets)
  setOutlets(newOutlets);  
  
  let lobj= {
    card:card,
    relay:relay,
    type:type
  }
  console.log(lobj);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lobj)
};
fetch(API_IP+':3000/light', requestOptions)

    .then(response => response.status)
  //  .then(data=> console.log(data))
  
};

    

  useEffect(() => {
   
    
   
   
    //const user = JSON.parse(localStorage.getItem('user'));
    //console.log(user);
    const url = API_IP+':3000/init';
    const token = (localStorage.getItem('user'));
    const Options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' ,
      'x-access-token':token   },
     };
    const fetchData = async () => {
      try {
        
        const response = await fetch(url,Options);
        const json = await response.json();
        
       
       let lights={};
       lights= json.filter( outl=> outl.groupname === "valot");
        console.log("lights",lights);
        
        let outlets={};
        outlets= json.filter( outl=> outl.groupname === "pistorasiat" );
        console.log('outlets',outlets);
    
        setOutlets(outlets);
        setLights(lights);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    return () => {
      disconnectSocket();
    }
    


}, []);
useEffect(() => {
  if (lights) {
    initiateSocketConnection();
  subscribeToMessages((err, data) => {
   console.log(data);
    const newLights = [...lights];

    let index = newLights.findIndex((obj => obj.relay === data.relay));
  if (newLights[index]){
   newLights[index].status=data.status;
  setLights(newLights);  
  }
  
  });
  return () => {
    disconnectSocket();
  }
}

}, [lights]);



  return (
<>
<button onClick={handleLogout}>Log Out</button>
    <FormGroup row>
      <StyledFormlabel component="legend">Laiturin pistorasiat</StyledFormlabel>
    <Grid container  spacing={1}>
        <WallOutlets outlets={outlets} handleChange={handleChangeOutlets}  />
     </Grid>
     </FormGroup>
  

      <FormGroup row>
      <StyledFormlabel component="legend">Laiturin Valot</StyledFormlabel>
    <Grid container  spacing={1}>
       <Lights lights={lights} handleChange={handleChangeLights} />
     </Grid>
     </FormGroup>
   
  
  </>
  );
}

export default Dashboard;
