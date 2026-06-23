import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
 
  return (
    <div className='main'>
        <h1>Dashboard</h1>
        <Link to="/" className='link'>Timer</Link>
        <Link to="/History" className='link'>History</Link>    
    </div>
  );
}

export default Dashboard;
