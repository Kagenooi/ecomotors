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
closeMenu();
window.closeLang = closeLang;
closeLang();
window.chooseLang = chooseLang;
document.querySelector('#defaultChecked').click();
document.querySelector('#defaultChecked2').click();
window.chooseOption = chooseOption;
window.closeMenuBtn = closeMenuBtn;


const recomended = new Swiper("#recomended", {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
        nextEl: ".recomended__slider_btn.next",
        prevEl: ".recomended__slider_btn.prev",
    }
});


import { 
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function() {adaptive()});