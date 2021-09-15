import React from 'react';
import { Link } from 'react-router-dom';
import '../Unauthorized.scss';

const Unauthorized = () => {
  return (
  
      <div>
      <p><Link to='/'>Back to Home</Link></p>
    </div>
  )
}

export default Unauthorized;