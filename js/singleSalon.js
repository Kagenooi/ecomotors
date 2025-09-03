import {
    toggleActive,
    closeMenu,
    closeMenuBtn,
    chooseLang
} from "./module.js";

window.toggleActive = toggleActive; 
closeMenu();
window.closeLang = closeLang;
closeLang();
window.chooseLang = chooseLang;
document.querySelector('#defaultChecked').click();
document.querySelector('#defaultChecked2').click();
window.closeMenuBtn = closeMenuBtn;