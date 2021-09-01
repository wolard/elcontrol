import React, {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";

import './App.css';
import Buttons from './components/Buttons'



const ENDPOINT = "http://192.168.0.131:8888";



function App() {
  const handleButtonClick = (card,relay,type) => {
    let lobj= {
      card:card,
      relay:relay,
      type:type
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lobj)
  };
  fetch('http://192.168.0.131:3000/light', requestOptions)
      .then(response => console.log(response))
    
   // console.log(response);
    
  }

  const [btns, setButtons] = useState([{}]);
  useEffect(() => {

   
    const url = "http://192.168.0.131:3000/init";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
     //   const conf=JSON.parse(json);
        setButtons(json)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
}, []);
useEffect(() => {
  const socket = socketIOClient(ENDPOINT);
    
  socket.on("FromAPI", data => {
    console.log(data);
  });

});
  return (
      
      <Buttons btns={btns} handleButtonClick={handleButtonClick} />
      
   //  <h1>helle</h1>
  );
}

export default App;
