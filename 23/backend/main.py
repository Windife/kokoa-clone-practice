from flask import Flask
from flask_cors import CORS
from routes.subjects import subjects_bp
from routes.sessions import sessions_bp
from routes.stats import stats_bp
import init_db

def create_app():
    app = Flask(__name__)
    CORS(app)

    init_db.init_db()

    app.register_blueprint(subjects_bp, url_prefix="/subjects")
    app.register_blueprint(sessions_bp, url_prefix="/sessions")
    app.register_blueprint(stats_bp, url_prefix="/stats")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)