import React from 'react';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { withStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';


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