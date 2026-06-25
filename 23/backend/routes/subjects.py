from flask import Blueprint, request, jsonify
import sqlite3

subjects_bp = Blueprint("subjects", __name__)
DB_FILE = "db.sqlite"

@subjects_bp.route("", methods=["GET", "POST"])
def subjects():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()

    if request.method == "GET":
        rows = c.execute("SELECT id, name FROM subjects").fetchall()
        conn.close()
        return jsonify([{"id": r[0], "name": r[1]} for r in rows])

    elif request.method == "POST":
        data = request.json
        c.execute("INSERT INTO subjects (name) VALUES (?)", (data["name"],))
        conn.commit()
        new_id = c.lastrowid
        conn.close()
        return jsonify({"id": new_id, "name": data["name"]})

@subjects_bp.route("/<int:id>", methods=["DELETE"])
def delete_subject(id):
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("DELETE FROM subjects WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True})
