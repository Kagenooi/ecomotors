import {
    toggleActive,
    openSelect,
    closeSelect,
    chooseOption
} from "./module.js";

window.toggleActive = toggleActive;
window.openSelect = openSelect;
window.closeSelect = closeSelect;
closeSelect();
window.chooseOption = chooseOption;


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