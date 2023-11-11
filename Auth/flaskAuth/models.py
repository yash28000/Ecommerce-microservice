from datetime import datetime
from flaskAuth import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(20),unique=True,nullable=False)
    email = db.Column(db.String(120),unique = True,nullable=False)
    image = db.Column(db.String(20),nullable=False,default='default.jpg')
    password = db.Column(db.String(60),nullable=False)
    addresses = db.relationship('Address',backref='user_address',lazy=True)
    def __init__(self,username,email,password):
        self.username=username
        self.email=email
        self.password=password
    def __repr__(self):
        return f"User('{self.username}','{self.email}','{self.addresses}')"
db.create_all() 

class Address(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    area = db.Column(db.String(60),nullable=False)
    city = db.Column(db.String(20),nullable=False)
    pincode = db.Column(db.String(20),nullable=False)
    country = db.Column(db.String(20),nullable=False)
    state = db.Column(db.String(20),nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    def __init__(self,area,city,pincode,country,state,user_id):
        self.area=area
        self.city=city
        self.pincode=pincode
        self.country=country
        self.state=state
        self.user_id=user_id
    def __repr__(self):
        return f"Address('{self.city}','{self.state}','{self.country}')"
db.create_all()