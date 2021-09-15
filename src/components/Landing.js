import React from 'react';
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const API_IP=process.env.REACT_APP_API_IP;



const Landing = ()=> {
  const classes = useStyles();

  const {  handleSubmit, control } = useForm();
 
  const history = useHistory();

  const handleLogin =async  data => {
    console.log(data.TextField);
      let user= {
        user:data.TextField,
        password:data.TextField2
        
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    try
    {
    const response= await fetch(API_IP+':3000/login', requestOptions)
    const json = await response.json()
    localStorage.setItem("user", json.token)
    
    } 
    catch (error) {
      console.log("error", error);
    }

     
    return history.push('/dashboard');
    }
  return (
    <div>
      <h1>Teijo Light control</h1>
    

      <form className={classes.root} noValidate autoComplete="off">
      <Controller
          render={({ field }) => <TextField    {...field} />}
          name="TextField"
          control={control}
        />
        <Controller
          render={({ field }) => <TextField  type="password" {...field} />}
          name="TextField2"
          control={control}
         
        />
  <Button variant="contained" onClick={handleSubmit(handleLogin)}> login</Button>
   </form>
   
    </div>
  )
};

export default Landing;