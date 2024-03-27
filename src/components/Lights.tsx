import React, { useEffect, useState } from 'react';

import { Grid,Switch,FormControlLabel} from '@mui/material';
import { withStyles} from '@mui/styles';
import { IComponent, ILight } from '../../types';



const styles = () => ({
  myCustomClass: {
    color: 'white'
  }
  
})





const Lights = ({items ,handleChange }:IComponent<ILight>) => {


 
 




  return items.map((item) => 
  (
         
      <Grid  item xs={12} sm={4} md={3} key={item.relay} >
      
      <FormControlLabel
      

  control={ 
      <Switch
        checked={Boolean(item.status)}
        onChange={() => handleChange(item)}  
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
  }
      label={item.title}
      />
    </Grid>
    
  ));  
}

export default withStyles(styles, { withTheme: true })(Lights)