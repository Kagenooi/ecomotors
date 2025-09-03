import {
    toggleActive,
    closeMenu,
    closeMenuBtn,
    chooseLang,
    closeLang
} from "./module.js";

window.toggleActive = toggleActive;
closeMenu();
window.closeLang = closeLang;
closeLang();
window.chooseLang = chooseLang;
document.querySelector('#defaultChecked').click();
document.querySelector('#defaultChecked2').click();
window.closeMenuBtn = closeMenuBtn;

import { 
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function() {adaptive()});