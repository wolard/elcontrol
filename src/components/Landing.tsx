import React, {useState,} from 'react';
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from '@mui/styles';
import { AppBar,Container,Typography,Button,FormGroup,Grid,TextField} from '@mui/material';
import { API_IP, socket } from '../socket';
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      width: '25ch',
    },
  },
  appbar: {
    padding:'5px'

  },
  formGroup: {
    alignItems: 'center'
  }
}));





export const Landing = () => {
  const [loggedIn, setloggedIn] = useState(false);
    const classes = useStyles();

    const {
      handleSubmit,
      control
    } = useForm()
    const history = useHistory();

    const handleLogin = async (data:any) => {
      console.log(data.TextField);
      let user = {
        user: data.TextField,
        password: data.TextField2

      }
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      };
      try {
        const response = await fetch(API_IP + '/login', requestOptions)
       if (response.ok){
        
        const json = await response.json()
        setloggedIn(true);
        if(!socket.connected)
        {
        socket.connect()
        }
        localStorage.setItem("user", json.token)
        history.push('/dashboard');
       }
       else
       setloggedIn(false)

      } catch (error) {
        console.log("error", error);
      }


     
    }
    return (

    <Container maxWidth="sm">
      <AppBar className={classes.appbar} position="static" >
        
        
          <Typography variant="h3" component="div" >
            Teijo Elcontrol
          </Typography>
         
      </AppBar>
   
    
      <FormGroup className={classes.formGroup}>
      <form className={classes.root} noValidate autoComplete="off">
      <Grid  item xs={12} sm={12} md={12} >
      <Controller
          render={({ field }) => <TextField   {...field} />}
          name="TextField"
          control={control}
          defaultValue="wolard"
          
        />
        </Grid>
        <Grid  item xs={12} sm={12} md={12} >
        <Controller
          render={({ field}) => <TextField  type="password" {...field} />}
          name="TextField2"
          control={control}
          defaultValue=""
        />
        </Grid>
        <Grid  item xs={12} sm={12} md={12} >
  <Button variant="contained" onClick={handleSubmit(handleLogin)}> login</Button>
  <p>{loggedIn}</p>
  </Grid>
   </form>
   </FormGroup>
  </Container>
  )
};

export { API_IP };

