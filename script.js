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
// CUSTOM CURSOR (instant, GPU-accelerated)
// ========================
(() => {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const isLowPower =
    typeof navigator.hardwareConcurrency === 'number' &&
    navigator.hardwareConcurrency > 0 &&
    navigator.hardwareConcurrency < 4;

  if (prefersReducedMotion || isCoarsePointer || isLowPower) {
    document.body.classList.add('native-cursor');
    cursor.remove();
    return;
  }

  document.addEventListener(
    'mousemove',
    e => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (cursor.style.opacity !== '1') cursor.style.opacity = '1';
    },
    { passive: true }
  );

  document.addEventListener(
    'mouseleave',
    () => {
      cursor.style.opacity = '0';
    },
    { passive: true }
  );

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor-active'), { passive: true });
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-active'), { passive: true });
  });
})();

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
