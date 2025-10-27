// Set the launch date (update this to your actual launch date)
const launchDate = new Date('2026-01-15T00:00:00').getTime();

// Update countdown timer
function updateCountdown() {
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance < 0) {
    ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
      document.getElementById(id).textContent = '0';
    });
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
document.getElementById('subscriptionForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const messageElement = document.getElementById('formMessage');

  if (email === '') {
    messageElement.textContent = 'Please enter your email address';
    messageElement.style.color = '#ff6b6b';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    messageElement.textContent = 'Please enter a valid email address';
    messageElement.style.color = '#ff6b6b';
    return;
  }

  messageElement.textContent = '✓ Thank you! We\'ll notify you soon.';
  messageElement.style.color = '#4caf50';
  document.getElementById('email').value = '';

  setTimeout(() => {
    messageElement.textContent = '';
  }, 5000);
});

// Hamburger Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', function () {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function () {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

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
if (backToTopBtn) {
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
    if (!isActive) faqItem.classList.add('active');
  });
});

// ===== SEO OPTIMIZATION =====
function trackPageView() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      'page_title': document.title,
      'page_location': window.location.href,
      'page_path': window.location.pathname
    });
  }
}

document.getElementById('subscriptionForm').addEventListener('submit', function () {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'generate_lead', {
      'value': 1.0,
      'currency': 'INR',
      'event_category': 'engagement'
    });
  }
});

document.querySelectorAll('.float-btn, .btn-subscribe').forEach(btn => {
  btn.addEventListener('click', function () {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        'event_category': 'engagement',
        'event_label': this.className
      });
    }
  });
});

trackPageView();

// ===== Scroll-triggered Appointment Modal (corrected) =====
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('appointment-modal');
  const closeBtn = document.getElementById('closeModalBtn');
  const servicesSection = document.getElementById('services');

  if (!modal || !servicesSection) return;

  if (sessionStorage.getItem('appointmentModalShown')) return;

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        modal.style.display = 'flex';
        sessionStorage.setItem('appointmentModalShown', 'true');
        observerInstance.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(servicesSection);

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});
