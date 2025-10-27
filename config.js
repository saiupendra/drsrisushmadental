// ===== CLINIC CONFIGURATION =====
// Update these values in ONE place - all pages will automatically use them!

const clinicConfig = {
  name: "Dr Sri Sushma Multispecialty Dental Clinic",
  phone: "+919999999999",
  email: "info@drsrisushma.com",
  address: "Hyderabad, Telangana, India",
  website: "https://drsrisushma.github.io",
  whatsapp: "https://wa.me/919999999999"
};

// Function to replace placeholders
function initializeClinicInfo() {
  // Replace phone numbers
  document.querySelectorAll('[data-phone]').forEach(el => {
    el.href = `tel:${clinicConfig.phone}`;
    el.textContent = clinicConfig.phone;
  });

  // Replace email addresses
  document.querySelectorAll('[data-email]').forEach(el => {
    el.href = `mailto:${clinicConfig.email}`;
    el.textContent = clinicConfig.email;
  });

  // Replace WhatsApp links
  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    el.href = clinicConfig.whatsapp;
  });

  // Replace address
  document.querySelectorAll('[data-address]').forEach(el => {
    el.textContent = clinicConfig.address;
  });

  // Replace clinic name
  document.querySelectorAll('[data-clinic-name]').forEach(el => {
    el.textContent = clinicConfig.name;
  });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', initializeClinicInfo);
