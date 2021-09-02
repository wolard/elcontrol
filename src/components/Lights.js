import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  myCustomClass: {
    color: 'white'
  }
})



const Lights = ({ classes,lights,handleButtonClick}) => {
  
  return lights.map((btn,index) => {
  
    return(
      <Grid item xs={12} sm={4} md={3}>
      
<Button  key={index} variant="contained" color="primary"onClick={() => handleButtonClick(btn.card,btn.relay,btn.type)}>
      {btn.title}
    </Button>
    </Grid>




    );
    });  
}

export default withStyles(styles, { withTheme: true })(Lights)