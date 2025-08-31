import {
    toggleActive,
    closeMenu,
    closeMenuBtn
} from "./module.js";

window.toggleActive = toggleActive;
window.closeMenu = closeMenu;
closeMenu();
window.closeMenuBtn = closeMenuBtn;



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