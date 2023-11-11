from product import app,db,ma
from flask import request,jsonify,json
from product.models import Product

class ProductSchema(ma.Schema):
    class Meta:
        fields=("id","name","desc","price","brand","image","stock","category")

prod_schema = ProductSchema()
prods_schema = ProductSchema(many=True)

@app.route('/prod',methods=['GET'])
def get():
    if request.method == 'GET':
        id = request.args.get('id')
        data = Product.query.filter_by(id=id).first()
        _data = prod_schema.dump(data)
        return jsonify(_data)
@app.route('/',methods= ['GET','POST','PUT','DELETE'])
def prod():
    if request.method == 'POST':
        try:    
            name=request.json['name']
            price=request.json['price']
            desc=request.json['desc']
            brand=request.json['brand']
            image=request.json['image']
            stock=request.json['stock']
            category=request.json['category']

            temp_prod = Product(name,price,desc,brand,image,stock,category)
            print(temp_prod)
            db.session.add(temp_prod)
            db.session.commit()
                
            return prod_schema.jsonify(temp_prod)
        except:
            
            return jsonify({"status":False,"message":"Error Occurred"})

    if request.method == 'GET':
        if request.query_string:
            cat = request.args.get('category')
            prods = Product.query.filter_by(category=cat).all()
            print(prods)
            prods_sc = prods_schema.dump(prods)
            return jsonify(prods_sc)

        else:
            all_prod = Product.query.all()
            ap = prods_schema.dump(all_prod)
            return jsonify(ap)
    

    
    if request.method == 'PUT':
        _id = request.args.get('id')
        prod = Product.query.get(_id)
        prod.name=request.json['name']
        prod.price=request.json['price']
        prod.desc=request.json['desc']
        prod.brand=request.json['brand']
        prod.image=request.json['image']
        prod.stock=request.json['stock']
        prod.category=request.json['category']
        db.session.commit()
        t = prod_schema.dump(prod)

        return jsonify({"status":True,"product":t})
    if request.method == 'DELETE':
        _id = request.args.get('id')
        prod = Product.query.get(_id)
        db.session.delete(prod)
        db.session.commit()
        return jsonify({"status":True})