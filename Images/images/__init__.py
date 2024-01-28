import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_cors import CORS,cross_origin
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] =os.getenv('DATABASE_URI', 'postgresql://postgres:123123@db:5432/ecomdb')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)
app.app_context().push()
ma = Marshmallow(app)
bcypt = Bcrypt()
from images import routes