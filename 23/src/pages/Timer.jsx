import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Timer() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
            setTime(s => s + 10);
        }, 10);
    }
        return () => clearInterval(interval);
    }, [running]);

    const handleStart = () => setRunning(true);
    const handleStop = () => setRunning(false);
    const handleReset = () => {
        setTime(0);
        setRunning(false);
    };

    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const mseconds = ((time % 1000) / 10);

    const format = (num, digits = 2) => String(num).padStart(digits,'0');

    const maxTime = 60000;
    const progress = Math.min((time/maxTime)*100, 100);
  
  return (
    <div className='main'>
        <h1>Timer</h1>
        <div className='clock'>{format(hours)} : {format(minutes)} : {format(seconds)} : {format(mseconds)}</div>
        <div>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Reset</button>
        </div>
        <div className='progress-container'>
            <div className='progress-bar' style={{ width: `${progress}%` }}></div>
        </div>
        <Link to="/History" className='link'>History</Link>
        <Link to="/Dashboard" className='link'>Dashboard</Link>
    </div>
  );
}

export default Timer;
