import React from 'react';

import { Grid,Switch,FormControlLabel} from '@mui/material';
import { withStyles} from '@mui/styles';



const styles = () => ({
  myCustomClass: {
    color: 'white'
  }
  
})



const Lights = ({ classes,lights, handleChange}) => {
  
  
  

  return lights.map((light,index) => 
  (
         
      <Grid  item xs={12} sm={4} md={3} key={index} >
      
      <FormControlLabel
      

  control={ 
      <Switch
        checked={light.status}
        onChange={() =>{ handleChange(index)}}  
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
  }
      label={light.title}
      />
    </Grid>
    
  ));  
}

export default withStyles(styles, { withTheme: true })(Lights)