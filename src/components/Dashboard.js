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
const initiateSocketConnection =  () => {
  socket = socketIOClient(API_IP+':3000');
  console.log(`Connecting socket...`);
  console.log(socket)
 

}

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
const subscribeToIoboard = (cb) => {
  if (!socket) return(true);
  
  socket.on('ioboard', msg => {
    console.log(msg);
   
    return cb(null, msg);
  });
  
}



function Dashboard() {
 

  const [outlets, setOutlets] = useState([{'card':0,'relay':0,'type':'','status':false}]);
  const [lights, setLights] = useState([{'card':0,'relay':0,'type':'','status':false}]);
  const [watts, setWatts] = useState([0,0,0,0,0,0,0,0,0]);
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
  /*
  outlets[index].status=!outlets[index].status 
  
  
  const newOutlets = [...outlets]      
  console.log(newOutlets)
  setOutlets(newOutlets);  
  */
  let lobj= {
    card:outlets[index].card,
    relay:outlets[index].relay,
    type:outlets[index].type
  }
console.log(lobj)
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
    initiateSocketConnection();
   

   
  
   
    if (socket)
    {
    socket.on('watts', msg => {

      setWatts(msg)
      console.log(msg)
    });
    }
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
        json.forEach(e => {
          //e.status = Boolean(e.status);
          
        });
   
       
        const lghts= json.filter( outl=> outl.groupname === "valot");
        console.log("lights",lghts);
      
        
      
       const outl= json.filter( outl=> outl.groupname === "pistorasiat" );
       
       console.log('outlets',outl);
    
        setOutlets(outl);
        setLights(lghts);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();

     return()=>{
     //clearInterval(interval)
    console.log('clearing')
     // socket.off("watts");
   
      disconnectSocket();
     
   
    
    }

}, []);
useEffect(() => {
  if (lights) {
  //  
 // initiateSocketConnection();
  /*
  subscribeToMessages((err, data) => {
    if(err) return;
   console.log(lights);
  
    console.log('lightstatus',data);
    const newLights = [...lights];
    newLights[data.num].status= data.state

  


  setLights(newLights);  
  //disconnectSocket(); 


  
    
  });

  return () => {
    disconnectSocket();
  }
   */
}
}, [lights]);
 
useEffect(() => {
 
 // if (outlets) initiateSocketConnection();
  subscribeToIoboard((err, data) => {
    if(err) return;  
    //console.log('outletstatus',data);
    const newOutlets = [...outlets];
    const outlet= newOutlets.filter( outl=> outl.relay === data.num );
    console.log(outlet);
    outlet.status=Boolean(data.state)
    newOutlets[data.num-1].status= data.state
    setOutlets(newOutlets);  
    //console.log('newoutlets',newOutlets[data.num])
  }

    );
    /*
    subscribeToWatts((err, data) => {
      if(err) return;  
      
      setWatts(data);  
      //console.log('newoutlets',newOutlets[data.num])
    })
*/

  return () => {
   // disconnectSocket();
    //socket.off("watts");
    socket.off("ioboard");
   // disconnectSocket();
  }
  
}

  
  
, [outlets]);

 
   
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
        <WallOutlets watts={watts} outlets={outlets} handleChange={handleChangeOutlets}  />
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
