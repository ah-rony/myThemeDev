class ProductCard {
  constructor(card) {
    this.card = card;
    this.image = card.querySelector('.product-main-image');
    this.swatches = card.querySelectorAll('.color-swatch, .image-swatch');

    this.init();
  }

  init() {
    this.swatches.forEach(swatch => {
      swatch.addEventListener('click', () => this.handleClick(swatch));
    });
  }

  handleClick(swatch) {
    const newImage = swatch.dataset.image;

    if (newImage && this.image) {
      this.image.src = newImage;
    }

    this.swatches.forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');
  }
}


// INIT PRODUCT CARDS
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.product-card').forEach(card => {
    new ProductCard(card);
  });
});