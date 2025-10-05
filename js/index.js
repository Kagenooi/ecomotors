import {
    toggleActive,
    openSelect,
    close,
    chooseOption,
    closeMenu,
    closeMenuBtn,
    chooseLang,
    closeLang,
    toggleSearch,
    filterSelect,
    toggleFilter
} from "./module.js";

window.toggleFilter = toggleFilter;
window.filterSelect = filterSelect;
filterSelect();
window.toggleSearch = toggleSearch;
window.toggleActive = toggleActive;
window.openSelect = openSelect;
window.closeLang = closeLang;
closeLang();
window.close = close;
close();
window.closeMenu = closeMenu;
closeMenu();
window.chooseOption = chooseOption;
window.chooseLang = chooseLang;
window.closeMenuBtn = closeMenuBtn;

const productSwiper = new Swiper(".productSwiper", {
    loop: true,
    navigation: {
        nextEl: ".product__slider_btn.next",
        prevEl: ".product__slider_btn.prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    breakpoints: {
        768: {
            autoplay: false
        }
    }
});


if (document.body.clientWidth > 768) {
    const headerSubmenu = new Swiper(".header__submenu", {
        slidesPerView: 7,
        spaceBetween: 16,
    });
}

const headerSwiper = new Swiper(".headerSwiper", {
    loop: true,
    autoplay: true,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});

const partners = new Swiper("#partners", {
    loop: true,
    autoplay: true,
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
        768: {
            slidesPerView: 4,
        }
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