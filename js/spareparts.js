import {
    toggleActive,
    openSelect,
    close,
    chooseOption,
    closeMenu,
    closeMenuBtn
} from "./module.js";

window.toggleActive = toggleActive;
window.openSelect = openSelect;
window.close = close;
close();
window.closeMenu = closeMenu;
closeMenu();
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