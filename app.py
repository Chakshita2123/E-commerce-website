from flask import Flask, render_template, request, redirect, url_for, flash, render_template_string
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_bcrypt import Bcrypt
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key_change_this_in_production'  # Change this to a random secret key

bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'auth'
login_manager.login_message = 'Please log in to access this page.'
login_manager.login_message_category = 'info'

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

@app.route('/register', methods=['POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    email = request.form.get('email')
    password = request.form.get('password')
    
    if not email or not password:
        flash('Email and password are required.', 'danger')
        return redirect(url_for('auth'))
    
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
        return redirect(next_page) if next_page else redirect(url_for('index'))
    else:
        flash('Login unsuccessful. Please check your email and password.', 'danger')
        return redirect(url_for('auth'))

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('index'))

@app.route('/auth')
def auth():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    # Since we don't have the templates folder, let's use render_template_string
    auth_template = '''
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Luméra – Login / Signup</title>
  <style>
    body {
      font-family: 'Playfair Display', serif;
      background: #FFF9F4;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .auth-container {
      background: white;
      padding: 2.5rem 3rem;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      width: 350px;
      max-width: 90%;
    }

    .auth-container h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      letter-spacing: 2px;
      color: #333;
    }

    .auth-container input {
      width: 100%;
      padding: 0.8rem;
      margin-bottom: 1rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-family: 'Playfair Display', serif;
      box-sizing: border-box;
    }

    .auth-container button {
      width: 100%;
      padding: 0.9rem;
      background-color: #76363D;
      color: white;
      border: none;
      font-weight: bold;
      border-radius: 5px;
      letter-spacing: 1px;
      cursor: pointer;
      transition: background 0.3s ease;
      font-family: 'Playfair Display', serif;
    }

    .auth-container button:hover {
      background-color: #5b292e;
    }

    .toggle-link {
      text-align: center;
      margin-top: 1rem;
      font-size: 0.9rem;
    }

    .toggle-link a {
      color: #76363D;
      text-decoration: none;
    }

    .toggle-link a:hover {
      text-decoration: underline;
    }
    
    .alert {
      padding: 1rem;
      margin-bottom: 1rem;
      border: 1px solid transparent;
      border-radius: .25rem;
    }
    
    .alert-danger {
      color: #721c24;
      background-color: #f8d7da;
      border-color: #f5c6cb;
    }
    
    .alert-success {
      color: #155724;
      background-color: #d4edda;
      border-color: #c3e6cb;
    }
    
    .alert-info {
      color: #0c5460;
      background-color: #d1ecf1;
      border-color: #bee5eb;
    }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet">
</head>
<body>

  <div class="auth-container" id="authBox">
    {% with messages = get_flashed_messages(with_categories=true) %}
      {% if messages %}
        {% for category, message in messages %}
          <div class="alert alert-{{ category }}">
            {{ message }}
          </div>
        {% endfor %}
      {% endif %}
    {% endwith %}
    
    <h2 id="formTitle">Login to Luméra</h2>
    
    <form id="authForm" method="POST" action="{{ url_for('login') }}">
        <input type="email" name="email" placeholder="Email" id="email" required>
        <input type="password" name="password" placeholder="Password" id="password" required>
        <button type="submit">Login</button>
    </form>
    
    <div class="toggle-link">
      <span id="toggleText">Don't have an account? <a href="#" onclick="toggleForm()">Sign up</a></span>
    </div>
  </div>

  <script>
    let isSignup = false;

    function toggleForm() {
      isSignup = !isSignup;
      const form = document.getElementById('authForm');
      const title = document.getElementById('formTitle');
      const button = form.querySelector('button');
      const toggleText = document.getElementById('toggleText');

      if (isSignup) {
        title.innerText = "Create an Account";
        button.innerText = "Sign Up";
        form.action = "{{ url_for('register') }}";
        toggleText.innerHTML = 'Already have an account? <a href="#" onclick="toggleForm()">Login</a>';
      } else {
        title.innerText = "Login to Luméra";
        button.innerText = "Login";
        form.action = "{{ url_for('login') }}";
        toggleText.innerHTML = 'Don\\'t have an account? <a href="#" onclick="toggleForm()">Sign up</a>';
      }
    }
  </script>

</body>
</html>
    '''
    return render_template_string(auth_template)

@app.route('/')
def index():
    # Simple homepage for testing
    homepage_template = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Luméra - Home</title>
    <style>
        body {
            font-family: 'Playfair Display', serif;
            background: #FFF9F4;
            margin: 0;
            padding: 2rem;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        .header {
            margin-bottom: 2rem;
        }
        .user-info {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .btn {
            display: inline-block;
            padding: 0.8rem 1.5rem;
            background-color: #76363D;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 0.5rem;
            transition: background 0.3s ease;
        }
        .btn:hover {
            background-color: #5b292e;
        }
        .alert {
            padding: 1rem;
            margin-bottom: 1rem;
            border: 1px solid transparent;
            border-radius: .25rem;
        }
        .alert-success { color: #155724; background-color: #d4edda; border-color: #c3e6cb; }
        .alert-info { color: #0c5460; background-color: #d1ecf1; border-color: #bee5eb; }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        {% with messages = get_flashed_messages(with_categories=true) %}
          {% if messages %}
            {% for category, message in messages %}
              <div class="alert alert-{{ category }}">
                {{ message }}
              </div>
            {% endfor %}
          {% endif %}
        {% endwith %}
        
        <div class="header">
            <h1>Welcome to Luméra</h1>
        </div>
        
        {% if current_user.is_authenticated %}
            <div class="user-info">
                <h3>Hello, {{ current_user.username }}!</h3>
                <p>You are successfully logged in.</p>
                <a href="{{ url_for('logout') }}" class="btn">Logout</a>
            </div>
        {% else %}
            <div class="user-info">
                <h3>Please log in to access your account</h3>
                <a href="{{ url_for('auth') }}" class="btn">Login / Sign Up</a>
            </div>
        {% endif %}
        
        <div style="margin-top: 2rem;">
            <h3>Debug Info:</h3>
            <p>Total registered users: {{ user_count }}</p>
        </div>
    </div>
</body>
</html>
    '''
    return render_template_string(homepage_template, user_count=len(users))

# Protected route example
@app.route('/profile')
@login_required
def profile():
    profile_template = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Profile - Luméra</title>
    <style>
        body {
            font-family: 'Playfair Display', serif;
            background: #FFF9F4;
            margin: 0;
            padding: 2rem;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        .btn {
            display: inline-block;
            padding: 0.8rem 1.5rem;
            background-color: #76363D;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 0.5rem;
        }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <h2>User Profile</h2>
        <p><strong>Email:</strong> {{ current_user.username }}</p>
        <p><strong>User ID:</strong> {{ current_user.id }}</p>
        
        <a href="{{ url_for('index') }}" class="btn">Back to Home</a>
        <a href="{{ url_for('logout') }}" class="btn">Logout</a>
    </div>
</body>
</html>
    '''
    return render_template_string(profile_template)

if __name__ == '__main__':
    print("Starting Luméra Authentication System...")
    print("Navigate to: http://127.0.0.1:5000")
    print("Auth page: http://127.0.0.1:5000/auth")
    app.run(debug=True, host='127.0.0.1', port=5000)