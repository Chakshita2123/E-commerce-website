from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'  # Change this to a random secret key

bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# In-memory user store (replace with a database in a real application)
users = {}

class User(UserMixin):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

@login_manager.user_loader
def load_user(user_id):
    return users.get(int(user_id))

@login_manager.user_loader
def load_user(user_id):
    return users.get(int(user_id))

@app.route('/register', methods=['POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    email = request.form.get('email')
    password = request.form.get('password')
    
    # Check if user already exists
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
        return redirect(url_for('index'))

    email = request.form.get('email')
    password = request.form.get('password')
    
    user = None
    for u in users.values():
        if u.username == email:
            user = u
            break
    
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user, remember=True)
        next_page = request.args.get('next')
        return redirect(next_page) if next_page else redirect(url_for('index'))
    else:
        flash('Login unsuccessful. Please check your email and password.', 'danger')
        return redirect(url_for('auth'))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/auth')
def auth():
    return render_template('auth.html')

@app.route('/')
def index():
    return render_template('homepage.html')

if __name__ == '__main__':
    app.run(debug=True)
