import {
    toggleActive,
    openSelect,
    close,
    chooseOption,
    closeMenu,
    closeMenuBtn,
    chooseLang,
    closeLang,
    filterSelect,
    toggleSearch,
    toggleFilter
} from "./module.js";

window.toggleFilter = toggleFilter;
window.filterSelect = filterSelect;
filterSelect();
window.toggleSearch = toggleSearch;
window.toggleActive = toggleActive;
window.openSelect = openSelect;
window.close = close;
close();
closeMenu();
window.closeLang = closeLang;
closeLang();
window.chooseLang = chooseLang;
window.chooseOption = chooseOption;
window.closeMenuBtn = closeMenuBtn;

const productSwiper = new Swiper(".productSwiper", {
    loop: true,
    navigation: {
        nextEl: ".product__slider_btn.next",
        prevEl: ".product__slider_btn.prev",
    },
    pagination: {
        el: ".swiper-pagination",
    }
});


import {
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function () { adaptive() });


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


const choosemb = document.querySelector('#choosemb');
const chooseInps = choosemb.querySelectorAll('input');
chooseInps.forEach(element => {
    let activeEl;
    if (element.checked) {
        activeEl = element.id;
        choosemb.classList.remove('active');
    }
    element.addEventListener('change', function () {
        choosemb.classList.remove('active');
        if (this.dataset.id != activeEl && this.checked) {
            console.log(true);
            choosemb.classList.add('active');
        }
    })
});