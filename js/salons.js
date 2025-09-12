import {
    toggleActive,
    closeMenu,
    closeMenuBtn,
    closeLang
} from "./module.js";


closeMenu();
window.closeLang = closeLang;
closeLang();

window.toggleActive = toggleActive; 
window.closeMenu = closeMenu;
window.closeMenuBtn = closeMenuBtn;

import { 
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function() {adaptive()});