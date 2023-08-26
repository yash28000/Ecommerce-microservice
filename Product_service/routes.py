from flask import Blueprint, render_template, request, redirect, url_for
from models import Product, db

# Create a Blueprint for the product routes
product_bp = Blueprint('product', __name__)

# Route to list all products
@product_bp.route('/')
@product_bp.route('/products')
def list_products():
    # Query all products from the database
    products = Product.query.all()
    # Render the list_products.html template and pass the products list
    return render_template('list_products.html', products=products)

# Route to view a specific product
@product_bp.route('/product/<int:p_id>')
def view_product(p_id):
    # Query a specific product by its ID
    product = Product.query.get(p_id)
    # If product exists, render the view_product.html template
    if product:
        return render_template('view_product.html', product=product)
    # If product not found, return a 404 error
    return "Product not found", 404
'''
This route uses a dynamic URL pattern with the <int:product_id> placeholder. This means that when a user visits a URL like /product/1, the product_id variable will be set to 1.
Inside the function, we use Product.query.get(product_id) to query a specific product by its ID.
'''
# Route to add a new product
@product_bp.route('/add_product', methods=['GET', 'POST'])
def add_product():
    # If request method is POST, form was submitted
    if request.method == 'POST':
        # Extract form data
        p_id =  int(request.form.get('p_id'))
        name = request.form.get('name')
        description = request.form.get('description')
        price = float(request.form.get('price'))
        image = request.form.get('image')
        # Create a new Product object and add to the database
        product = Product(p_id=p_id ,name=name, description=description, price=price, image=image)
        db.session.add(product)
        db.session.commit()
        # Redirect to the list of products
        return redirect(url_for('product.list_products'))
    # If request method is GET, render the add_product.html template
    return render_template('add_product.html')
