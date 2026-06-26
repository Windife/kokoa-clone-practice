import sqlite3

DB_NAME = "pomodoro.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()

    c.execute("""
    CREATE TABLE IF NOT EXISTS subjects (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL UNIQUE
    )
    """)
    
    c.execute("""
    CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject_id INTEGER,
        subject_name TEXT,
        duration INTEGER,
        mode TEXT,
        finishedAt TEXT,
        FOREIGN KEY(subject_id) REFERENCES subjects(id)
    )
    """)

    conn.commit()
    conn.close()