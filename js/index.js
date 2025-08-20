import {
    toggleActive
} from "./module.js";

window.toggleActive = toggleActive;


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