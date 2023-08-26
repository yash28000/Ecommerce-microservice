from flask import Blueprint, jsonify, request
from models import Product, db

product_bp = Blueprint('product', __name__)

@product_bp.route('/products')
def list_products():
    products = Product.query.all()
    product_data = [{"p_id": product.p_id, "name": product.name, "description": product.description, "price": product.price, "image": product.image} for product in products]
    return jsonify(product_data)

@product_bp.route('/product/<int:p_id>')
def view_product(p_id):
    product = Product.query.get(p_id)
    if product:
        product_data = {"p_id": product.p_id, "name": product.name, "description": product.description, "price": product.price, "image": product.image}
        return jsonify(product_data)
    return jsonify({"error": "Product not found"}), 404

@product_bp.route('/add_product', methods=['POST'])
def add_product():
    data = request.json
    p_id = data.get('p_id')
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    image = data.get('image')
    new_product = Product(p_id=p_id, name=name, description=description, price=price, image=image)
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"message": "Product added successfully"}), 201
