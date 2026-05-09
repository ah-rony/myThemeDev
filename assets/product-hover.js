class CSProductCardHover {
  constructor(card) {
    this.card = card;
    this.image = card.querySelector('.cs-main-image');
    this.hoverImage = card.querySelector('.cs-hover-image');
    this.swatches = card.querySelectorAll('.cs-swatch');

    this.init();
  }

  init() {
    if (this.swatches.length) {
      this.setActive(this.swatches[0]);
    }

    this.swatches.forEach((swatch) => {
      swatch.addEventListener('click', () => {
        const img = swatch.dataset.main;

        if (img && img !== "undefined") {
          this.image.src = img;

          if (this.hoverImage) {
            this.hoverImage.src = img;
          }
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
  document.querySelectorAll('.cs-card').forEach(card => {
    new CSProductCardHover(card);
  });
});