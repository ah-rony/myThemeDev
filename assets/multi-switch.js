class Tabs {
  constructor(section) {
    this.section = section;
    this.buttons = section.querySelectorAll('.tab-btn');
    this.contents = section.querySelectorAll('.tab-content');

    this.init();
  }

  init() {
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => this.switchTab(btn));
    });
  }

  switchTab(btn) {
    const target = btn.dataset.tab;

    this.buttons.forEach(b => b.classList.remove('active'));
    this.contents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    this.section.querySelector('#' + target).classList.add('active');
  }
}


class Slider {
  constructor(container) {
    this.container = container;
    this.init();
  }

  init() {
    new Swiper(this.container, {
      slidesPerView: 1,
      spaceBetween: 15,
      navigation: {
        nextEl: this.container.querySelector('.swiper-button-next'),
        prevEl: this.container.querySelector('.swiper-button-prev'),
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 }
      }
    });
  }
}


// INIT EVERYTHING
document.addEventListener('DOMContentLoaded', function () {

  document.querySelectorAll('.multi-switch-section').forEach(section => {
    new Tabs(section);
  });

  document.querySelectorAll('.swiper').forEach(el => {
    new Slider(el);
  });

});