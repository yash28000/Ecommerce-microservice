from flaskAuth import app,db,bcypt
from flask import request,jsonify
from flaskAuth.models import User,Address
from flaskAuth import ma

class UserSchema(ma.Schema):
    class Meta:
        fields = ("id","username","email","image")
user_schema = UserSchema()
users_schema = UserSchema(many=True)

class AddresseSchema(ma.Schema):
    class Meta:
        fields = ("id","area","city","pincode","country","state")
add_schema = AddresseSchema()
adds_schema = AddresseSchema(many=True)


@app.route('/home')
def home():
    return "hello"
## // route will be /user
@app.route('/',methods = ['POST','GET','PUT','DELETE'])
def user_info():
    if(request.method == "POST"):
        username = request.json['username']
        email = request.json['email']
        password = request.json['password']
        hashed_password = bcypt.generate_password_hash(password).decode('utf-8')
        user_attr = User(username,email,hashed_password)
        db.session.add(user_attr)
        db.session.commit()
        user = user_schema.dump(user_attr) 
        return jsonify({"success": True,"user":user})
    elif request.method == 'GET':
        user = User.query.all()
        users = users_schema.dump(user)
        return jsonify(users)
    elif request.method == 'PUT':
        _id = request.args.get('id')
        user = User.query.get(_id)
        password = request.json['password']
        username = request.json['username']
        user.username = username
        user.password = hashed_password = bcypt.generate_password_hash(password).decode('utf-8')
        db.session.commit()
        data = user_schema.dump(user)
        return jsonify({"success": True,"user":data})
    elif request.method == 'DELETE':
        _id = request.args.get('id')
        print(_id)
        user = User.query.get(_id)
        if user:
            add = Address.query.filter_by(user_id = _id).all()
            print(add)
            db.session.delete(user)
            for _ in add:
                db.session.delete(_)
            db.session.commit()
            return jsonify({"sucess": True})
        else:
            return jsonify({"success": False})

#// route will be /user/auth
@app.route('/auth',methods = ['POST']) 
def auth():
    email = request.json['email']
    try:
        user = User.query.filter_by(email = email).first()
        if user and bcypt.check_password_hash(user.password,request.json['password']):
            data = user_schema.dump(user)
            return jsonify({"success": True,"user":data})
        else:
            return jsonify({"success": False,"message":"Wrong Credentials"})
    except:
        return jsonify({"success": False,"message":"Wrong Credentials"})

#// route will be /user/address/<user_id>
@app.route('/address/<user_id>',methods = ['GET','POST','DELETE','PUT'])
def add_reference(user_id):
    if request.method == 'POST':
        area = request.json['area']
        city = request.json['city']
        pincode = request.json['pincode']
        country = request.json['country']
        state = request.json['state']
        user_id = user_id
        temp = Address(area,city,pincode,country,state,user_id)
        db.session.add(temp)
        db.session.commit()
        return add_schema.jsonify(temp)
    elif request.method == 'GET': 
        temp = Address.query.filter_by(user_id=user_id).all()
        f = adds_schema.dump(temp)
        return jsonify(f)
    elif request.method == 'PUT':
        _id = request.args.get('id')
        temp = Address.query.get(_id)
        temp.area = request.json['area']
        temp.city = request.json['city']
        temp.pincode = request.json['pincode']
        temp.country = request.json['country']
        temp.state = request.json['state']
        temp.user_id = user_id
        db.session.commit()
        return add_schema.jsonify(temp)
    elif request.method == 'DELETE':
        _id = request.args.get('id')
        add_temp = Address.query.get(_id)
        if add_temp:
            db.session.delete(add_temp)
            db.session.commit()
            return jsonify({"sucess": True})
        else:
            return jsonify({"success": False})
