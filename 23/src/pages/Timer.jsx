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
        const selectedSubject = subjects.find(s => s.name === subject);

        const record = {
            subject_id: selectedSubject ? selectedSubject.id : null,
            subject_name: subject,
            duration: minutes,
            mode: mode,
            finishedAt : new Date().toISOString()
        };

        fetch("http://127.0.0.1:5000/sessions", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(record)
        }).catch(() => alert("세션 저장 실패"));
    }, [subject, subjects]);

    const saveSubject = useCallback((name) => {
        fetch("http://127.0.0.1:5000/subjects", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({name})
        })
        .then(res => res.json())
        .then(newSubject => {
            setSubjects(prev => {
                const updated = [...prev.filter(s => s.name !== newSubject.name), newSubject];
                localStorage.setItem("subjects", JSON.stringify(updated));
                return updated;
            });
        })
        .catch(() => alert("주제 저장 실패"));
    }, [])

    const handleStart = () => {
        setMode("work");
        setRunning(true);
        setAnimate(true);
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
            setBreakMinutes(value);
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
            saveSubject(subject);

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
            saveSubject(subject)

            document.body.classList.add("flash_break");
            setTimeout(() => {
                document.body.classList.remove("flash_break");
            }, 3000)

            setMode("work");
            setTime(0);
            setRunning(true);
        }
    }, [time, mode, running, WORK_TIME, BREAK_TIME, workMinutes, breakMinutes, saveRecord, saveSubject]);

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

        <div className='clock'>{hours > 0 ? `${format(hours)} : ${format(minutes)} : ${format(seconds)}` : `${format(minutes)} : ${format(seconds)}`}</div>

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
