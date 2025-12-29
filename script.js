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
  rootMargin: '0px 0px -80px 0px'
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

    setTimeout(() => {
      if (section.classList.contains('visible')) {
        child.style.opacity = '1';
        child.style.transform = 'translateY(0)';
      }
    }, 100);
  });
};

document.querySelectorAll('.section').forEach(section => {
  const childObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateChildren(entry.target);
      }
    });
  }, { threshold: 0.1 });

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

// ========================
// 🌙 DARK / LIGHT MODE
// ========================
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  });
});


