import {
    toggleActive,
    closeMenu,
    closeMenuBtn,
    closeLang
} from "./module.js";

window.toggleActive = toggleActive; 
closeMenu();
window.closeLang = closeLang;
closeLang();
window.closeMenuBtn = closeMenuBtn;

import { 
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function() {adaptive()});