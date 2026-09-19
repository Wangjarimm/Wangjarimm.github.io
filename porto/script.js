// Modern Portfolio Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinkItems = document.querySelectorAll('.nav-link');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navLinks.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close mobile menu when clicking any nav link
    navLinkItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Active Navigation Spy on Scroll
  const sections = document.querySelectorAll('section[id]');

  const scrollSpy = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);

  // 3. Theme Toggle (Dark / Light)
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('porto-theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('porto-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
      if (theme === 'light') {
        icon.className = 'fa-solid fa-moon';
      } else {
        icon.className = 'fa-solid fa-sun';
      }
    }
  }

  // 4. Copy Email to Clipboard
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  const toastNotification = document.getElementById('copyToast');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'gaizkawisnuuu@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email ${email} disalin ke clipboard!`);
      }).catch(err => {
        console.error('Gagal menyalin:', err);
      });
    });
  });

  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  }

  // 5. Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. Smooth Scroll for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
