// ========================
// SMOOTH SCROLLING
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const targetId = anchor.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ========================
// ACCESSIBILITY: KEYBOARD FOCUS
// ========================
document.addEventListener('keydown', event => {
  if (event.key === 'Tab') {
    document.body.classList.add('show-focus');
  }
});

// ========================
// SECTION REVEAL ANIMATIONS
// ========================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -120px 0px'
};


const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
  sectionObserver.observe(section);
});

// ========================
// ANIMATE SECTION CHILDREN
// ========================
const animateChildren = section => {
  const children = section.querySelectorAll(
    '.expertise-card, .skill-category, .hobby-item, .brand-item, .sponsor-item, .contact-link'
  );

  children.forEach((child, index) => {
    child.style.opacity = '0';
    child.style.transform = 'translateY(20px)';
    child.style.transition = `opacity 0.6s ease ${index * 0.05}s, transform 0.6s ease ${index * 0.05}s`;

    // Immediately animate if section is visible
    if (section.classList.contains('visible')) {
      requestAnimationFrame(() => {
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      });
    }
  });
};


document.querySelectorAll('.section').forEach(section => {
  const childObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateChildren(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -50px 0px' });

  childObserver.observe(section);
});


// ========================
// CUSTOM CURSOR
// ========================
const cursor = document.querySelector('.custom-cursor');
const ring = document.querySelector('.cursor-ring');

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.opacity = '1';
});

const animateCursor = () => {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursor.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
  requestAnimationFrame(animateCursor);
};

animateCursor();

document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor-active'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-active'));
});

// ========================
// METRIC COUNTER ANIMATION
// ========================
const counters = document.querySelectorAll('.metric-value');
const metricsSection = document.querySelector('.project-metrics');

const animateCounters = () => {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    let current = 0;

    const update = () => {
      current += Math.ceil(target / 100);
      if (current < target) {
        counter.textContent = `${current}%`;
        requestAnimationFrame(update);
      } else {
        counter.textContent = `${target}%`;
      }
    };

    update();
  });
};

if (metricsSection) {
  const metricsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      metricsObserver.disconnect();
    }
  }, { threshold: 0.4 });

  metricsObserver.observe(metricsSection);
}

window.addEventListener('load', () => {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('visible');
  });
});

// ========================
// MOBILE MENU TOGGLE
// ========================
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        if (navLinks.classList.contains('active')) {
          menuToggle.setAttribute('aria-expanded', 'false');
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  }
});
