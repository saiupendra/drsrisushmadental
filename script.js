// Set the launch date (update this to your actual launch date)
const launchDate = new Date('2026-01-15T00:00:00').getTime();

// Update countdown timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Handle email subscription form
document.getElementById('subscriptionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const messageElement = document.getElementById('formMessage');

    // Validate email
    if (email === '') {
        messageElement.textContent = 'Please enter your email address';
        messageElement.style.color = '#ff6b6b';
        return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        messageElement.textContent = 'Please enter a valid email address';
        messageElement.style.color = '#ff6b6b';
        return;
    }

    // Show success message
    messageElement.textContent = '✓ Thank you! We\'ll notify you soon.';
    messageElement.style.color = '#4caf50';

    // Reset form
    document.getElementById('email').value = '';

    // Clear message after 5 seconds
    setTimeout(() => {
        messageElement.textContent = '';
    }, 5000);
});

// Hamburger Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});
// ===== SEO OPTIMIZATION =====

// Track page views for analytics
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href,
            'page_path': window.location.pathname
        });
    }
}

// Track form submissions
document.getElementById('subscriptionForm').addEventListener('submit', function(e) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_lead', {
            'value': 1.0,
            'currency': 'INR',
            'event_category': 'engagement'
        });
    }
});

// Track button clicks
document.querySelectorAll('.float-btn, .btn-subscribe').forEach(btn => {
    btn.addEventListener('click', function() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'engagement',
                'event_label': this.className
            });
        }
    });
});

trackPageView();
// Scroll-triggered appointment modal
document.addEventListener('DOMContentLoaded', function() {
  // Only run if modal not already shown this session
  let modalShown = false;

  function showAppointmentModal() {
    if (!modalShown && !sessionStorage.getItem('appointmentModalShown')) {
      document.getElementById('appointment-modal').style.display = 'block';
      modalShown = true;
      sessionStorage.setItem('appointmentModalShown', 'true');
    }
  }

  // Show when user scrolls at least 250px down
  window.addEventListener('scroll', function scrollListener() {
    if ((window.scrollY || window.pageYOffset) > 250) {
      showAppointmentModal();
      // Remove listener so it doesn't trigger again (performance)
      window.removeEventListener('scroll', scrollListener);
    }
  });

  // Modal close logic (same as before)
  document.getElementById('closeModalBtn').onclick = function() {
    document.getElementById('appointment-modal').style.display = 'none';
  };
  window.onclick = function(event) {
    if (event.target == document.getElementById('appointment-modal')) {
      document.getElementById('appointment-modal').style.display = 'none';
    }
  };
});

