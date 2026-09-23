document.querySelectorAll('.img_swiper').forEach(function (el) {
  new Swiper(el, {
    loop: true,
    pagination: {
      el: el.querySelector('.swiper-pagination'),
      clickable: true
    }
  });
});


const navCartbtn = document.getElementById("navCartBtn");

navCartbtn.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "checkout.html";
})




/* FAQ SECTION JS END */
(function () {
  var WORD_DELAY_MS = 50;
  var ANSWER_MAX_PX = 300;

  function buildWords(inner) {
    if (inner.dataset.rendered) return;
    var words = inner.dataset.text.trim().split(' ');
    inner.innerHTML = words.map(function (w) { return '<span class="word">' + w + '</span>'; }).join(' ');
    inner.dataset.rendered = 'true';
  }

  function animateWords(inner) {
    var spans = inner.querySelectorAll('.word');
    spans.forEach(function (s) { s.classList.remove('show'); });
    spans.forEach(function (span, i) {
      setTimeout(function () { span.classList.add('show'); }, i * WORD_DELAY_MS);
    });
  }

  function closeItem(item) {
    item.classList.remove('open');
    item.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    item.querySelector('.faq-a').style.maxHeight = '0';
  }

  function openItem(item) {
    var btn = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-a');
    var inner = item.querySelector('.faq-a-inner');
    buildWords(inner);
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    answer.style.maxHeight = ANSWER_MAX_PX + 'px';
    animateWords(inner);
  }

  function handleToggle(clickedBtn) {
    var clickedItem = clickedBtn.closest('.faq-item');
    var isOpen = clickedItem.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(closeItem);
    if (!isOpen) openItem(clickedItem);
  }

  function init() {
    var buttons = document.querySelectorAll('.faq-q');
    if (!buttons.length) return;
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () { handleToggle(btn); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
/* =========================================
  FAQ SECTION JS END
=========================================*/



(function () {

  /* ── Auto-update copyright year ──────────────────── */
  function setYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ── Init ─────────────────────────────────────────── */
  function init() {
    setYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();