from product import db

class Product(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(60),nullable=False)
    price = db.Column(db.Integer,nullable=False)
    desc = db.Column(db.String(100),nullable = False)
    brand = db.Column(db.String(60),nullable=True)
    image = db.Column(db.String(70),nullable=False,default="default.jpg")
    stock = db.Column(db.Integer,nullable=False,default=1)
    category = db.Column(db.String(50),nullable=False)

    def __init__(self,name,price,desc,brand,image,stock,category):
        self.name=name
        self.price=price
        self.desc=desc
        self.brand=brand
        self.image=image
        self.stock=stock
        self.category=category
    def __repr__(self):
        return f"Product('{self.name}','{self.price}',{self.brand}')"

db.create_all()