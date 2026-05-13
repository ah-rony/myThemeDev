(() => {

  /* ── Countdown timer ── */
  const timers = document.querySelectorAll(
    '.sop-flash-sale-timer .sop-timer'
  );

  timers.forEach((timer) => {

    const daysEl = timer.querySelector('.sop-timer-days');
    const hoursEl = timer.querySelector('.sop-timer-hours');
    const minutesEl = timer.querySelector('.sop-timer-minutes');
    const secondsEl = timer.querySelector('.sop-timer-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    let totalSeconds =
      (parseInt(timer.dataset.days, 10) || 0) * 86400 +
      (parseInt(timer.dataset.hours, 10) || 0) * 3600 +
      (parseInt(timer.dataset.minutes, 10) || 0) * 60 +
      (parseInt(timer.dataset.seconds, 10) || 0);

    const pad = (n) => String(n).padStart(2, '0');

    const updateDisplay = () => {

      const d = Math.floor(totalSeconds / 86400);
      const h = Math.floor((totalSeconds % 86400) / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      daysEl.textContent = pad(d);
      hoursEl.textContent = pad(h);
      minutesEl.textContent = pad(m);
      secondsEl.textContent = pad(s);
    };

    const tick = () => {

      if (totalSeconds <= 0) {
        updateDisplay();
        return;
      }

      totalSeconds -= 1;

      updateDisplay();

      setTimeout(tick, 1000);
    };

    updateDisplay();

    setTimeout(tick, 1000);

  });

})();



(() => {

  const section = document.querySelector(
    '.sop-flash-sale-timer'
  );

  if (!section) return;

  const image = section.querySelector(
    '.fst-right-col .sop-right-img'
  );

  if (!image) return;

  const mediaQuery = window.matchMedia(
    '(min-width: 48rem) and (max-width: 79.9375rem)'
  );

  const updateImagePosition = () => {

    if (!mediaQuery.matches) {
      image.style.transform = '';
      return;
    }

    const rect = section.getBoundingClientRect();

    const viewportHeight = window.innerHeight;

    const start = viewportHeight;
    const end = -rect.height;

    const progress =
      (start - rect.top) / (start - end);

    const clamped = Math.max(
      0,
      Math.min(progress, 1)
    );

    let translateX = 50;

    if (clamped <= 0.5) {

      translateX = 50 - (clamped * 100);

    } else {

      translateX = (clamped - 0.5) * 100;
    }

    image.style.transform =
      `translateX(${translateX}%)`;
  };

  updateImagePosition();

  window.addEventListener(
    'scroll',
    updateImagePosition,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    updateImagePosition
  );

})();