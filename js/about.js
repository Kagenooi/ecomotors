import {
    toggleActive,
    closeMenu,
    closeMenuBtn,
    closeLang,
} from "./module.js";

closeMenu();
window.closeLang = closeLang;
closeLang();

window.closeMenuBtn = closeMenuBtn;
window.toggleActive = toggleActive; 

import { 
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function() {adaptive()});