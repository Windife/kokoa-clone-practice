from flask import Blueprint, request, jsonify
import sqlite3
from init_db import DB_NAME

subjects_bp = Blueprint("subjects", __name__)

@subjects_bp.route("", methods=["GET"])
def get_subjects():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("SELECT id, name FROM subjects")
    rows = c.fetchall()
    conn.close()
    return jsonify([{"id": r[0], "name": r[1]} for r in rows])

@subjects_bp.route("", methods=["POST"])
def add_subject():
    data = request.json
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    try:
        c.execute("INSERT INTO subjects (name) VALUES (?)", (data["name"],))
        conn.commit()
        new_id = c.lastrowid
        return jsonify({"id": new_id, "name": data["name"]}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Subject already exists"}), 400
    finally:
        conn.close()

@subjects_bp.route("", methods=["DELETE"])
def clear_subjects():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("DELETE FROM subjects")
    conn.commit()
    conn.close()
    return jsonify({"message": "All subjects deleted"})

@subjects_bp.route("/<int:subject_id>", methods=["DELETE"])
def delete_subject(subject_id):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("DELETE FROM subjects WHERE id=?", (subject_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Subject deleted"})