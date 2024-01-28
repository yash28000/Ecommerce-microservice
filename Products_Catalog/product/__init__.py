from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS,cross_origin
import os
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI','postgresql://postgres:123123@db:5432/ecomdb')
db = SQLAlchemy(app)
app.app_context().push()
ma = Marshmallow(app)
class ProductSchema(ma.Schema):
    class Meta:
        fileds = ("id","name","desc","price","brand","image","stock","category")

prod_schema = ProductSchema()
prods_schema = ProductSchema(many=True)
from product import routes