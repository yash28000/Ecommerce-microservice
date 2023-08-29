from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///product.db'
db = SQLAlchemy(app)
app.app_context().push()
ma = Marshmallow(app)
bcypt = Bcrypt()

from products import routes