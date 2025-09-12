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

window.closeMenuBtn = closeMenuBtn;
window.toggleActive = toggleActive; 

import { 
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function() {adaptive()});