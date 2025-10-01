import {
    toggleActive,
    closeMenu,
    closeMenuBtn,
    closeLang,
    chooseLang,
    toggleSearch
} from "./module.js";

window.toggleActive = toggleActive;
window.closeMenuBtn = closeMenuBtn;
closeMenu();
window.closeLang = closeLang;
closeLang();
window.chooseLang = chooseLang;
window.toggleSearch = toggleSearch;


const blogSlider = new Swiper("#blogSlider", {
    navigation: {
        nextEl: ".header__slider_btn.next",
        prevEl: ".header__slider_btn.prev",
    },
    autoplay: true,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
    },
});

import { 
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function() {adaptive()});


(function () {
    const btn = document.getElementById('toTop');
    if (!btn) return;

    const SHOW_AFTER = 200;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Показ/скрытие при прокрутке
    const toggle = () => {
        if (window.scrollY > SHOW_AFTER) {
            btn.classList.add('is-visible');
        } else {
            btn.classList.remove('is-visible');
        }
    };

    // Клик — плавный скролл к верху
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReduced ? 'auto' : 'smooth'
        });
    });

    // Инициализация и слушатели
    window.addEventListener('scroll', toggle, { passive: true });
    window.addEventListener('load', toggle);
    toggle();
})();