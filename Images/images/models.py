from images import db
class Img(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.String)
    name = db.Column(db.Text)
    mimetype = db.Column(db.Text)
    type = db.Column(db.String)
db.create_all()