from products import db

class Product(db.Model):
    p_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    price = db.Column(db.Float, nullable=False)
    image_path = db.Column(db.String(200), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    def __init__(self,  p_id ,name,description,price,image,quantity):
        self.p_id=p_id
        self.name=name
        self.description=description
        self.price=price
        self.image=image
        self.quantity=quantity
def __repr__(self):
    return f"Product(p_id={self.p_id}, name='{self.name}', price={self.price} , image='{self.image}',quantity='{self.quantity}')"
class Images(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.p_id'), nullable=False)
    image_path = db.Column(db.String(200), nullable=False)
db.create_all()