from flask import Flask
from flask_cors import CORS
from routes.subjects import subjects_bp
from routes.sessions import sessions_bp
from routes.stats import stats_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(subjects_bp, url_prefix="/subjects")
app.register_blueprint(sessions_bp, url_prefix="/sessions")
app.register_blueprint(stats_bp, url_prefix="/stats")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)