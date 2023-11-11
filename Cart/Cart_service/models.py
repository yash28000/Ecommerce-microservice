from Cart_service import db

class Cart(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    p_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer)
    qty = db.Column(db.Integer)
    def __init__(self,user_id,p_id,qty):
        self.user_id=user_id
        self.p_id=p_id
        self.qty=qty
db.create_all() 