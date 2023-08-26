from app import app, db
# Create the application context
with app.app_context():
    # Now you can work with the database and perform operations like db.create_all()
    db.create_all()