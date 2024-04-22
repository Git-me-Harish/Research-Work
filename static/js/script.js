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

// // User Profile Navigation
// $(document).ready(function() {
//   // Handle click event for logo
//   $('.logo').click(function() {
//       window.location.href = 'Ad_home.html'; // Redirect to home page
//   });

//   // Handle click event for profile button
//   $('.profile-section .btn-light').click(function() {
//       window.location.href = 'profile.html'; // Redirect to profile page
//   });
// });

// START OF THIS IS THE LOGIC FOR THE MULTIPLE CONTENT ACCESSING FROM THE SINGLE MENU BAR ALONE 
$(document).ready(function() {
  // Replace [Name] with the actual username
  $('#username').text('John Doe');

  // Add click event for menu links
  $('#home-link').click(function(event) {
    event.preventDefault();
    $('.content-section').hide();
    $('#home-section').show();
  });

  $('#new-user-link').click(function(event) {
    event.preventDefault();
    $('.content-section').hide();
    $('#new-user-content').show();
  });

  $('#manage-users-link').click(function(event) {
    event.preventDefault();
    $('.content-section').hide();
    $('#manage-users-content').show();
  });

  // Add click event for Tests menu and its sub-menu links
  $('#testsMenu a').click(function(event) {
    event.preventDefault();
    // Hide all content sections first
    $('.content-section').hide();
    // Determine which sub-menu item was clicked and show the corresponding content
    if ($(this).attr('href') === '#') {
      // This is the Tests menu itself, do nothing or show a default Tests content
    } else if ($(this).attr('href') === '#') {
      // Add logic for New Test content
      $('#new-test-content').show();
    } else if ($(this).attr('href') === '#') {
      // Add logic for Manage Tests content
      $('#manage-tests-content').show();
    } else if ($(this).attr('href') === '#') {
      // Add logic for Question Pools content
      $('#question-pools-content').show();
    } else if ($(this).attr('href') === '#') {
      // Add logic for Grading Scales content
      $('#grading-scales-content').show();
    }
  });

  // Add click events for other menu links here

  // Example: Submissions link
  $('#submissions-link').click(function(event) {
    event.preventDefault();
    $('.content-section').hide();
    $('#submissions-content').show();
  });

  // Example: Dashboard link
  $('#dashboard-link').click(function(event) {
    event.preventDefault();
    $('.content-section').hide();
    $('#dashboard-content').show();
  });

  // Example: Surveys link
  $('#surveys-link').click(function(event) {
    event.preventDefault();
    $('.content-section').hide();
    $('#surveys-content').show();
  });

  // Example: Sign-out link
  $('#sign-out-link').click(function(event) {
    event.preventDefault();
    // Add logic for signing out, such as redirecting to a sign-out page
    window.location.href = 'adm_login.html';
  });
});
// END OF THIS IS THE LOGIC FOR THE MULTIPLE CONTENT ACCESSING FROM THE SINGLE MENU BAR ALONE 

// Start of The Script for Search and Filter Functionality:

$(document).ready(function() {
  $('#searchForm').submit(function(e) {
    e.preventDefault();
    var searchText = $('#searchInput').val().toLowerCase();
    $('.user-list tbody tr').each(function() {
      var username = $(this).find('td:nth-child(1)').text().toLowerCase();
      var email = $(this).find('td:nth-child(2)').text().toLowerCase();
      if (username.includes(searchText) || email.includes(searchText)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  $('#filterForm').submit(function(e) {
    e.preventDefault();
    var roleFilter = $('#roleSelect').val();
    var statusFilter = $('#statusSelect').val();
    $('.user-list tbody tr').each(function() {
      var role = $(this).find('td:nth-child(3)').text().toLowerCase();
      var status = $(this).find('td:nth-child(4)').text().toLowerCase();
      if ((roleFilter === 'all' || role === roleFilter) && (statusFilter === 'all' || status.includes(statusFilter))) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});

// End of Script for Search and Filter Functionality

// Start of Pagination Functionality
$(document).ready(function() {
  $('#userListTable').DataTable();
});
// End of Pagination Functionality

// Start of Bulk Actions Confirmation:
$('.bulk-actions button').click(function() {
  var action = $(this).text().toLowerCase();
  $('#confirmationModal').modal('show');
  $('#confirmActionBtn').click(function() {
    // Perform bulk action
    $('#confirmationModal').modal('hide');
  });
});
// End of Bulk Actions Confirmation:


// Start of Form Validation:
$(document).ready(function() {
  $('#userDetailsForm').validate({
    rules: {
      usernameInput: {
        required: true,
        minlength: 3
      },
      emailInput: {
        required: true,
        email: true
      }
      // Add more rules as needed
    },
    messages: {
      usernameInput: {
        required: "Please enter a username.",
        minlength: "Username must be at least 3 characters."
      },
      emailInput: {
        required: "Please enter an email address.",
        email: "Please enter a valid email address."
      }
      // Add more messages as needed
    }
  });
});

// End of Form Validation.

// START OF USER PROFILE SLIDING RESPONSE & Start of Dark/Light Mode Toggle

$(document).ready(function() {
  $('#profile-btn').click(function(e) {
    e.stopPropagation(); // Prevent the default behavior of the button
    $('.user-profile').toggleClass('active');
  });

  $('#close-profile').click(function() {
    $('.user-profile').removeClass('active');
  });

  $(document).click(function(e) {
    if (!$(e.target).closest('.user-profile').length && !$(e.target).closest('#profile-btn').length) {
      $('.user-profile').removeClass('active');
    }
  });

  // Dark Mode Toggle
  $('#dark-mode-switch').change(function() {
    $('.user-profile').toggleClass('dark-mode');
  });
});

// END OF USER PROFILE SLIDING RESPONSE 








