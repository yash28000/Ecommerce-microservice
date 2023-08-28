from flask import request, jsonify
from products import app, db, ma
from products.models import Product
from werkzeug.utils import secure_filename
import os

class ProductSchema(ma.Schema):
    class Meta:
        fields = ("p_id", "name", "description", "price", "image", "quantity")

product_schema = ProductSchema(many=True)

UPLOAD_FOLDER = 'path/to/your/upload/folder'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/', methods=['POST', 'GET', 'PUT', 'DELETE'])
def products_info():
    if request.method == "POST":
        p_id = request.json['p_id']
        name = request.json['name']
        description = request.json['description']
        price = request.json['price']
        quantity = request.json['quantity']
        if 'image' not in request.files:
            return jsonify({"message": "No image provided"}), 400
        image = request.files['image']
        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image.save(image_path)
        else:
            image_path = None
        product_attr = Product(p_id, name, description, price, image_path, quantity)
        db.session.add(product_attr)
        db.session.commit()
        return jsonify({"message": "Product added successfully"})

    if request.method == "GET":
        products = Product.query.all()
        products_data = product_schema.dump(products)
        return jsonify(products_data)

    if request.method == 'PUT':
        p_id = request.args.get('p_id')
        if not p_id:
            return jsonify({"message": "Product ID (p_id) missing in the request"}), 400
        product = Product.query.get(p_id)
        if not product:
            return jsonify({"message": "Product not found"}), 404
        name = request.json['name']
        description = request.json['description']
        price = request.json['price']
        quantity = request.json["quantity"]
        product.name = name
        product.description = description
        product.price = price
        product.quantity = quantity
        if 'image' in request.files:
            image = request.files['image']
            if image and allowed_file(image.filename):
                filename = secure_filename(image.filename)
                image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                image.save(image_path)
                product.image = image_path
        db.session.commit()
        return jsonify({"message": "Product updated successfully"})

    if request.method == 'DELETE':
        p_id = request.args.get('p_id')
        if not p_id:
            return jsonify({"message": "Product ID (p_id) missing in the request"}), 400
        product = Product.query.get(p_id)
        if not product:
            return jsonify({"message": "Product not found"}), 404
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Product deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True)
