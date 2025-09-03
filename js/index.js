import {
    toggleActive,
    openSelect,
    close,
    chooseOption,
    closeMenu,
    closeMenuBtn,
    chooseLang
} from "./module.js";

window.toggleActive = toggleActive;
window.openSelect = openSelect;
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
});
const headerSwiper = new Swiper(".headerSwiper", {
    loop: true,
    autoplay: true,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});


import { 
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function() {adaptive()});