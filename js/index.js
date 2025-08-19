import {
    toggleActive
} from "./module.js";

window.toggleActive = toggleActive;


const productSwiper = new Swiper(".productSwiper", {
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});