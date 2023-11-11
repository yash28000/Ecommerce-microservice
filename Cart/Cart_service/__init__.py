from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_cors import CORS,cross_origin
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)
app.app_context().push()
ma = Marshmallow(app)
bcypt = Bcrypt()
from Cart_service import routes