document.addEventListener('DOMContentLoaded', () => {
  // Preloader
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });

  // Theme Management
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');

  function setTheme(isDark) {
    document.body.classList.toggle('light-theme', !isDark);
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Animate icon rotation
    themeIcon.style.transform = `rotate(${isDark ? 180 : 0}deg)`;
  }

  // Set initial theme from localStorage on page load
  if (savedTheme) {
    setTheme(savedTheme === 'dark');
  } else {
    setTheme(prefersDark);
  }

  // Theme toggle click handler
  themeToggle?.addEventListener('click', () => {
    setTheme(document.body.classList.contains('light-theme'));
  });

  // Watch for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches);
    }
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Handle downloads
  document.querySelectorAll('.download-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const originalText = button.textContent;
      button.disabled = true;
      button.textContent = 'Downloading...';
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Implement actual download logic here
      } finally {
        button.disabled = false;
        button.textContent = originalText;
      }
    });
  });

  // Mobile navigation
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  hamburger?.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Form submission
  document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      form.reset();
      alert('Message sent successfully!');
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });

  // Form validation
  function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isValid = false;
        showError(input);
      } else {
        clearError(input);
      }
    });

    return isValid;
  }

  function showError(input) {
    const errorDiv = input.nextElementSibling || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = input.validationMessage;
    if (!input.nextElementSibling) {
      input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
  }

  // Counter animation
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const count = counter.querySelector('.count');
      const increment = target / 200;
      
      function updateCount() {
        const current = parseInt(count.innerText);
        if (current < target) {
          count.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, 10);
        } else {
          count.innerText = target;
        }
      }
      
      updateCount();
    });
  }

  // Initialize counter animation when in viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  });

  document.querySelectorAll('.impact-counter').forEach(counter => {
    observer.observe(counter);
  });
});
