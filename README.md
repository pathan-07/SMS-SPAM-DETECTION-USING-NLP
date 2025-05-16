# SMS Spam Detection Using NLP

A web-based application that uses Natural Language Processing (NLP) techniques to detect spam SMS messages. This system features user authentication, email verification, and machine learning-based spam detection.

## Features

- **User Authentication System**
  - Secure registration with email verification via OTP
  - Password encryption using Werkzeug's security functions
  - Login/logout functionality with session management

- **Email Verification**
  - OTP (One-Time Password) generation and validation
  - Timed expiration for security (10 minutes)
  - Email delivery using Flask-Mail

- **Spam Detection**
  - Machine learning model trained on SMS spam dataset
  - Text preprocessing using NLP techniques
  - Real-time prediction of SMS messages

- **Responsive UI**
  - Clean and user-friendly interface
  - Form validation (client and server side)
  - Password visibility toggle
  - Flash messages for user feedback

## Technology Stack

### Backend
- **Flask** - Web framework
- **SQLAlchemy** - Database ORM
- **Flask-Login** - User session management
- **Flask-Mail** - Email functionality
- **Werkzeug** - Security features
- **scikit-learn** - Machine learning library
- **NLTK** - Natural Language Processing

### Frontend
- **HTML5/CSS3** - Structure and styling
- **JavaScript** - Client-side validation and interactivity

## Installation and Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/SMS-SPAM-DETECTION-USING-NLP.git
   cd SMS-SPAM-DETECTION-USING-NLP
   ```

2. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

3. Configure email settings
   - Open `deploy/app.py`
   - Update the following configurations with your email credentials:
     ```python
     app.config['MAIL_USERNAME'] = 'your-email@gmail.com'
     app.config['MAIL_PASSWORD'] = 'your-password'
     ```

4. Run the application
   ```bash
   python deploy/app.py
   ```

5. Access the application
   - Open your web browser
   - Navigate to `http://127.0.0.1:5000/`

## Project Structure

- **deploy/**
  - `app.py` - Main application with routes and configuration
  - `model.pkl` - Trained machine learning model
  - `vectorizer.pkl` - Text vectorizer for processing input messages
  - **static/**
    - `styles.css` - Application styling
    - `script.js` - Client-side JavaScript functionality
  - **templates/**
    - `login.html` - Login page
    - `register.html` - Registration page
    - `otp.html` - OTP verification
    - `predict.html` - SMS text input
    - `result.html` - Prediction result display

- **instance/**
  - `database.db` - SQLite database for user data

- `spam.ipynb` - Jupyter notebook with model training process
- `sms-spam.csv` - Dataset used for training
- `requirements.txt` - Dependencies
- `Procfile` - Configuration for deployment platforms

## Model Training

The spam detection model was created using:
1. Text preprocessing techniques (tokenization, stemming, stopword removal)
2. Feature extraction with Count Vectorization
3. Training with Naive Bayes classifiers
4. Model evaluation and selection based on accuracy metrics

## Deployment

This application is configured for deployment on platforms such as Heroku using the included Procfile.

## Future Enhancements

- User dashboard with prediction history
- Multiple language support
- Advanced analysis of spam probability
- Additional authentication methods

## License

[MIT License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

