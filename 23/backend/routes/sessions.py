from flask import Blueprint, request, jsonify
import sqlite3
from init_db import DB_NAME

sessions_bp = Blueprint("sessions", __name__)

@sessions_bp.route("", methods=["GET"])
def get_sessions():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("SELECT id, subject_id, subject_name, duration, mode, finishedAt FROM sessions")
    rows = c.fetchall()
    conn.close()
    return jsonify([
        {"id": r[0], "subject_id": r[1], "subject_name": r[2], "duration": r[3], "mode": r[4], "finishedAt": r[5]}
        for r in rows
    ])

@sessions_bp.route("", methods=["POST"])
def add_session():
    data = request.json
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("""
        INSERT INTO sessions (subject_id, subject_name, duration, mode, finishedAt)
        VALUES (?, ?, ?, ?, ?)
    """, (data.get("subject_id"), data["subject_name"], data["duration"], data["mode"], data["finishedAt"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Session added"}), 201

@sessions_bp.route("", methods=["DELETE"])
def clear_sessions():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("DELETE FROM sessions")
    conn.commit()
    conn.close()
    return jsonify({"message": "All sessions deleted"})

@sessions_bp.route("/<int:session_id>", methods=["DELETE"])
def delete_session(session_id):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("DELETE FROM sessions WHERE id=?", (session_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Session deleted"})
