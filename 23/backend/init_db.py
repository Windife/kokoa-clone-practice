import sqlite3

DB_FILE = "db.sqlite"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()

    # 과목 테이블
    c.execute('''CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE
    )''')

    # 세션 테이블
    c.execute('''CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subject_id INTEGER,
        subject_name TEXT,
        duration INTEGER,
        mode TEXT,
        created_at TEXT
    )''')

    conn.commit()
    conn.close()
    print("DB 초기화 완료!")

if __name__ == "__main__":
    init_db()
