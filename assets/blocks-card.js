class CSProductCard {
  constructor(card) {
    this.card = card;
    this.image = card.querySelector('.bc-main-image');
    this.swatches = card.querySelectorAll('.bc-swatch');

    this.init();
  }

  init() {
    this.swatches.forEach((swatch) => {
      swatch.addEventListener('click', () => {
        const img = swatch.dataset.main;

        if (img && img !== "undefined") {
          this.image.src = img;
        }

        this.setActive(swatch);
      });
    });
  }

  setActive(active) {
    this.swatches.forEach(s => s.classList.remove('is-active'));
    active.classList.add('is-active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.bc-card').forEach(card => {
    new CSProductCard(card);
  });
});