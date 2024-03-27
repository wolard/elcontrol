import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { AppBar,Container,Typography,Button,FormLabel,FormGroup,Grid,Box,Toolbar } from '@mui/material';
import { makeStyles,withStyles } from '@mui/styles';
import {Link} from "react-router-dom";






//import './App.css';
import WallOutlets from './WallOutlets'
import Lights from './Lights'
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { API_IP, socket } from '../socket';
import { ClientToServerEvents, ILight, IOutlet, ServerToClientEvents } from '../../types';



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



const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}



let initialKwhs = [
  0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0
];
function Dashboard() {
 
  const [lights, setLights] = useState<ILight[]>([]);
  const [outlets, setOutlets] = useState<IOutlet[]>([]);
  const [kwhs, setKwhs] = useState<number[]>(initialKwhs);
 


  const history = useHistory();
  const classes = useStyles();


const handleLogout = (e:any)=> {
 
  e.preventDefault();
  localStorage.removeItem('user');
  return history.push('/');
}




useEffect(() => {                  
  let token = (localStorage.getItem('user'));
  console.log('token',token)
  const Options:RequestInit = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' ,
    'Authorization':`Bearer ${token}`}
   };
  const fetchLightData = async () => {
    try {
      
      const response = await fetch(API_IP+'/initlights',Options);
      const json:ILight[] = await response.json();
  
   
      console.log("lights",json);
    
    
  
      setLights(json);

    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchOutletData = async () => {
    try {
      
      const response = await fetch(API_IP+'/initoutlets',Options);
      const json:IOutlet[] = await response.json();
  
   
      console.log("outlets",json);
    json.forEach(outlet=>(outlet.pending=false))
    console.log('outtt0',json)
  
      setOutlets(json);

    } catch (error) {
      console.log("error", error);
    }
  };
  fetchLightData()
  fetchOutletData()
  // no-op if the socket is already connected
  socket.connect();

  return () => {
    socket.disconnect();
  };
}, []);

useEffect(() => {
  
  function onLight(light:ILight) {
    console.log('from socket',light)
     const newLights = [...lights];
     console.log('newlights',lights)
    const lightTomodify= newLights.filter( lgh=> lgh.relay === light.relay );
    console.log(lightTomodify);
    lightTomodify[0].status=(light.status)

    setLights(newLights);  
    //console.log(lightTomodify);
  }
 // socket.on('light', onEvent);
 if(lights.length>0)
  {
  socket.on('light', onLight);
  }
  
  return () => {
    socket.off('light', onLight);
  };
}, [lights]);

useEffect(() => {

  function onOutlet(outlet:IOutlet) {
    const newOutlets = [...outlets];
    console.log('newoutlets',outlets)
   const outletTomodify= newOutlets.find( lgh=> lgh.relay === outlet.relay );
   console.log(outletTomodify);
   if(outletTomodify)
   { 
   outletTomodify.status=outlet.status
   outletTomodify.pending=false
   }
   setOutlets(newOutlets);  
    //console.log(lightTomodify);
  }
 // socket.on('light', onEvent);

  socket.on('outlet', onOutlet);
 
  
  
  return () => {
    socket.off('outlet', onOutlet);

  };
}, [outlets]);

useEffect(() => {
  function onWatts(index:number,kwh:number) {
    console.log('watts',index,kwh)
    const nextKwhs = kwhs.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return kwh
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setKwhs(nextKwhs);
 
 
 
  }


  socket.on('watts', onWatts);
  
  
  return () => {
  
    socket.off('watts', onWatts);
  };
}, [kwhs]);




  
  


const handleChangeLights = (light:ILight) => {
  let token = (localStorage.getItem('user'));

 console.log('fsaopjf',lights)
 
 // const newLights = [...lights]      
 // console.log(newLights)
//  setLights(newLights);  
 

  const requestOptions:RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-access-token':token!  },
    body: JSON.stringify(light)
};
fetch(API_IP+'/light', requestOptions)

    .then(response => response.status)
  //  .then(data=> console.log(data))
  
};  


const handleChangeOutlets = async (outlet:IOutlet) => {

  const prevoutlet=outlets.find( outl=> outl.relay === outlet.relay ); 
  console.log('pending',outlet.pending)
if(prevoutlet?.pending===false)
{
  const newOutlets = [...outlets]    
  const outletToModify=newOutlets.find( outl=> outl.relay === outlet.relay ); 
  if(outletToModify)
  {
 // outletToModify.disabled=true
  outletToModify.pending=true
  }

  console.log(newOutlets)
  setOutlets(newOutlets); 
let token = (localStorage.getItem('user'));
console.log('token',token)
const Options:RequestInit = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' ,
  'Authorization':`Bearer ${token}`},
  body: JSON.stringify(outlet)
 };
const response=await fetch(API_IP+'/outlet', Options)
if(response.ok)
{
 const outlet= await response.json() as IOutlet
    const newOutlets = [...outlets];
    console.log('outlet',outlet)
   const outletTomodify= newOutlets.find( lgh=> lgh.relay === outlet.relay );
   console.log(outletTomodify);
   if(outletTomodify)
   { 
   outletTomodify.status=outlet.status
   outletTomodify.pending=false
   }
   setOutlets(newOutlets); 
   // .then(response => setDisabled(false))
  //  .then(data=> console.log(data))
  }
}
};
   
  return (
    <>
    <Container maxWidth="sm">
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        
          <Typography variant="h3" component="div" className={classes.Typography}>
            Teijo Elcontrol
          </Typography>
          <Link to="/Search">Search for Kwhs</Link>

          <Button variant="contained" onClick={handleLogout}> logout</Button>
          </Toolbar>
      </AppBar>
 </Box>
 
    <FormGroup row>
      <StyledFormlabel >Laiturin pistorasiat</StyledFormlabel>
    <Grid container  spacing={1}>
        <WallOutlets  items={outlets} kwhs={kwhs} handleChange={handleChangeOutlets}   />
     </Grid>
     </FormGroup>
  

      <FormGroup row>
      <StyledFormlabel>Laiturin Valot</StyledFormlabel>
    <Grid container  spacing={1}>
       <Lights items={lights} handleChange={handleChangeLights} />
    
     </Grid>
     </FormGroup>
   </Container>
   </>
 
  

 
  );
}
export function Events({ events }:any) {
  return (
    <ul>
    {
    events &&  events.map((event1: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) =>
        <li key={ index }>{ index?.toString() }</li>
      )
    }
    </ul>
  );
}
export default Dashboard;
