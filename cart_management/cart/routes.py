from Cart_service import app,ma,db
from Cart_service.models import Cart
from flask import request,jsonify

class CartSchema(ma.Schema):
    class Meta:
        fields = ("c_id","user_id","p_id","quantity")
carts_schema = CartSchema(many=True)

@app.route('/images/<int:user_id>',methods=['GET','POST','PUT','DELETE'])
def ret():
    if request.method == "GET":
        p_id = request.args.get('user_id')
        cart_items = Cart.query.filter_by(user_id=user_id).all()
        cart = carts_schema.dump(cart_items)
        return jsonify(cart)

    elif request.method == "POST":
        c_id = request.form['c_id']
        user_id = request.json['user_id']
        p_id = request.json['p_id']
        qty = request.json['qty']
        new_Cart = Cart(user_id,p_id,qty)
        db.session.add(new_Cart)
        db.session.commit()
        cart = cart_schema.dump(new_Cart)
        return jsonify({"success":True,"cart":cart})
    
    
@app.route('/cart',method=['GET','PUT','DELETE'])
def cart_ref():
    if request.method=='GET':
        _id = request.queru.get('id')
        cart_data = cart_schema.dump(Cart.query.get(_id).first())
        return jsonify({"success":True,"cart_data":cart_data})

    elif request.method == "PUT":
        _id = request.args.get('id')
        _cart = Cart.query.get(_id).first()
        _cart.user_id = request.json['user_id']
        _cart.p_id = request.json['p_id']
        _cart.qty = request.json['qty']
        db.session.commit()
        return jsonify({"success":True})

    elif request.method == "DELETE":
        _id = request.args.get('id')
        _temp = Cart.query.get(_id).first()
        db.session.delete(_temp)
        db.session.commit()
        return jsonify({"success":True})
    