import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

function Timer() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const [workMinutes, setWorkMinutes] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [mode, setMode] = useState("work");
    const [progress, setProgress] = useState(0);
    const [animate, setAnimate] = useState(true);
    const intervalRef = useRef(null);
    const [subject, setSubject] = useState("목표");
    const [workError, setWorkError] = useState("");
    const [breakError, setBreakError] = useState("");
    const [subjectError, setSubjectError] = useState("");
    const [subjects, setSubjects] = useState(() => {
        return JSON.parse(localStorage.getItem("subjects") || "[]");
    });

    const WORK_TIME = workMinutes * 60 * 1000;
    const BREAK_TIME = breakMinutes * 60 * 1000;

    const saveRecord = useCallback((mode, minutes) => {
        const record = {
            id: Date.now(),
            subject,
            mode,
            minutes,
            finishedAt : new Date().toISOString()
        };
        const saved = JSON.parse(localStorage.getItem("history") || "[]");
        const newHistory = [...saved, record];
        localStorage.setItem("history", JSON.stringify(newHistory));
    }, [subject]);

    const handleStart = () => {
        setMode("work");
        setRunning(true);
        setAnimate(true);

        if (!subjects.includes(subject)) {
            const updated = [...subjects, subject];
            setSubjects(updated);
            localStorage.setItem("subjects", JSON.stringify(updated));
        };
    }

    const handleStop = () => {
        clearInterval(intervalRef.current);
        setRunning(false);
        setAnimate(false);
    }
    const handleReset = () => {
        clearInterval(intervalRef.current);
        setRunning(false);
        setMode("work");
        setProgress(0);
        setTime(0);
    };

    const handleSubjectChange = (e) => {

        const value = e.target.value
        setSubject(value);
        setSubjectError(value === "" ? "주제를 입력해 주세요" : "");
    };

    const handleWorkChange = (e) => {

        const value = Number(e.target.value);
        setWorkMinutes(value);

        if (!Number.isInteger(value) || value <=0 ) {
            setWorkError("목표 시간은 1이상의 정수여야 합니다.");
        } else {
            setWorkError("");
        }
    }

    const handleBreakChange = (e) => {
        
        const value = Number(e.target.value);
        setBreakMinutes(value);

        if (!Number.isInteger(value) || value <= 0) {
            setBreakError("휴식 시간은 1이상의 정수여야 합니다.");
        } else {
            setBreakError("");
        }
    }

    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    const format = (num, digits = 2) => String(num).padStart(digits,'0');
    
    useEffect(() => {
        if (running) {
            intervalRef.current = setInterval(() => {
                setTime(prev => {
                    const maxTime = mode === "work" ? WORK_TIME : BREAK_TIME;
                    const next = prev + 100;
                    return next >= maxTime ? maxTime : next;
            });
        }, 100);
    }
        return () => clearInterval(intervalRef.current);
    }, [running, mode, WORK_TIME, BREAK_TIME]);

    useEffect(() => {
        if (mode === "work" && time >= WORK_TIME && running) {
            setRunning(false);
            saveRecord("work",workMinutes);

            document.body.classList.add("flash_work");
            setTimeout(() => {
                document.body.classList.remove("flash_work");
            }, 3000)

            setMode("break");
            setTime(0);
            setRunning(true);

        } else if (mode === "break" && time >= BREAK_TIME && running) {
            setRunning(false);
            saveRecord("break", breakMinutes)

            document.body.classList.add("flash_break");
            setTimeout(() => {
                document.body.classList.remove("flash_break");
            }, 3000)

            setMode("work");
            setTime(0);
            setRunning(true);
        }
    }, [time, mode, running, WORK_TIME, BREAK_TIME, workMinutes, breakMinutes, saveRecord]);

    useEffect(() => {
        const maxTime = mode === "work" ? WORK_TIME : BREAK_TIME;
        if (running) {
            setProgress(Math.min((time / maxTime) * 100, 100));
        }
    },[time, running, mode, WORK_TIME, BREAK_TIME]);
  
  return (
    <div className="main">
        <nav>
            <Link to="/History" className='link'>History</Link>
            <Link to="/Dashboard" className='link'>Dashboard</Link>
        </nav>
        <h1>Timer</h1>

        <h2>{mode === "work" ? `${subject} 시간` : "휴식 시간"}</h2>
        <div>
            <label>주제 : </label>
            <input type='text' value={subject} onChange={handleSubjectChange} disabled={running} />
            {subjectError && <p style={{color:"red"}}>{subjectError}</p>}
        </div>

        <div className='clock'>{format(hours)} : {format(minutes)} : {format(seconds)}</div>

        <div>
            <label>목표 시간(분) : </label>
            <input type='number' value={workMinutes} onChange={handleWorkChange} disabled={running} />
            {workError && <p style={{color:"red"}}>{workError}</p>}
        </div>

        <div>
            <label>휴식 시간(분) : </label>
            <input type='number' value={breakMinutes} onChange={handleBreakChange} disabled={running} />
            {breakError && <p style={{color:"red"}}>{breakError}</p>}
        </div>

        <div>
            <button onClick={handleStart} disabled={workError || breakError || subjectError}>Start</button>
            <button onClick={handleStop} disabled={workError || breakError || subjectError}>Stop</button>
            <button onClick={handleReset} disabled={workError || breakError || subjectError}>Reset</button>
        </div>

        <div className='progress-container'>
            <div className={`progress-bar ${!animate ? "no-animate" : ""}`} style={{ width: `${progress}%` }}></div>
        </div>
    </div>
  );
}

export default Timer;
