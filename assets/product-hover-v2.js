class CSProductCardHoverv2 {
  constructor(card) {
    this.card = card;
    this.image = card.querySelector('.cs-v2-main-image');
    this.hoverImage = card.querySelector('.cs-v2-hover-image');
    this.swatches = card.querySelectorAll('.cs-v2-swatch');

    this.init();
  }

  init() {
    if (!this.image || !this.swatches.length) return;

    this.setActive(this.swatches[0]);

    this.swatches.forEach((swatch) => {
      swatch.addEventListener('click', () => {
        const mainImg = swatch.dataset.main;
        const hoverImg = swatch.dataset.hover;

        if (mainImg) {
          this.image.src = mainImg;
        }

        if (this.hoverImage && hoverImg) {
          this.hoverImage.src = hoverImg;
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
  const modal = document.getElementById('csQuickView');

  if (!modal) {
    console.error("Quickview modal missing");
    return;
  }

  const openModal = () => modal.classList.add('active');
  const closeModal = () => modal.classList.remove('active');

  const formatPrice = (cents) => {
    return (cents / 100).toFixed(2);
  };

  // ✅ EVENT DELEGATION (FIX SWIPER ISSUE)
  document.body.addEventListener('click', async (e) => {
    const btn = e.target.closest('.cs-v2-quickview-btn');

    if (!btn) return;

    e.preventDefault();

    const handle = btn.dataset.handle;
    if (!handle) {
      console.error("Missing handle");
      return;
    }

    try {
      const res = await fetch(`/products/${handle}.js`);
      const product = await res.json();

      modal.querySelector('.qv-image').src = product.images?.[0] || '';
      modal.querySelector('.qv-title').innerText = product.title || '';
      modal.querySelector('.qv-price').innerText = formatPrice(product.price || 0);
      modal.querySelector('.qv-desc').innerText =
        product.description
          ? product.description.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
          : '';

      modal.querySelector('.qv-btn').href = `/products/${handle}`;

      openModal();

    } catch (err) {
      console.error("Quickview error:", err);
    }
  });

  // CLOSE
  modal.querySelector('.cs-v2-qv-close')?.addEventListener('click', closeModal);
  modal.querySelector('.cs-v2-quickview-overlay')?.addEventListener('click', closeModal);
});



// upward size bar
class CSSizeDropdown {
  constructor(card) {
    this.dropdown = card.querySelector('.cs-v2-size-dropdown');
    if (!this.dropdown) return;

    this.selected = this.dropdown.querySelector('.cs-v2-size-selected');
    this.options = this.dropdown.querySelectorAll('.cs-v2-size-option');

    this.init();
  }

  init() {
    this.selected.addEventListener('click', (e) => {
      e.stopPropagation();

      document.querySelectorAll('.cs-v2-size-dropdown').forEach(d => {
        if (d !== this.dropdown) d.classList.remove('active');
      });

      this.dropdown.classList.toggle('active');
    });

    this.options.forEach(opt => {
      opt.addEventListener('click', () => {
        this.selected.textContent = opt.textContent;
        this.selected.dataset.id = opt.dataset.id;
        this.dropdown.classList.remove('active');
      });
    });
  }
}



  


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cs-v2-card').forEach(card => {
    new CSProductCardHoverv2(card);
     new CSSizeDropdown(card); 
  });
});