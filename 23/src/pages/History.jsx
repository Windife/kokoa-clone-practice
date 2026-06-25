import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

function History() {
  const [history, setHistory] = useState([]);
  const [filterSubject, setFilterSubject] = useState("");
  const [filterRange, setFilterRange] = useState("all");
  const [subjects, setSubjects] = useState(() => {
    return JSON.parse(localStorage.getItem("subjects") || "[]");
  });
  const [showSubjects, setShowSubjects] = useState(false);

  const filteredHistory = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const diff = day === 0 ? 6 : day - 1;
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - diff);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return history.filter(item => {
      const date = new Date(item.finishedAt);

      if (filterSubject && item.subject !== filterSubject) {
        return false;
      }

      if (filterRange === "week") {
        return date >= startOfWeek;
      }

      if (filterRange === "month") {
        return date >= startOfMonth;
      }

      return true;
  });
},[history, filterSubject, filterRange]);

const handleDelete = (id) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem("history", JSON.stringify(newHistory));
  };

  const handleDeleteSubject = (subjectToDelete) => {
    const updated = subjects.filter(s => s !== subjectToDelete);
    setSubjects(updated);
    localStorage.setItem("subjects", JSON.stringify(updated));
};

  const handleClearAll = () => {
    setHistory([]);
    localStorage.removeItem("history");
  };

  const handleClearSubjects = () => {
    setSubjects([]);
    localStorage.removeItem("subjects");
  }

  useEffect(() => {
    const saved = localStorage.getItem("history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);
   
  return (
    <div className='history'>
      <nav>
            <Link to="/" className='link'>Timer</Link>
            <Link to="/Dashboard" className='link'>Dashboard</Link>
        </nav>
      <h1>History</h1>

      <select value={filterSubject} onChange={e => setFilterSubject(e.target.value)}>
        <option value="">전체 주제</option>
        {subjects.map((s, idx) => (
          <option key={idx} value={s}>{s}</option>
        ))}
      </select>

      <button onClick={() => setShowSubjects(!showSubjects)}>주제 관리</button>

      {showSubjects && (
        <div className='subjects-popup'>
          {subjects.length === 0 && <p>등록된 주제가 없습니다.</p>}
          {subjects.length > 0 && (
            <button onClick={handleClearSubjects}>전체삭제</button>
          )}
          <ul>
            {subjects.map((s, idx) => (
              <li key={idx}>
                {s}
                <button onClick={() => handleDeleteSubject(s)}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {history.length > 0 && (
        <button onClick={handleClearAll}>전체 삭제</button>
      )}

        <div className="filter-buttons">
        <button onClick={() => setFilterRange("all")}>전체</button>
        <button onClick={() => setFilterRange("week")}>이번 주</button>
        <button onClick={() => setFilterRange("month")}>이번 달</button>
      </div>

      <ul>
       {filteredHistory.length === 0 ? (
          <li>조건에 맞는 기록이 없습니다.</li>
        ) : (
          filteredHistory.map((item, idx) => (
            <li key={idx}>
              <strong>{item.mode === "work" ? `${item.subject}` : "휴식"}</strong> - {item.minutes}분 ({new Date(item.finishedAt).toLocaleString("ko-KR", {
                year : "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
              })}) 완료
            <button onClick={() => handleDelete(item.id)}>삭제</button>
          </li>
         ))
       )}
      </ul>
    </div>
  );
}

export default History;
