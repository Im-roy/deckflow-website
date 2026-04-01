/**
 * content-renderer.js
 * Fetches data/content.json and populates every section of the page.
 * To update any copy, edit data/content.json — no HTML changes needed.
 */

(async () => {
  /* ── 1. Load content ────────────────────────────────────────── */
  let c;
  try {
    const res = await fetch('./data/content.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    c = await res.json();
  } catch (err) {
    console.error('[Deckflow] Failed to load content.json:', err);
    return;
  }

  /* ── 2. Helpers ─────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /** Set textContent safely */
  function text(sel, value, ctx = document) {
    const el = $(sel, ctx);
    if (el) el.textContent = value;
  }

  /** Set innerHTML safely (use only for trusted JSON content) */
  function html(sel, value, ctx = document) {
    const el = $(sel, ctx);
    if (el) el.innerHTML = value;
  }

  /* ── 3. META ────────────────────────────────────────────────── */
  document.title = c.meta.title;
  $('meta[name="description"]')?.setAttribute('content', c.meta.description);
  $('meta[property="og:title"]')?.setAttribute('content', c.meta.ogTitle);
  $('meta[property="og:description"]')?.setAttribute('content', c.meta.ogDescription);
  $('meta[name="twitter:title"]')?.setAttribute('content', c.meta.ogTitle);
  $('meta[name="twitter:description"]')?.setAttribute('content', c.meta.ogDescription);

  /* ── 4. NAV ─────────────────────────────────────────────────── */
  $$('[data-brand]').forEach(el => (el.textContent = c.nav.brand));
  $$('[data-tagline]').forEach(el => (el.textContent = c.nav.tagline));
  $$('[data-nav-cta]').forEach(el => (el.textContent = c.nav.cta));

  const navEl = $('[data-render="navLinks"]');
  if (navEl) {
    navEl.innerHTML = c.nav.links
      .map(link => `<a href="${link.href}">${link.label}</a>`)
      .join('');
  }

  /* ── 5. HERO — static copy ──────────────────────────────────── */
  text('[data-content="hero.eyebrow"]',      c.hero.eyebrow);
  html('[data-content="hero.headline"]',     c.hero.headline);
  text('[data-content="hero.subheadline"]',  c.hero.subheadline);
  $$('[data-content="hero.cta"]').forEach(el => (el.textContent = c.hero.cta));
  text('[data-content="hero.microcopy"]',    c.hero.microcopy);

  /* ── 6. HERO — proof cards ──────────────────────────────────── */
  const proofWrap = $('[data-render="proofCards"]');
  if (proofWrap) {
    proofWrap.innerHTML = c.hero.proofCards.map(card => `
      <article class="proof-card" role="listitem">
        <div class="proof-card__icon" aria-hidden="true">${card.icon}</div>
        <h2>${card.title}</h2>
        <p>${card.description}</p>
      </article>
    `).join('');
  }

  /* ── 7. HERO — carousel slides ─────────────────────────────── */
  const track = $('[data-render="slides"]');
  if (track) {
    track.innerHTML = c.hero.slides.map((slide, i) => `
      <article
        class="slide-card ${slide.colorClass}"
        role="group"
        aria-roledescription="slide"
        aria-label="Slide ${i + 1} of ${c.hero.slides.length}"
        id="slide-${i + 1}"
      >
        <div class="slide-card__surface">
          <span class="slide-card__tag">${slide.tag}</span>
          <h3>${slide.title}</h3>
          <p>${slide.description}</p>
          <div class="slide-card__mock" aria-hidden="true">
            <span></span><span></span>
            <div class="mini-grid"><i></i><i></i></div>
          </div>
        </div>
      </article>
    `).join('');
  }

  /* ── 8. HERO — carousel dots ────────────────────────────────── */
  const dotsWrap = $('[data-render="dots"]');
  if (dotsWrap) {
    dotsWrap.innerHTML = c.hero.slides.map((_, i) => `
      <button
        class="carousel__dot${i === 0 ? ' carousel__dot--active' : ''}"
        role="tab"
        aria-selected="${i === 0}"
        aria-controls="slide-${i + 1}"
        data-index="${i}"
        id="dot-${i}"
        aria-label="Slide ${i + 1}"
      ></button>
    `).join('');
  }

  /* ── 9. PROBLEM / SOLUTION ──────────────────────────────────── */
  text('[data-content="ps.eyebrow"]',  c.problemSolution.eyebrow);
  text('[data-content="ps.headline"]', c.problemSolution.headline);
  text('[data-content="ps.subtext"]',  c.problemSolution.subtext);

  // Problems card
  text('[data-content="ps.problems.badge"]', c.problemSolution.problems.badge);
  text('[data-content="ps.problems.title"]', c.problemSolution.problems.title);
  const problemsList = $('[data-render="problems"]');
  if (problemsList) {
    problemsList.innerHTML = c.problemSolution.problems.items.map(item => `
      <li>
        <span class="feature-list__icon" aria-hidden="true">${item.icon}</span>
        ${item.text}
      </li>
    `).join('');
  }

  // Solution card
  text('[data-content="ps.solution.badge"]', c.problemSolution.solution.badge);
  text('[data-content="ps.solution.title"]', c.problemSolution.solution.title);
  const solutionList = $('[data-render="solutions"]');
  if (solutionList) {
    solutionList.innerHTML = c.problemSolution.solution.items.map(item => `
      <li>
        <span class="feature-list__icon" aria-hidden="true">${item.icon}</span>
        ${item.text}
      </li>
    `).join('');
  }

  /* ── 10. FOOTER CTA ─────────────────────────────────────────── */
  text('[data-content="footerCta.eyebrow"]', c.footerCta.eyebrow);
  text('[data-content="footerCta.headline"]', c.footerCta.headline);
  text('[data-content="footerCta.subtext"]',  c.footerCta.subtext);
  text('[data-content="footerCta.cta"]',      c.footerCta.cta);
  text('[data-content="footerCta.note"]',     c.footerCta.note);

  /* ── 11. FOOTER ─────────────────────────────────────────────── */
  text('[data-content="footer.copyright"]', c.footer.copyright);

  /* ── 12. Init carousel (after slides are in the DOM) ────────── */
  initCarousel();
})();

/* ── Carousel initializer ───────────────────────────────────── */
function initCarousel() {
  const track    = document.getElementById('carousel-track');
  const carousel = document.getElementById('slide-carousel');
  if (!track || !carousel) return;

  // Dots are rendered dynamically, query after render
  const getDots = () => [...document.querySelectorAll('.carousel__dot')];
  const TOTAL   = document.querySelectorAll('[data-render="dots"]')[0]
    ? document.querySelectorAll('.carousel__dot').length
    : 3;

  let current = 0;
  let timer;

  function goTo(index) {
    const dots = getDots();
    current = (index + dots.length) % dots.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('carousel__dot--active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  }

  function start() { timer = setInterval(() => goTo(current + 1), 3800); }
  function reset() { clearInterval(timer); start(); }

  // Delegate dot clicks (dots may not exist yet when this runs)
  carousel.addEventListener('click', e => {
    const dot = e.target.closest('.carousel__dot');
    if (dot) { goTo(parseInt(dot.dataset.index, 10)); reset(); }
  });

  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin',    () => clearInterval(timer));
  carousel.addEventListener('focusout',   start);

  carousel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); reset(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); reset(); }
  });

  start();
}
