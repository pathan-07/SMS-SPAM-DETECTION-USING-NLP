from flask import Flask, render_template, request, url_for, redirect, flash, session
import pickle
import numpy as np
from functools import wraps
import os
import random
import string
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_mail import Mail, Message

app = Flask(__name__)
app.secret_key = 'yourname'  # Change this to a secure secret key

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'spamdetectinfo@gmail.com'
app.config['MAIL_PASSWORD'] = 'imyv hhek hokt fwtk'
mail = Mail(app)

# User Model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    is_verified = db.Column(db.Boolean, default=False)
    otp = db.Column(db.String(6))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Create database tables
with app.app_context():
    db.create_all()

# Load the trained model and vectorizer
with open('model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)
    
with open('vectorizer.pkl', 'rb') as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)

# Generate OTP
def generate_otp():
    return ''.join(random.choices(string.digits, k=6))

# Login required decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            flash('Please login first.')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def home():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        user = User.query.filter_by(email=email).first()
        
        if user and user.check_password(password):
            if not user.is_verified:
                flash('Please verify your email first. Check your inbox for the OTP.')
                return redirect(url_for('verify_otp'))
            
            session['user_id'] = user.id
            session['username'] = user.username
            flash('Logged in successfully!')
            return redirect(url_for('predict_spam'))
        else:
            flash('Invalid email or password.')
            
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        username = request.form['username']
        password1 = request.form['password1']
        password2 = request.form['password2']
        
        if password1 != password2:
            flash('Passwords do not match!')
            return redirect(url_for('register'))
        
        # Check if user already exists
        if User.query.filter_by(email=email).first():
            flash('Email already registered!')
            return redirect(url_for('register'))
            
        if User.query.filter_by(username=username).first():
            flash('Username already taken!')
            return redirect(url_for('register'))
        
        # Create new user
        new_user = User(email=email, username=username)
        new_user.set_password(password1)
        new_user.otp = generate_otp()  # Generate OTP
        
        try:
            db.session.add(new_user)
            db.session.commit()
            session['email'] = email
            
            # Send OTP via email with specific error handling
            try:
                msg = Message('Your OTP Verification Code',
                            sender='spamdetectinfo@gmail.com',
                            recipients=[email])
                msg.body = f'Your OTP code is {new_user.otp}. Please use it to verify your email address.'
                mail.send(msg)
                flash('Registration successful! Please check your email for the OTP.')
                return redirect(url_for('verify_otp'))
            except Exception as email_error:
                print(f"Email error: {str(email_error)}")  # For debugging
                flash('Registration successful but there was an error sending the OTP email. Please contact support.')
                return redirect(url_for('verify_otp'))
                
        except Exception as db_error:
            db.session.rollback()
            flash('An error occurred during registration. Please try again.')
            print(f"Database error: {str(db_error)}")  # For debugging
            
    return render_template('register.html')
@app.route('/verify-otp', methods=['GET', 'POST'])
def verify_otp():
    if request.method == 'POST':
        otp = request.form['otp']
        user = User.query.filter_by(email=session.get('email')).first()
        
        if user and user.otp == otp:
            user.is_verified = True
            user.otp = None  # Clear OTP after verification
            db.session.commit()
            flash('Email verified successfully! Please login.')
            return redirect(url_for('login'))
        else:
            flash('Invalid OTP. Please try again.')
            
    return render_template('otp.html')

@app.route('/predict', methods=['GET', 'POST'])
@login_required
def predict_spam():
    if request.method == 'POST':
        sms_text = request.form['sms_text']
        text_vectorized = vectorizer.transform([sms_text])
        prediction = model.predict(text_vectorized)
        result = "SPAM" if prediction[0] == 1 else "NOT SPAM"
        return render_template('result.html', result=result)
    return render_template('predict.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('Logged out successfully!')
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
