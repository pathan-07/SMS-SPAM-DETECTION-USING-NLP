// Form validation for registration
function validateRegistrationForm() {
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password1 = document.getElementById('password1').value;
    const password2 = document.getElementById('password2').value;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    // Username validation
    if (username.length < 3) {
        alert('Username must be at least 3 characters long');
        return false;
    }

// ...existing code...

// SMS text validation
function validateSMSForm() {
    const smsText = document.getElementById('sms_text').value;
    if (smsText.trim().length === 0) {
        alert('Please enter some text to analyze');
        return false;
    }
    return true;
}

// Password visibility toggle
function togglePasswordVisibility(inputId, toggleButtonId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = document.getElementById(toggleButtonId);
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    toggleButton.textContent = type === 'password' ? 'Show' : 'Hide';
}

// Initialize all event listeners when document loads
document.addEventListener('DOMContentLoaded', function() {
    // Setup registration form validation
    const registrationForm = document.querySelector('form[action*="register"]');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            if (!validateRegistrationForm()) {
                e.preventDefault();
            }
        });
    }

    // Setup SMS form validation
    const smsForm = document.querySelector('form[action*="predict_spam"]');
    if (smsForm) {
        smsForm.addEventListener('submit', function(e) {
            if (!validateSMSForm()) {
                e.preventDefault();
            }
        });
    }

    // Setup password visibility toggle for login form
    const togglePasswordButton = document.querySelector('.toggle-password');
    if (togglePasswordButton) {
        togglePasswordButton.addEventListener('click', function() {
            togglePasswordVisibility('password', 'togglePasswordButton');
        });
    }
});

// ...existing code...

// Initialize all event listeners when document loads
document.addEventListener('DOMContentLoaded', function() {
    // Setup registration form validation
    const registrationForm = document.querySelector('form[action*="register"]');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            if (!validateRegistrationForm()) {
                e.preventDefault();
            }
        });
    }

    // Setup SMS form validation
    const smsForm = document.querySelector('form[action*="predict_spam"]');
    if (smsForm) {
        smsForm.addEventListener('submit', function(e) {
            if (!validateSMSForm()) {
                e.preventDefault();
            }
        });
    }

    // Setup OTP input handling
    setupOTPInput();

    // Add password visibility toggles to login and registration forms
    const passwordFields = document.querySelectorAll('input[type="password"]');
    passwordFields.forEach(field => {
        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.textContent = 'Show';
        toggleButton.onclick = () => togglePasswordVisibility(field.id);
        field.parentNode.insertBefore(toggleButton, field.nextSibling);
    });
});
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = passwordInput.nextElementSibling;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
    } else {
        passwordInput.type = 'password';
        toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
    }
}
