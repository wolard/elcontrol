import React, {useState,} from 'react';
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { AppBar } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const API_IP = process.env.REACT_APP_API_IP;



const Landing = () => {
  const [loggedIn, setloggedIn] = useState(false);
    const classes = useStyles();

    const {
      handleSubmit,
      control
    } = useForm();

    const history = useHistory();

    const handleLogin = async data => {
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
        const response = await fetch(API_IP + ':3000/login', requestOptions)
       if (response.ok){
        const json = await response.json()
        setloggedIn(true);
        localStorage.setItem("user", json.token)
        history.push('/dashboard');
       }
       else
       setloggedIn('login failed')

      } catch (error) {
        console.log("error", error);
      }


     
    }
    return (
    <div>
    <Box sx={{ flexGrow: 10}}>
      <AppBar position="static">
        
        
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            Teijo Elcontrol
          </Typography>
         
      </AppBar>
    </Box>
    

      <form className={classes.root} noValidate autoComplete="off">
      <Grid  item xs={12} sm={12} md={12} >
      <Controller
          render={({ field }) => <TextField    {...field} />}
          name="TextField"
          control={control}
        />
        </Grid>
        <Grid  item xs={12} sm={12} md={12} >
        <Controller
          render={({ field}) => <TextField  type="password" {...field} />}
          name="TextField2"
          control={control}
        />
        </Grid>
        <Grid  item xs={12} sm={12} md={12} >
  <Button variant="contained" onClick={handleSubmit(handleLogin)}> login</Button>
  <p>{loggedIn}</p>
  </Grid>
   </form>
   
    </div>
  )
};

export default Landing;