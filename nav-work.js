/**
 * Work nav — dropdown toggle (mobile) & accessibility
 */
document.addEventListener('DOMContentLoaded', () => {
  const workItems = document.querySelectorAll('.nav-item-work');
  if (!workItems.length) return;

  const mobileMq = window.matchMedia('(max-width: 768px)');

  workItems.forEach(item => {
    const trigger = item.querySelector('.nav-work-link');
    if (!trigger) return;

    const setOpen = open => {
      item.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    };

    trigger.addEventListener('click', e => {
      if (!mobileMq.matches) return;

      const isOpen = item.classList.contains('is-open');
      if (!isOpen) {
        e.preventDefault();
        workItems.forEach(other => {
          if (other !== item) {
            const otherTrigger = other.querySelector('.nav-work-link');
            other.classList.remove('is-open');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });
        setOpen(true);
      }
    });

    item.addEventListener('keydown', e => {
      if (e.key === 'Escape') setOpen(false);
    });
  });

  document.addEventListener('click', e => {
    if (!mobileMq.matches) return;
    workItems.forEach(item => {
      if (!item.contains(e.target)) {
        const trigger = item.querySelector('.nav-work-link');
        item.classList.remove('is-open');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
