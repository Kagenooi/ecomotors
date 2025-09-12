import {
    toggleActive,
    closeMenu,
    closeMenuBtn,
    closeLang,
    chooseLang
} from "./module.js";

window.toggleActive = toggleActive;
window.closeMenuBtn = closeMenuBtn;
closeMenu();
window.closeLang = closeLang;
closeLang();
window.chooseLang = chooseLang;


const blogSlider = new Swiper("#blogSlider", {
    navigation: {
        nextEl: ".header__slider_btn.next",
        prevEl: ".header__slider_btn.prev",
    },
    // autoplay: true,
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