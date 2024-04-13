document.addEventListener('DOMContentLoaded', function() {
  const forgotPasswordModal = document.getElementById('forgotPasswordModal');
  const backToLoginLink = document.getElementById('backToLogin');
  const forgotPasswordForm = document.getElementById('forgotPasswordForm');
  const forgotPasswordError = document.getElementById('forgotPasswordError');
  const forgotPasswordSuccess = document.getElementById('forgotPasswordSuccess');
  const emailInput = document.getElementById('email');

  // Show forgot password modal when link is clicked
  backToLoginLink.addEventListener('click', function(event) {
    event.preventDefault();
    forgotPasswordModal.classList.add('flex');
    forgotPasswordModal.classList.remove('hidden');
  });

  // Hide forgot password modal when backdrop is clicked
  forgotPasswordModal.addEventListener('click', function(event) {
    if (event.target === forgotPasswordModal) {
      hideForgotPasswordModal();
    }
  });

  // Handle form submission
  forgotPasswordForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = emailInput.value;
    if (!validateEmail(email)) {
      displayForgotPasswordError();
    } else {
      // Simulate sending email for password reset
      // For demonstration purposes, show success message
      displayForgotPasswordSuccess();
    }
  });

  // Validate email format
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Display error message for invalid email
  function displayForgotPasswordError() {
    forgotPasswordError.classList.remove('hidden');
    forgotPasswordSuccess.classList.add('hidden');
  }

  // Display success message for email sent
  function displayForgotPasswordSuccess() {
    forgotPasswordSuccess.classList.remove('hidden');
    forgotPasswordError.classList.add('hidden');
  }

  // Hide forgot password modal and reset input and messages
  function hideForgotPasswordModal() {
    forgotPasswordModal.classList.add('hidden');
    forgotPasswordModal.classList.remove('flex');
    emailInput.value = '';
    forgotPasswordError.classList.add('hidden');
    forgotPasswordSuccess.classList.add('hidden');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.getElementById('passwordInput');
  const togglePasswordVisibility = document.getElementById('togglePasswordVisibility');

  togglePasswordVisibility.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordVisibility.innerHTML = type === 'password' ? '<i class="far fa-eye"></i>' : '<i class="far fa-eye-slash"></i>';
  });
});

