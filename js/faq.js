import {
    toggleActive,
    close,
    closeMenu,
    closeMenuBtn,
    chooseLang,
    closeLang,
    toggleSearch,
} from "./module.js";

window.toggleSearch = toggleSearch;
window.toggleActive = toggleActive;
window.closeLang = closeLang;
closeLang();
window.close = close;
close();
window.closeMenu = closeMenu;
closeMenu();
window.chooseLang = chooseLang;
window.closeMenuBtn = closeMenuBtn;

import {
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function () { adaptive() });


const faqs = document.querySelectorAll('.faq__item_btn');
faqs.forEach(element => {
    element.addEventListener('click', function () {
        let faqsacc = element.nextElementSibling;
        if (faqsacc.style.maxHeight) {
            faqsacc.style.maxHeight = null;
            element.classList.remove('active');
        } else {
            faqsacc.style.maxHeight = faqsacc.style.maxHeight + faqsacc.scrollHeight + 'px';
            element.classList.add('active');
        }
    })
})