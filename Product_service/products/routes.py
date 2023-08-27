from flask import  request,jsonify,json
from products import app,db,ma
from products.models import Product

class ProductSchema(ma.Schema):
    class Meta:
        fields = ("p_id","name","description","price","image","quantity")
product_schema = ProductSchema(many=True)

@app.route('/',methods = ['POST','GET','PUT','DELETE'])
def products_info():
    if(request.method == "POST"):
        p_id = request.json['p_id']        
        name = request.json['name']
        description = request.json['description']
        price = request.json['price']
        image = request.json['image']
        quantity = request.json['quantity']
        product_attr = Product(p_id,name,description,price,image,quantity)
        db.session.add(product_attr)
        db.session.commit() 
        return jsonify({"message": "Product added successfully"})
    if request.method == "GET":
        products = Product.query.all()
        products_data = product_schema.dump(products)
        return jsonify(products_data)
    elif request.method == 'PUT':
        p_id = request.args.get('p_id')
        if not p_id:
            return jsonify({"message": "Product ID (p_id) missing in the request"}), 400
        product = Product.query.get(p_id)
        if not product:
            return jsonify({"message": "Product not found"}), 404
        name = request.json['name']
        description = request.json['description']
        price = request.json['price']
        image = request.json['image']
        quantity = request.json["quantity"]
        product.name = name
        product.description = description
        product.price = price
        product.image = image
        product.quantity = quantity
        db.session.commit()
        return jsonify({"message": "Product updated successfully"})
    elif request.method == 'DELETE':
        p_id = request.args.get('p_id')
        if not p_id:
            return jsonify({"message": "Product ID (p_id) missing in the request"}), 400
        print(p_id)
        product = Product.query.get(p_id)       
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted successfully"})