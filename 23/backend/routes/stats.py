from flask import Blueprint, jsonify
import sqlite3
from init_db import DB_NAME
from datetime import datetime, timedelta

stats_bp = Blueprint("stats", __name__)

@stats_bp.route("", methods=["GET"])
def get_stats():
    conn = sqlite3.connect(DB_NAME)
    c =conn.cursor()
    c.execute("SELECT DISTINCT date(finishedAt) FROM sessions ORDER BY finishedAt DESC")
    dates = [row[0] for row in c.fetchall()]
    streak = 0
    today = datetime.today().date()
    for i in range(len(dates)):
        if today - timedelta(days=i) == datetime.strptime(dates[i], "%Y-%m-%d").date():
            streak += 1
        else:
            break
    
    c.execute("SELECT SUM(duration) FROM sessions")
    total_minutes = c.fetchone()[0] or 0
    total_hours = total_minutes / 60

    start_of_week = today - timedelta(days=today.weekday())
    c.execute("SELECT COUNT(*) FROM sessions WHERE date(finishedAt) >= ?", (start_of_week,))
    sessions_this_week = c.fetchone()[0]

    c.execute("SELECT subject_name, SUM(duration) FROM sessions GROUP BY subject_name")
    by_subject = [{"name": row[0], "minutes": row[1]} for row in c.fetchall()]

    c.execute("SELECT strftime('%w', finishedAt), SUM(duration) FROM sessions GROUP BY strftime('%w', finishedAt)")
    weekday_map = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    by_weekday = {weekday_map[int(row[0])]: row[1] for row in c.fetchall()}

    conn.close()    

    return jsonify({
        "streak": streak,
        "total_hours": total_hours,
        "sessions_this_week": sessions_this_week,
        "by_subject": by_subject,
        "by_weekday": by_weekday
    })