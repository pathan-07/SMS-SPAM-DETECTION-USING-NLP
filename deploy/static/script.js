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

    // Password validation
    if (password1.length < 8) {
        alert('Password must be at least 8 characters long');
        return false;
    }

    if (password1 !== password2) {
        alert('Passwords do not match');
        return false;
    }

    return true;
}

// OTP input handling
function setupOTPInput() {
    const otpInput = document.getElementById('otp');
    if (otpInput) {
        otpInput.addEventListener('input', function(e) {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Limit to 6 digits
            if (this.value.length > 6) {
                this.value = this.value.slice(0, 6);
            }
        });
    }
}

// SMS text validation
function validateSMSForm() {
    const smsText = document.getElementById('sms_text').value;
    if (smsText.trim().length === 0) {
        alert('Please enter some text to analyze');
        return false;
    }
    return true;
}

// Password visibility toggle (Updated)
function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Update button text
    const toggleButton = passwordInput.nextElementSibling;
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

    // Setup OTP input handling
    setupOTPInput();

    // Add password visibility toggles (Updated)
    const passwordFields = document.querySelectorAll('input[type="password"]');
    passwordFields.forEach(field => {
        const toggleButton = document.createElement('button');
        toggleButton.type = 'button';
        toggleButton.textContent = 'Show'; // Initial state
        toggleButton.onclick = () => togglePasswordVisibility(field.id);
        field.parentNode.insertBefore(toggleButton, field.nextSibling);
    });
});