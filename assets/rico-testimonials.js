(function () {

  function initTestimonials() {

    const sections = document.querySelectorAll('.sop-testimonials');

    if (!sections.length) return;

    sections.forEach((section) => {

      const slider = section.querySelector('.sop-testimonials__swiper');

      if (!slider) return;

      new Swiper(slider, {
        loop: section.dataset.loop === 'true',

        speed: Number(section.dataset.speed || 600),

        autoplay: section.dataset.autoplay === 'true'
          ? {
              delay: Number(section.dataset.autoplayDelay || 4000),
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }
          : false,

        slidesPerView: 1,
        spaceBetween: 0,

        pagination: {
          el: section.querySelector('.sop-testimonials__pagination'),
          clickable: true
        },

        navigation: {
          prevEl: section.querySelector('.sop-testimonials__prev'),
          nextEl: section.querySelector('.sop-testimonials__next')
        }
      });

    });

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonials);
  } else {
    initTestimonials();
  }

})();