/* ================================================================
   CAROUSEL — Auto-play, dot navigation, keyboard & a11y support
   ================================================================ */

(() => {
  const track    = document.getElementById('carousel-track');
  const dots     = document.querySelectorAll('.carousel__dot');
  const carousel = document.getElementById('slide-carousel');
  const TOTAL    = dots.length;
  let   current  = 0;
  let   timer;

  function goTo(index) {
    current = (index + TOTAL) % TOTAL;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('carousel__dot--active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  }

  function startAutoPlay() {
    timer = setInterval(() => goTo(current + 1), 3800);
  }

  function resetAutoPlay() {
    clearInterval(timer);
    startAutoPlay();
  }

  // Dot click
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index, 10));
      resetAutoPlay();
    });
  });

  // Pause on hover / focus (accessibility)
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', startAutoPlay);
  carousel.addEventListener('focusin',    () => clearInterval(timer));
  carousel.addEventListener('focusout',   startAutoPlay);

  // Keyboard arrow navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); resetAutoPlay(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); resetAutoPlay(); }
  });

  startAutoPlay();
})();
