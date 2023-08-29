from products import db

class Product(db.Model):
    p_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    image = db.relationship('Images',backref='image_address',lazy=True)
    def __init__(self, p_id ,name,description,price,quantity,rating):
        self.p_id=p_id
        self.name=name
        self.description=description
        self.price=price
        self.quantity=quantity
        self.rating=rating
    def __repr__(self):
       return f"Product(p_id={self.p_id}, name='{self.name}', price={self.price} , quantity='{self.quantity}',rating='{self.rating}',image='{self.image}')"

class Images(db.Model):
    p_id = db.Column(db.Integer, db.ForeignKey('product.p_id'), nullable=False)
    image_name=db.Column(db.String(200),nullable=False ,primary_key=True)
    image = db.Column(db.String(200), nullable=False)
    def __init__(self,p_id,image,image_name):
        self.p_id=p_id
        self.image_name=image_name
        self.image=image
    def __repr__(self,product):
            return f"Images(p_id={product.p_id},image_name={self.image_name},image={self.image})"
db.create_all()