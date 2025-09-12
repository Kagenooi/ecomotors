import {
    toggleActive,
    openSelect,
    close,
    chooseOption,
    closeMenu,
    closeMenuBtn,
    chooseLang,
    closeLang
} from "./module.js";

window.toggleActive = toggleActive;
window.openSelect = openSelect;
window.close = close;
close();
closeMenu();
window.closeLang = closeLang;
closeLang();
window.chooseLang = chooseLang;
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


function openFaq(btn) {
    let faq = btn.nextElementSibling;
    if (faq.style.maxHeight) {
        faq.style.maxHeight = null;
    } else {
        faq.style.maxHeight = faq.style.maxHeight + faq.scrollHeight + 'px';
    }
    btn.querySelector('.characters__faq_el_btn_txt').classList.toggle('active');
    btn.querySelector('.characters__faq_el_btn_icon').classList.toggle('active');
}
window.openFaq = openFaq;


(function () {
    const btn = document.getElementById('toTop');
    if (!btn) return;

    const SHOW_AFTER = 200;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Показ/скрытие при прокрутке
    const toggle = () => {
        if (window.scrollY > SHOW_AFTER) {
            btn.classList.add('is-visible');
        } else {
            btn.classList.remove('is-visible');
        }
    };

    // Клик — плавный скролл к верху
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReduced ? 'auto' : 'smooth'
        });
    });

    // Инициализация и слушатели
    window.addEventListener('scroll', toggle, { passive: true });
    window.addEventListener('load', toggle);
    toggle();
})();