import {
    toggleActive,
    openSelect,
    close,
    chooseOption,
    closeMenu,
    closeMenuBtn,
    closeLang
} from "./module.js";

window.toggleActive = toggleActive;
window.openSelect = openSelect;
window.close = close;
close();
closeMenu();
window.closeLang = closeLang;
closeLang();
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

const swiper = new Swiper("#gallery", {
    spaceBetween: 8,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
});
const swiper2 = new Swiper("#gallery2", {
    spaceBetween: 8,
    loop: true,
    navigation: {
        nextEl: ".singleproduct__gallery_btn.next",
        prevEl: ".singleproduct__gallery_btn.prev",
    },
    thumbs: {
        swiper: swiper,
    },
});

function currencyToggle(select) {
    let content = document.querySelector(`#${select}`);
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.style.maxHeight + content.scrollHeight + 'px';
    }
}
window.currencyToggle = currencyToggle;


const select = document.querySelector('.currency');
document.addEventListener('click', (event) => {
    if (!select) return;
    if (!select.contains(event.target)) {
        select.querySelector('#currencySelect').style.maxHeight = null;
    }
});

function chooseCurrency(btn, hiddenInp) {
    document.querySelector(`#${hiddenInp}`).value = btn.value;
    document.querySelector('.header__price_select_btn_txt').innerHTML = btn.value;
    document.querySelector('#currencySelect').style.maxHeight = null;
}
window.chooseCurrency = chooseCurrency;

import {
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function () { adaptive() });