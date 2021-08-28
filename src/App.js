import React, {useState, useEffect} from 'react';
import './App.css';

import Buttons from './components/Buttons'


function App() {
  const handleButtonClick = (card,relay,type) => {
    let lobj= {
      card:card,
      relay:relay,
      type:type
    }
    
    console.log(lobj);
    
  }

  const [btns, setButtons] = useState([{}]);
  useEffect(() => {
    const url = "http://localhost:3000/init";

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
  return (
      
      <Buttons btns={btns} handleButtonClick={handleButtonClick} />
      
   //  <h1>helle</h1>
  );
}

export default App;
