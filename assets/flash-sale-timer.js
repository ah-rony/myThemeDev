class FlashSaleCountdown {
  constructor(timerEl) {
    this.el = timerEl;
    this.daysEl = timerEl.querySelector('.flash-sale-timer__timer-days');
    this.hoursEl = timerEl.querySelector('.flash-sale-timer__timer-hours');
    this.minutesEl = timerEl.querySelector('.flash-sale-timer__timer-minutes');
    this.secondsEl = timerEl.querySelector('.flash-sale-timer__timer-seconds');

    if (!this.daysEl || !this.hoursEl || !this.minutesEl || !this.secondsEl) return;

    this.totalSeconds =
      (parseInt(timerEl.dataset.days, 10) || 0) * 86400 +
      (parseInt(timerEl.dataset.hours, 10) || 0) * 3600 +
      (parseInt(timerEl.dataset.minutes, 10) || 0) * 60 +
      (parseInt(timerEl.dataset.seconds, 10) || 0);

    this.render();
    setTimeout(() => this.tick(), 1000);
  }

  pad(n) {
    return String(n).padStart(2, '0');
  }

  render() {
    const d = Math.floor(this.totalSeconds / 86400);
    const h = Math.floor((this.totalSeconds % 86400) / 3600);
    const m = Math.floor((this.totalSeconds % 3600) / 60);
    const s = this.totalSeconds % 60;
    this.daysEl.textContent = this.pad(d);
    this.hoursEl.textContent = this.pad(h);
    this.minutesEl.textContent = this.pad(m);
    this.secondsEl.textContent = this.pad(s);
  }

  tick() {
    if (this.totalSeconds <= 0) {
      this.render();
      return;
    }
    this.totalSeconds -= 1;
    this.render();
    setTimeout(() => this.tick(), 1000);
  }
}

class FlashSaleTabletParallax {
  constructor(sectionEl) {
    this.section = sectionEl;
    this.image = sectionEl.querySelector('.flash-sale-timer__right-col .flash-sale-timer__right-img');
    this.mediaQuery = window.matchMedia('(min-width: 48rem) and (max-width: 79.9375rem)');

    if (!this.image) return;

    this.supportsScrollTimeline = CSS.supports('animation-timeline', 'scroll()');

    if (!this.supportsScrollTimeline) {
      this.update = this.update.bind(this);
      this.update();
      window.addEventListener('scroll', this.update, { passive: true });
      window.addEventListener('resize', this.update);
    }
  }

  update() {
    if (!this.mediaQuery.matches) {
      this.image.style.transform = '';
      return;
    }

    const rect = this.section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const clamped = Math.max(0, Math.min(progress, 1));

    let translateX;
    if (clamped <= 0.5) {
      translateX = 50 - clamped * 100;
    } else {
      translateX = (clamped - 0.5) * 100;
    }

    this.image.style.transform = `translateX(${translateX}%)`;
  }
}

class FlashSaleTimer {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('.flash-sale-timer__timer').forEach((el) => {
      new FlashSaleCountdown(el);
    });

    const section = document.querySelector('.flash-sale-timer');
    if (section) {
      new FlashSaleTabletParallax(section);
    }
  }
}

new FlashSaleTimer();