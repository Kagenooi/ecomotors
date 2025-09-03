import {
    toggleActive,
    closeMenu,
    closeMenuBtn,
    closeLang,
    chooseLang
} from "./module.js";

closeMenu();
window.closeLang = closeLang;
closeLang();
window.chooseLang = chooseLang;
document.querySelector('#defaultChecked').click();
document.querySelector('#defaultChecked2').click();

window.closeMenuBtn = closeMenuBtn;
window.toggleActive = toggleActive; 

import { 
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function() {adaptive()});