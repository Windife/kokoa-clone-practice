from flask import Blueprint, request, jsonify
import sqlite3
from datetime import datetime, timedelta

sessions_bp = Blueprint("sessions", __name__)
DB_FILE = "db.sqlite"

@sessions_bp.route("", methods=["GET", "POST"])
def sessions():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()

    if request.method == "GET":
        subject_id = request.args.get("subject_id")
        range_filter = request.args.get("range", "all")

        query = "SELECT id, subject_id, subject_name, duration, created_at FROM sessions"
        params = []

        if subject_id:
            query += " WHERE subject_id=?"
            params.append(subject_id)

        rows = c.execute(query, params).fetchall()
        conn.close()

        # range 필터 적용
        now = datetime.now()
        if range_filter == "week":
            start = now - timedelta(days=now.weekday())
            rows = [r for r in rows if datetime.fromisoformat(r[4]) >= start]
        elif range_filter == "month":
            start = datetime(now.year, now.month, 1)
            rows = [r for r in rows if datetime.fromisoformat(r[4]) >= start]

        return jsonify([{
            "id": r[0],
            "subject_id": r[1],
            "subject_name": r[2],
            "duration": r[3],
            "created_at": r[4]
        } for r in rows])

    elif request.method == "POST":
        data = request.json
        created_at = datetime.now().isoformat()
        c.execute("INSERT INTO sessions (subject_id, subject_name, duration, created_at) VALUES (?,?,?,?)",
                  (data["subject_id"], data.get("subject_name",""), data["duration"], created_at))
        conn.commit()
        new_id = c.lastrowid
        conn.close()
        return jsonify({
            "id": new_id,
            "subject_id": data["subject_id"],
            "duration": data["duration"],
            "created_at": created_at
        })

@sessions_bp.route("/<int:id>", methods=["DELETE"])
def delete_session(id):
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("DELETE FROM sessions WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True})
