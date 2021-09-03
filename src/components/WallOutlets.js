import React from 'react';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const styles = () => ({
  myCustomClass: {
    color: 'black'
  }
})



const WallOutlets = ({ classes,outlets,handleChange}) => {
  
  return outlets.map((outlet,index) => 
  
    (
      <Grid item xs={12} sm={4} md={3} key={index}>
      
      <FormControlLabel
      

      control={ 
          <Switch
            checked={outlet.status}
            onChange={() =>{ handleChange(index)}}  
            color="primary"
            name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
      }
          label={outlet.title}
          />
    </Grid>




    
  ));  
}

export default withStyles(styles, { withTheme: true })(WallOutlets)