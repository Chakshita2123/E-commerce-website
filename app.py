# from flask import Flask, render_template, request, redirect, url_for, flash
# from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
# from flask_bcrypt import Bcrypt
# from whitenoise import WhiteNoise
# import os

# app = Flask(__name__, template_folder='templates', static_folder='static')
# app.wsgi_app = WhiteNoise(app.wsgi_app, root="static/")
# #app.config['SECRET_KEY'] = 'your_secret_key_change_this_in_production'  # Change this to a random secret key
# import os
# app.secret_key = os.environ.get("SECRET_KEY", "default_key_for_dev")


# bcrypt = Bcrypt(app)
# login_manager = LoginManager(app)
# login_manager.login_view = 'auth'
# login_manager.login_message = 'Please log in to access this page.'
# login_manager.login_message_category = 'info'

# # In-memory user store (replace with a database in a real application)
# users = {}

# class User(UserMixin):
#     def __init__(self, id, username, password):
#         self.id = id
#         self.username = username
#         self.password = password

# @login_manager.user_loader
# def load_user(user_id):
#     return users.get(int(user_id))

# @app.route('/register', methods=['POST'])
# def register():
#     if current_user.is_authenticated:
#         return redirect(url_for('index'))
    
#     email = request.form.get('email')
#     password = request.form.get('password')
    
#     if not email or not password:
#         flash('Email and password are required.', 'danger')
#         return redirect(url_for('auth'))
    
#     # Check if user already exists
#     if any(user.username == email for user in users.values()):
#         flash('An account with this email already exists.', 'danger')
#         return redirect(url_for('auth'))

#     hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
#     user_id = len(users) + 1
#     new_user = User(id=user_id, username=email, password=hashed_password)
#     users[user_id] = new_user
    
#     flash('Your account has been created! You can now log in.', 'success')
#     return redirect(url_for('auth'))

# @app.route('/login', methods=['POST'])
# def login():
#     if current_user.is_authenticated:
#         return redirect(url_for('index'))

#     email = request.form.get('email')
#     password = request.form.get('password')
    
#     if not email or not password:
#         flash('Email and password are required.', 'danger')
#         return redirect(url_for('auth'))
    
#     user = None
#     for u in users.values():
#         if u.username == email:
#             user = u
#             break
    
#     if user and bcrypt.check_password_hash(user.password, password):
#         login_user(user, remember=True)
#         next_page = request.args.get('next')
#         flash(f'Welcome back, {email}!', 'success')
#         return redirect(next_page) if next_page else redirect(url_for('index'))
#     else:
#         flash('Login unsuccessful. Please check your email and password.', 'danger')
#         return redirect(url_for('auth'))

# @app.route('/logout')
# @login_required
# def logout():
#     logout_user()
#     flash('You have been logged out.', 'info')
#     return redirect(url_for('index'))

# @app.route('/auth')
# def auth():
#     if current_user.is_authenticated:
#         return redirect(url_for('index'))
#     return render_template('auth.html')

# #@app.route('/')
# #def index():
#     #return render_template('homepage.html', user_count=len(users))

# @app.route('/')
# def homepage():
#     return render_template('homepage.html')


# # @app.route('/<page_name>')
# # def show_page(page_name):
# #     # Ignore browser's automatic favicon request
# #     if page_name == "favicon.ico":
# #         return "", 204

# #     # Render the page if it exists
# #     return render_template(f"{page_name}.html")
# @app.route('/')
# def homepage():
#     return render_template('homepage.html')

# @app.route('/bestsellers')
# def bestsellers():
#     return render_template('bestsellers.html')

# @app.route('/fragrance')
# def fragrance():
#     return render_template('fragrance.html')

# @app.route('/gifting')
# def gifting():
#     return render_template('gifting.html')

# @app.route('/shop')
# def shop():
#     return render_template('shop.html')

# # and so on...



# if __name__ == '__main__':
#     app.run(debug=True, host='127.0.0.1', port=8080)


from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_bcrypt import Bcrypt
from whitenoise import WhiteNoise
import os

app = Flask(__name__, template_folder='templates', static_folder='static')
app.wsgi_app = WhiteNoise(app.wsgi_app, root="static/")
app.secret_key = os.environ.get("SECRET_KEY", "default_key_for_dev")

bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'auth'
login_manager.login_message = 'Please log in to access this page.'
login_manager.login_message_category = 'info'

# In-memory user store
users = {}

class User(UserMixin):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

@login_manager.user_loader
def load_user(user_id):
    return users.get(int(user_id))

# ------------------ Auth Routes ------------------

@app.route('/register', methods=['POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('homepage'))
    
    email = request.form.get('email')
    password = request.form.get('password')
    
    if not email or not password:
        flash('Email and password are required.', 'danger')
        return redirect(url_for('auth'))
    
    if any(user.username == email for user in users.values()):
        flash('An account with this email already exists.', 'danger')
        return redirect(url_for('auth'))

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user_id = len(users) + 1
    new_user = User(id=user_id, username=email, password=hashed_password)
    users[user_id] = new_user
    
    flash('Your account has been created! You can now log in.', 'success')
    return redirect(url_for('auth'))

@app.route('/login', methods=['POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('homepage'))

    email = request.form.get('email')
    password = request.form.get('password')
    
    if not email or not password:
        flash('Email and password are required.', 'danger')
        return redirect(url_for('auth'))
    
    user = None
    for u in users.values():
        if u.username == email:
            user = u
            break
    
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user, remember=True)
        next_page = request.args.get('next')
        flash(f'Welcome back, {email}!', 'success')
        return redirect(next_page) if next_page else redirect(url_for('homepage'))
    else:
        flash('Login unsuccessful. Please check your email and password.', 'danger')
        return redirect(url_for('auth'))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('homepage'))

@app.route('/auth')
def auth():
    if current_user.is_authenticated:
        return redirect(url_for('homepage'))
    return render_template('auth.html')

# ------------------ Page Routes ------------------

@app.route('/')
def homepage():
    return render_template('homepage.html')

@app.route('/bestsellers')
def bestsellers():
    return render_template('bestsellers.html')

@app.route('/gifting')
def gifting():
    return render_template('gifting.html')

@app.route('/shop')
def shop():
    return render_template('shop.html')

# Specific fragrance category pages (not /fragrance)
@app.route('/floralANDaromatic')
def floral_aromatic():
    return render_template('floralANDaromatic.html')

@app.route('/woody')
def woody():
    return render_template('woody.html')

@app.route('/opulent')
def opulent():
    return render_template('opulent.html')

# ------------------ Run ------------------

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=8080)
