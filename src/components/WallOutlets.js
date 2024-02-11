import React from 'react';

import { withStyles } from '@mui/styles';


import {FormControlLabel,FormLabel,Grid,Switch} from '@mui/material';

const styles = () => ({
  myCustomClass: {
    color: 'black'
  }
})



const WallOutlets = ({ classes,outlets,handleChange,watts,disabled}) => {
console.log('outs',outlets)
  return outlets.map((outlet,index) =>   
  
    (
      <Grid item xs={12} sm={4} md={3} key={index}>
      <FormLabel component="legend">Kulutus:{watts[index]}W</FormLabel>
      <FormControlLabel
      

      control={ 
          <Switch
            disabled={disabled}	
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