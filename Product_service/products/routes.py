from flask import request, jsonify
from products import app, db, ma
from products.models import Product , Images
from werkzeug.utils import secure_filename
import os

class ProductSchema(ma.Schema):
    class Meta:
        fields = ("p_id", "name", "description", "price", "quantity" ,"rating")
product_schema = ProductSchema(many=True)

class ImageSchema(ma.Schema):
    class Meta:
        fields = ("p_id","image_name")
image_schema = ImageSchema(many=True)


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
        rating = request.json['rating']
        product_attr = Product(p_id, name, description, price ,quantity , rating)
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


@app.route('/images/<int:p_id>',methods=['POST', 'GET', 'PUT', 'DELETE'])
def add_image(p_id):
    if request.method == 'POST':
        image_name = request.form['imagename']
        print("got the name")
        image = request.files['image']
        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            img=image.read()
            print("got the name")
        else:
            image_path = None
            print("wrong image")
        if 'image' not in request.files:
            return jsonify({"message": "No image provided"}), 400
        p_id = p_id
        temp = Images(p_id,img,image_name)
        db.session.add(temp)
        db.session.commit()
        return image_schema.jsonify(p_id,image_name)
 
    elif request.method == 'GET': 
        temp = Images.query.filter_by(p_id=p_id).all()
        f = image_schema.dump(temp)
        return print(temp)
 
    elif request.method == 'PUT':
        p_id = request.args.get('p_id')
        temp = Images.query.get(p_id)
        if 'image' in request.files:
            image = request.files['image']
        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image.save(image_path)
            temp.image = image_path
        temp.p_id = p_id
        db.session.commit()
        return image_schema.jsonify(temp)
    
    elif request.method == 'DELETE':
        p_id = request.args.get('p_id')
        add_temp = Images.query.get(p_id)
        if add_temp:
            db.session.delete(add_temp)
            db.session.commit()
            return jsonify({"sucess": True})
        else:
            return jsonify({"success": False})
    
if __name__ == '__main__':
    app.run(debug=True)
