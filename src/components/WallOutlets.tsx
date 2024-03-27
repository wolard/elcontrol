import React, { useEffect, useState } from 'react';

import { withStyles } from '@mui/styles';


import {FormControlLabel,FormLabel,Grid,Switch} from '@mui/material';
import { IComponent, IOutlet } from '../../types';

const styles = () => ({
  myCustomClass: {
    color: 'black'
  }
})



const WallOutlets= ({items, handleChange,kwhs}:IComponent<IOutlet>) =>{
 


  return items.map((item) =>   
  
    (
      <Grid item xs={12} sm={4} md={3} key={item.relay}>


      <FormLabel component="legend">Kulutus:{kwhs&& kwhs[item.relay]}W</FormLabel>


      <FormControlLabel
      

      control={ 
          <Switch
            disabled={item.pending}	
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

export default withStyles(styles, { withTheme: true })(WallOutlets)