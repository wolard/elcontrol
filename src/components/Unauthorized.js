import React from 'react';
import { Link } from 'react-router-dom';
import '../Unauthorized.scss';

const Unauthorized = () => {
  return (
<<<<<<< HEAD
    <div className='container'>
      <div class="gandalf">
        <div class="fireball"></div>
        <div class="skirt"></div>
        <div class="sleeves"></div>
        <div class="shoulders">
          <div class="hand left"></div>
          <div class="hand right"></div>
        </div>
        <div class="head">
          <div class="hair"></div>
          <div class="beard"></div>
        </div>
      </div>
      <div class="message">
        <h1>403 - You Shall Not Pass</h1>
        <p>Uh oh, Gandalf is blocking the way!<br />Maybe you have a typo in the url? Or you meant to go to a different location? Like...Hobbiton?</p>
      </div>
=======
  
      <div>
>>>>>>> b83376f3f07fd2afc56a3950b23310eace53069d
      <p><Link to='/'>Back to Home</Link></p>
    </div>
  )
}

export default Unauthorized;