/**
 * JioHotstar — Ad Operations Dashboard counters (page-scoped)
 */
(function () {
  const dashboard = document.querySelector('.jio-ops-dashboard');
  if (!dashboard) return;

  const counters = dashboard.querySelectorAll('[data-jio-count]');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 3);

  const runCounter = el => {
    const target = Number(el.dataset.jioCount);
    const suffix = el.dataset.jioSuffix || '';
    const prefix = el.dataset.jioPrefix || '';
    const duration = 1400;
    const start = performance.now();

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.round(target * easeOut(progress));
      el.textContent = `${prefix}${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = `${prefix}${target}${suffix}`;
    };

    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.35, rootMargin: '0px 0px -40px 0px' }
  );

  counters.forEach(counter => counterObserver.observe(counter));
})();
