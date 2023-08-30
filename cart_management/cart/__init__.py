from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///cart.db'  # Replace with your cart database URI
db = SQLAlchemy(app)
app.app_context().push()
ma = Marshmallow(app)
bcrypt = Bcrypt()

from cart_management.cart import routes
if __name__ == '__main__':
    app.run(debug=True)
