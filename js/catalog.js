import {
    toggleActive,
    openSelect,
    close,
    chooseOption,
    closeMenu,
    closeMenuBtn,
    chooseLang,
    filterSelect,
    closeLang,
    toggleSearch,
    toggleFilter
} from "./module.js";

window.toggleFilter = toggleFilter;
window.filterSelect = filterSelect;
filterSelect();

window.toggleActive = toggleActive;
window.openSelect = openSelect;
window.close = close;
window.toggleSearch = toggleSearch;
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
    },
});


if (document.body.clientWidth > 768) {
    const recomended = new Swiper("#recomended", {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
            nextEl: ".recomended__slider_btn.next",
            prevEl: ".recomended__slider_btn.prev",
        }
    });
}


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


function toggleSubfilter(sub) {
    let filter = document.querySelector(`#${sub}`);
    if (filter.style.maxHeight) {
        filter.style.maxHeight = null;
    } else {
        filter.style.maxHeight = filter.style.maxHeight + filter.scrollHeight + 'px';
    }
}
window.toggleSubfilter = toggleSubfilter;


if (document.body.clientWidth > 768) {
    const headerSubmenu = new Swiper(".header__submenu", {
        slidesPerView: 7,
        spaceBetween: 16,
    });
}

const choosemb = document.querySelector('#choosemb');
const chooseInps = choosemb.querySelectorAll('input');
for (let i = 0; i < chooseInps.length; i++) {
    if (chooseInps[i].checked && i > 0) {
        choosemb.classList.add('active');
    } else {
        choosemb.classList.remove('active');
    }
    chooseInps[i].addEventListener('click', function () {
        if (chooseInps[i].checked && i > 0) {
            choosemb.classList.add('active');
        } else {
            choosemb.classList.remove('active');
        }
    })
}