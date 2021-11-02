import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles, } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { AppBar } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import { Box } from '@material-ui/core';





//import './App.css';
import WallOutlets from './WallOutlets'
import Lights from './Lights'


const StyledFormlabel = withStyles({    //another way modifying css
  root: {
   
    borderRadius: 3,
    border: 0,
    color: 'black',
    height: 48,
    margin: '15px 15px 0px 15px',
    fontSize: 25
   
    

  },
 

})(FormLabel);

const useStyles = makeStyles((theme) => ({
 
  appbar: {
    padding:'5px'
  },
  Typography:{
    flexGrow:1
  }
}));


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
initiateSocketConnection();
const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}
/*
const subscribeToChat = (cb) => {
	socket.emit('my message', 'Hello there from React.');
  if (!socket) return(true);
  socket.on('my broadcast', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
}
*/
const subscribeToMessages = (cb) => {
  if (!socket) return(true);
  socket.on('my broadcast', msg => {
    console.log('Room event received!');
   
    return cb(null, msg);
  });
  
}


function Dashboard() {
  
  const [outlets, setOutlets] = useState([{'card':0,'relay':0,'type':'','status':false}]);
  const [lights, setLights] = useState([{'card':0,'relay':0,'type':'','status':false}]);
  const [kwhs, setKwhs] = useState([0,0,0,0,0,0,0,0,0]);
  const history = useHistory();
  const classes = useStyles();


const handleLogout = e => {
  e.preventDefault();
  localStorage.removeItem('user');
  return history.push('/');
}


const handleChangeLights = (index) => {
  let token = (localStorage.getItem('user'));
 lights[index].status=!lights[index].status ;
 
 
  const newLights = [...lights]      
  console.log(newLights)
  setLights(newLights);  
  let lobj= {
    card:lights[index].card,
    relay:lights[index].relay,
    type:lights[index].type
  }
  console.log(lobj);
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-access-token':token  },
    body: JSON.stringify(lobj)
};
fetch(API_IP+':3000/light', requestOptions)

    .then(response => response.status)
  //  .then(data=> console.log(data))
  
};





const handleChangeOutlets = (index) => {
  let token = (localStorage.getItem('user'));
  outlets[index].status=!outlets[index].status 
  
  
  const newOutlets = [...outlets]      
  console.log(newOutlets)
  setOutlets(newOutlets);  
  
  let lobj= {
    card:outlets[index].card,
    relay:outlets[index].relay,
    type:outlets[index].type
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-access-token':token},
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
    let token = (localStorage.getItem('user'));
    const Options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' ,
      'x-access-token':token   },
     };
    const fetchData = async () => {
      try {
        
        const response = await fetch(url,Options);
        const json = await response.json();
        
       
       
       const lights= json.filter( outl=> outl.groupname === "valot");
        console.log("lights",lights);
        
      
       const outlets= json.filter( outl=> outl.groupname === "pistorasiat" );
        console.log('outlets',outlets);
    
        setOutlets(outlets);
        setLights(lights);
      } catch (error) {
        console.log("error", error);
      }
    };
    const fetchKwh = async () => {
      try {
        
        const response = await fetch(url,Options);
        const json = await response.json();
        
       
          
       const outlets= json.filter( outl=> outl.groupname === "pistorasiat" );
       const kwhs=outlets.map(a=>a.kwh)
        console.log('kwhs',kwhs);
        const newKwhs = [...kwhs]   
        setKwhs(newKwhs)   
       
      
      
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
    const interval=setInterval(()=>{
      fetchKwh()
     },1000)
     return()=>clearInterval(interval)


}, []);
useEffect(() => {
  if (lights) {
  //  
  initiateSocketConnection();
  subscribeToMessages((err, data) => {
   
    console.log('received event');
    console.log(data);
    const newLights = [...lights];

    let index = newLights.findIndex((obj => obj.relay === data.relay));
  if (newLights[index]){
   newLights[index].status=data.status;
  setLights(newLights);  
  disconnectSocket(); 
}
 
  });
  

  }
}, [lights]);

 
   
  return (
    <>
    <Container maxWidth="sm">
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        
          <Typography variant="h3" component="div" className={classes.Typography}>
            Teijo Elcontrol
          </Typography>
          <Button variant="contained" onClick={handleLogout}> logout</Button>
          </Toolbar>
      </AppBar>
 </Box>
 
    <FormGroup row>
      <StyledFormlabel component="legend">Laiturin pistorasiat</StyledFormlabel>
    <Grid container  spacing={1}>
        <WallOutlets kwhs={kwhs} outlets={outlets} handleChange={handleChangeOutlets}  />
     </Grid>
     </FormGroup>
  

      <FormGroup row>
      <StyledFormlabel component="legend">Laiturin Valot</StyledFormlabel>
    <Grid container  spacing={1}>
       <Lights lights={lights} handleChange={handleChangeLights} />
     </Grid>
     </FormGroup>
   
   </Container>
   </>
 
  

 
  );
}

export default Dashboard;
