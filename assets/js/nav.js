document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.hamburger-toggle');
    const menu = document.querySelector('.main-menu');
    const backdrop = document.querySelector('.nav-backdrop');
    const closeBtn = document.querySelector('.menu-close');

    function openMenu(e) {
        e.preventDefault();
        menu.classList.add('is-open');
        backdrop.classList.add('is-open');
    }

    function closeMenu() {
        menu.classList.remove('is-open');
        backdrop.classList.remove('is-open');
    }

    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        menu.classList.toggle('is-open');
        backdrop.classList.toggle('is-open');
    });

    closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
});