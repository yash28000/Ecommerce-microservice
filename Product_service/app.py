from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import db  # Import the db instance from models.py

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
db.init_app(app)  # Initialize the db instance with the Flask app


if __name__ == '__main__':
    from routes import product_bp
    app.register_blueprint(product_bp)  # Register the product Blueprint

    with app.app_context():
        db.create_all()  # Create the database tables
    app.run(host='0.0.0.0',port=5010)
