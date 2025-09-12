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

window.toggleActive = toggleActive; 
window.closeMenu = closeMenu;
window.closeMenuBtn = closeMenuBtn;

import { 
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function() {adaptive()});