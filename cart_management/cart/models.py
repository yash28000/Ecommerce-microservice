from cart_management.cart import db

class Cart(db.Model):
    c_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    p_id = db.Column(db.Integer, db.ForeignKey('product.p_id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def __init__(self,c_id , user_id, p_id, quantity):
        self.c_id=c_id
        self.user_id = user_id
        self.p_id = p_id
        self.quantity = quantity

def __repr__(self):
       return f"Product(c_id={self.c_id}, user_id='{self.user_id}', p_id={self.p_id} , quantity='{self.quantity}')"