import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function History() {
 
  return (
    <div className='main'>
      <h1>History</h1>
      <Link to="/" className='link'>Timer</Link>
      <Link to="/Dashboard" className='link'>Dashboard</Link>
    </div>
  );
}

export default History;
