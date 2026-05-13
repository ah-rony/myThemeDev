(function () {

  const GAP = window.innerWidth < 768 ? 12 : 0;

  document.querySelectorAll('[id^="sop-slider-"]').forEach(el => {
    const id     = el.id.replace('sop-slider-', '');
    const slider = el;
    const thumb  = document.getElementById('sop-thumb-' + id);
    if (!thumb) return;

    const track  = thumb.parentElement;
    const cards  = slider.querySelectorAll('.sop-latest-insights-card');
    const count  = cards.length;
    let current  = 0;
    let startX   = 0;
    let startY   = 0;
    let axisLock = null;

    // apply gap to cards
    cards.forEach(c => { c.style.marginRight = GAP + 'px'; });

    const slideWidth = () => slider.clientWidth + GAP;

    const goTo = index => {
      current = Math.max(0, Math.min(index, count - 1));
      slider.scrollTo({ left: slideWidth() * current, behavior: 'smooth' });
    };

    const updateScrollbar = () => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      const trackW    = track.offsetWidth;
      if (maxScroll <= 0 || !trackW) return (thumb.style.width = '100%', thumb.style.transform = 'none');
      const thumbW = Math.max(trackW * (slider.clientWidth / slider.scrollWidth), 24);
      thumb.style.width     = thumbW + 'px';
      thumb.style.transform = `translateX(${(slider.scrollLeft / maxScroll) * (trackW - thumbW)}px)`;
    };

    slider.addEventListener('scroll',     updateScrollbar, { passive: true });
    window.addEventListener('resize',     updateScrollbar);

    slider.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      axisLock = null;
    }, { passive: true });

    slider.addEventListener('touchmove', e => {
      if (axisLock === null) axisLock = Math.abs(e.touches[0].clientY - startY) > Math.abs(e.touches[0].clientX - startX);
      if (!axisLock) e.preventDefault();
    }, { passive: false });

    slider.addEventListener('touchend', e => {
      if (axisLock) return;
      const dx = e.changedTouches[0].clientX - startX;
      goTo(Math.abs(dx) > slider.clientWidth * 0.2 ? current + (dx < 0 ? 1 : -1) : current);
    });

    // sync index on native scroll
    let t;
    slider.addEventListener('scroll', () => {
      clearTimeout(t);
      t = setTimeout(() => { current = Math.round(slider.scrollLeft / slideWidth()); }, 150);
    }, { passive: true });

    requestAnimationFrame(() => requestAnimationFrame(updateScrollbar));
  });

})();