import {
    toggleActive,
    openSelect,
    close,
    chooseOption,
    closeMenu,
    closeMenuBtn,
    closeLang,
    toggleSearch,
    filterSelect
} from "./module.js";

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
window.closeMenuBtn = closeMenuBtn;

const productSwiper = new Swiper(".productSwiper", {
    loop: true,
    autoplay: true,
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
const headerSwiper = new Swiper(".headerSwiper", {
    loop: true,
    autoplay: true,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});

if (document.body.clientWidth > 768) {
    const partners = new Swiper("#partners", {
        loop: true,
        autoplay: true,
        slidesPerView: 4,
        spaceBetween: 30,
    });
}

import {
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function () { adaptive() });