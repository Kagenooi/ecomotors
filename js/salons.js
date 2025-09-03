import {
    toggleActive,
    closeMenu,
    closeMenuBtn,
    chooseLang,
    closeLang
} from "./module.js";

closeMenu();
window.closeLang = closeLang;
closeLang();
window.chooseLang = chooseLang;
document.querySelector('#defaultChecked').click();
document.querySelector('#defaultChecked2').click();

window.toggleActive = toggleActive; 
window.closeMenu = closeMenu;
window.closeMenuBtn = closeMenuBtn;

