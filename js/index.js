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