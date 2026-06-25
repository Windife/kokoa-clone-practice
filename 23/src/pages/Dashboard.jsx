import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [history, setHistory] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - diff);
  const weeklySessions = history.filter(
    h => h.mode === "work" && new Date(h.finishedAt) >= startOfWeek).length;

  useEffect(() => {
    fetch("http://127.0.0.1:5000/sessions")
    .then(res => res.json())
    .then(data => setHistory(data))
    .catch(() => alert("기록 불러오기 실패"));

    fetch("http://127.0.0.1:5000/subjects")
    .then(res => res.json())
    .then(data => setSubjects(data))
    .catch(() => alert("주제 불러오기 실패"));
  },[]);

  const totalMinutes = history.filter(h => h.mode === "work").reduce((sum, h) => sum + h.duration, 0);

  const subjectData = {};
  history.filter(h => h.mode === "work").forEach(h => {
    subjectData[h.subject_name] = (subjectData[h.subject_name] || 0) + h.duration;
  });

  const weekData = Array(7).fill(0);
  const weekSessions = Array(7).fill(0);
  history.filter(h => h.mode === "work").forEach(h => {
    const d = new Date(h.finishedAt).getDay();
    weekData[d] += h.duration;
    weekSessions[d] += 1;
  });

  const reorderWeekData = (arr) => [...arr.slice(1), arr[0]];
  const reorderedWeekData = reorderWeekData(weekData);
  const reorderedWeekSessions = reorderWeekData(weekSessions);

  const getStreak = () => {
    const validHistory = history.filter(h => h.finishedAt && !isNaN(new Date(h.finishedAt)));
    const dates = validHistory.map(h => new Date(h.finishedAt).toISOString().split("T")[0]);
    const uniqueDates = [...new Set(dates)].sort((a, b) => new Date(a) - new Date(b));

    let streak = 0;
    const today = new Date().toISOString().split("T")[0];

    if (!uniqueDates.includes(today)) {
      return 0;
    }

    for (let i = uniqueDates.length - 1; i >= 0; i--) {
      const d = uniqueDates[i];
      const expected = new Date();
      expected.setDate(new Date().getDate() - streak);
      const expectedStr = expected.toISOString().split("T")[0];

      if (d === expectedStr ) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const getMaxStreak = () => {
    const validHistory = history.filter(h => h.finishedAt && !isNaN(new Date(h.finishedAt)));
    const dates = validHistory.map(h => new Date(h.finishedAt).toISOString().split("T")[0]);
    const uniqueDates = [...new Set(dates)].sort((a, b) => new Date(a) - new Date(b));

    let maxStreak = 0;
    let currentStreak = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
      const prev = new Date(uniqueDates[i - 1]);
      const curr = new Date(uniqueDates[i]);
      const diffDays = (curr - prev) / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }

      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
    }
    
    if (uniqueDates.length > 0) {
      maxStreak = Math.max(maxStreak, currentStreak);
    }
    return maxStreak;
  };

  const streakDays = getStreak();
  const maxStreakDays = getMaxStreak();

  const colors = ["skyblue","lightgreen","orange","pink","violet","yellow","red","purple","teal"];
  const subjectColors = Object.keys(subjectData).map((_, i) => colors[i % colors.length]);
  const weekColorsTime = ["lightgreen","orange","pink","violet","skyblue","yellow","red"];
  const weekColorsSessions = ["navy","teal","purple","brown","gray","black","cyan"];
  
   
  return (
    <div className='dashboard'>
      <nav>
            <Link to="/" className='link'>Timer</Link>
            <Link to="/History" className='link'>History</Link>
        </nav>
        <h1>Dashboard</h1>
        <p>연속 집중 기록 : {streakDays}일 (최대 {maxStreakDays}일)</p>
        <p>전체 집중 시간 : {totalMinutes}분</p>
        <p>이번 주 완료한 세션 수 : {weeklySessions}회</p>

        <h2>과목별 집중 시간</h2>
        {Object.keys(subjectData).length === 0 ? (
          <p>기록이 없습니다.</p>
        ) : (
        <Bar data={{
          labels: Object.keys(subjectData),
          datasets: [{ label: "분", data: Object.values(subjectData), backgroundColor: subjectColors }]
        }}
        options={{
          scales: {
            y1: { type: 'linear', position:'left', title:{ display:true, text:'시간(분)'}, suggestedMax: Math.max(...reorderedWeekSessions) + 2 },
          }
        }} />)}

        <h2>주간 패턴</h2>
        <Bar data={{
          labels: ["월", "화", "수", "목", "금", "토", "일"],
          datasets: [{ label: "시간(분)", data: reorderedWeekData, backgroundColor: weekColorsTime, yAxisID:'y1' },
                    { label: "세션 수", data: reorderedWeekSessions, backgroundColor: weekColorsSessions, yAxisID:'y2' }]
        }}
        options={{
          scales: {
            y1: { type: 'linear', position:'left', title:{ display:true, text:'시간(분)'}, suggestedMax: Math.max(...reorderedWeekData) + 2 },
            y2: { type: 'linear', position:'right', title:{ display:true, text:'주제 수'}, grid:{ drawOnChartArea:false }, suggestedMax: Math.max(...reorderedWeekSessions) + 2 }
          }
        }} />
    </div>
  );
}

export default Dashboard;
