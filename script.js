// ===== Countdown Timer =====
const launchDate = new Date('2026-01-15T00:00:00').getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = launchDate - now;

  if (distance <= 0) {
    ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '00';
    });
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(val).padStart(2, '0');
  };

  set('days', days);
  set('hours', hours);
  set('minutes', minutes);
  set('seconds', seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== Email Subscription Form =====
const subscriptionForm = document.getElementById('subscriptionForm');
if (subscriptionForm) {
  subscriptionForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const msg = document.getElementById('formMessage');

    if (!emailInput || !msg) return;

    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      msg.textContent = 'Please enter your email address';
      msg.style.color = '#ff6b6b';
      return;
    }

    if (!emailRegex.test(email)) {
      msg.textContent = 'Please enter a valid email address';
      msg.style.color = '#ff6b6b';
      return;
    }

    msg.textContent = '✓ Thank you! We\'ll notify you soon.';
    msg.style.color = '#4caf50';
    emailInput.value = '';

    // Analytics event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'generate_lead', {
        value: 1.0,
        currency: 'INR',
        event_category: 'engagement'
      });
    }

    setTimeout(() => (msg.textContent = ''), 5000);
  });
}

// ===== Hamburger Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== Back to Top Button =====
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('show', window.pageYOffset > 300);
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== FAQ Accordion =====
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const parent = button.parentElement;
    const isActive = parent.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!isActive) parent.classList.add('active');
  });
});

// ===== Scroll-triggered Appointment Modal =====
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('appointment-modal');
  const closeBtn = document.getElementById('closeModalBtn');
  const servicesSection = document.getElementById('services');
  if (!modal || !servicesSection) return;

  if (sessionStorage.getItem('appointmentModalShown')) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        modal.style.display = 'flex';
        modal.style.animation = 'fadeIn 0.5s ease forwards';
        sessionStorage.setItem('appointmentModalShown', 'true');
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(servicesSection);

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => (modal.style.display = 'none'), 300);
    });
  }

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => (modal.style.display = 'none'), 300);
    }
  });
});

// ===== Google Analytics Page View =====
function trackPageView() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }
}
trackPageView();

// ===== Track Button Clicks (Floating/Subscribe) =====
document.querySelectorAll('.float-btn, .btn-subscribe').forEach(btn => {
  btn.addEventListener('click', function () {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'engagement',
        event_label: this.className
      });
    }
  });
});
// Header and Footer includes
document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
    
    // Load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});
//============service pages script=================
document.querySelectorAll('.before-after-slider').forEach(function(slider) {
  const range = slider.querySelector('.slider-range');
  const afterImg = slider.querySelectorAll('img')[1];
  range.addEventListener('input', function() {
    afterImg.style.clipPath = `inset(0 ${100 - this.value}% 0 0)`;
  });
});
