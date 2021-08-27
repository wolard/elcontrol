import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
const buttons = ({btns,handleButtonClick}) => {
   return btns.map(btn => {
  
    return(

<Button variant="contained" color="primary"onClick={() => handleButtonClick(btn.card,btn.relay,btn.type)}>
      {btn.title}
    </Button>



    );
    });  
}
export default buttons;