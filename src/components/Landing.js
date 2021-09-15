import React from 'react';
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const API_IP=process.env.REACT_APP_API_IP;



const Landing = ()=> {


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
    
    history.push('/dashboard');
    } 
    catch (error) {
      console.log("error", error);
    }

     
    }
  return (
    <div>
      <h1>Landing</h1>
    

     
      <Controller
          render={({ field }) => <TextField {...field} />}
          name="TextField"
          control={control}
        />
        <Controller
          render={({ field }) => <TextField {...field} />}
          name="TextField2"
          control={control}
        />
  <Button variant="contained" onClick={handleSubmit(handleLogin)}> login</Button>
   
   
    </div>
  )
};

export default Landing;