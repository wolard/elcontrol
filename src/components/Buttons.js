import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';



const buttons = ({btns,handleButtonClick}) => {
  
  return btns.map((btn,index) => {
  
    return(
      
      
      <Grid item xs={3} key={index}>
<Button key={index} variant="contained" color="primary"onClick={() => handleButtonClick(btn.card,btn.relay,btn.type)}>
      {btn.title}
    </Button>

</Grid>



    );
    });  
}
export default buttons;