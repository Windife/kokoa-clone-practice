from flask import Blueprint, jsonify
import sqlite3
from datetime import datetime, timedelta

stats_bp = Blueprint("stats", __name__)
DB_FILE = "db.sqlite"

@stats_bp.route("", methods=["GET"])
def stats():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    rows = c.execute("SELECT subject_name, duration, created_at FROM sessions WHERE mode='work'").fetchall()
    conn.close()

    # streak 계산
    dates = sorted(set(r[2].split("T")[0] for r in rows))
    streak = 0
    today = datetime.now().date().isoformat()
    if today in dates:
        streak = 1
        for i in range(len(dates)-2, -1, -1):
            prev = datetime.fromisoformat(dates[i])
            curr = datetime.fromisoformat(dates[i+1])
            if (curr - prev).days == 1:
                streak += 1
            else:
                break

    total_minutes = sum(r[1] for r in rows)
    total_hours = total_minutes / 60

    # 이번 주 세션 수
    start_of_week = datetime.now() - timedelta(days=datetime.now().weekday())
    sessions_this_week = sum(1 for r in rows if datetime.fromisoformat(r[2]) >= start_of_week)

    # 과목별
    by_subject = {}
    for r in rows:
        by_subject[r[0]] = by_subject.get(r[0], 0) + r[1]

    # 요일별
    weekdays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
    by_weekday = {d:0 for d in weekdays}
    for r in rows:
        day = datetime.fromisoformat(r[2]).strftime("%a")
        by_weekday[day] += r[1]

    return jsonify({
        "streak": streak,
        "total_hours": total_hours,
        "sessions_this_week": sessions_this_week,
        "by_subject": [{"name": k, "minutes": v} for k,v in by_subject.items()],
        "by_weekday": by_weekday
    })
