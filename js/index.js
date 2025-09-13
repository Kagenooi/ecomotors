import {
    toggleActive,
    openSelect,
    close,
    chooseOption,
    closeMenu,
    closeMenuBtn,
    chooseLang,
    closeLang,
    toggleSearch,
    filterSelect
} from "./module.js";

window.filterSelect = filterSelect;
filterSelect();
window.toggleSearch = toggleSearch;
window.toggleActive = toggleActive;
window.openSelect = openSelect;
window.closeLang = closeLang;
closeLang();
window.close = close;
close();
window.closeMenu = closeMenu;
closeMenu();
window.chooseOption = chooseOption;
window.chooseLang = chooseLang;
window.closeMenuBtn = closeMenuBtn;

document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll("img");

    lazyImages.forEach(element => {
       element.classList.add('lazy');
    });
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
});

const productSwiper = new Swiper(".productSwiper", {
    loop: true,
    navigation: {
        nextEl: ".product__slider_btn.next",
        prevEl: ".product__slider_btn.prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
    breakpoints: {
        768: {
            autoplay: false
        }
    }
});
const headerSwiper = new Swiper(".headerSwiper", {
    loop: true,
    autoplay: true,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});

const partners = new Swiper("#partners", {
    loop: true,
    autoplay: true,
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
        768: {
            slidesPerView: 4,
        }
    }
});

import {
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function () { adaptive() });



/* touch-scroll (updated to allow middle-button autoscroll) */
(function () {
    const container = document.querySelector('.header__submenu_list') || document.querySelector('.header__submenu');
    if (!container) return;

    // keep most logic same as before but track which mouse button started the interaction
    let pointerDown = false;
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let scrollStart = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let rafId = null;

    // NEW: track which button started the interaction (0 = left, 1 = middle, 2 = right)
    let startButton = null;
    // NEW: only treat left-button drags as "moved for click-block"
    let movedLeft = false;

    const THRESHOLD_DRAG_START = 6;
    const VELOCITY_STOP = 0.02;
    const FRAME_MS = 16;

    function now() { return performance.now(); }

    function onPointerDown(e) {
        // remember which button started
        startButton = (typeof e.button === 'number') ? e.button : 0;

        // If it's a mouse event and NOT left button, bail out early so browser handles middle-click autoscroll
        if (e.pointerType === 'mouse' && e.button !== 0) {
            // don't set pointerDown / capture — allow browser native behavior (autoscroll etc.)
            startButton = e.button;
            return;
        }

        pointerDown = true;
        dragging = false;
        movedLeft = false;
        startX = e.clientX;
        startY = e.clientY;
        scrollStart = container.scrollLeft;
        lastX = e.clientX;
        lastTime = now();
        velocity = 0;

        if (e.pointerId != null && container.setPointerCapture) {
            try { container.setPointerCapture(e.pointerId); } catch (err) { }
        }
        container.classList.add('is-dragging');
    }

    function onPointerMove(e) {
        if (!pointerDown) return;

        const x = e.clientX;
        const y = e.clientY;
        const dx = x - startX;
        const dy = y - startY;

        if (!dragging) {
            if (Math.abs(dx) > THRESHOLD_DRAG_START && Math.abs(dx) > Math.abs(dy)) {
                dragging = true;
            } else if (Math.abs(dy) > THRESHOLD_DRAG_START && Math.abs(dy) > Math.abs(dx)) {
                // vertical scroll: abort our handling so page scrolls naturally
                pointerDown = false;
                container.classList.remove('is-dragging');
                if (e.pointerId != null && container.releasePointerCapture) {
                    try { container.releasePointerCapture(e.pointerId); } catch (err) { }
                }
                return;
            } else {
                return;
            }
        }

        // We're dragging horizontally. Prevent default to avoid horizontal bounce.
        if (e.cancelable) e.preventDefault?.();

        container.scrollLeft = scrollStart - dx;

        // Only count movedLeft if the drag was started by left button (startButton === 0)
        if (startButton === 0) {
            movedLeft = Math.abs(dx) > 5;
        }

        // velocity px/ms
        const t = now();
        const dt = Math.max(1, t - lastTime);
        velocity = (x - lastX) / dt;
        lastX = x;
        lastTime = t;
    }

    function applyMomentum(initialVelocity) {
        let v = initialVelocity;
        if (rafId) cancelAnimationFrame(rafId);
        function step() {
            v *= 0.95;
            container.scrollLeft -= v * FRAME_MS;
            if (Math.abs(v) > VELOCITY_STOP) {
                rafId = requestAnimationFrame(step);
            } else {
                rafId = null;
            }
        }
        rafId = requestAnimationFrame(step);
    }

    function onPointerUp(e) {
        // If pointerUp corresponds to a middle-click that we didn't handle (we returned early on down),
        // startButton will be non-zero and pointerDown may be false — just allow native behavior.
        if (!pointerDown && startButton !== 0) {
            startButton = null;
            return;
        }

        if (e.pointerId != null && container.releasePointerCapture) {
            try { container.releasePointerCapture(e.pointerId); } catch (err) { }
        }

        if (dragging && Math.abs(velocity) > 0.02) {
            applyMomentum(velocity);
        }

        // reset movedLeft shortly after so clicks resume normal behavior
        setTimeout(() => { movedLeft = false; }, 50);

        pointerDown = false;
        dragging = false;
        startButton = null;
        container.classList.remove('is-dragging');
    }

    // Only block plain left-clicks when a left-button drag actually happened.
    container.addEventListener('click', function (ev) {
        // allow middle / right / modifier clicks to pass
        if (ev.button !== 0 || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey) return;

        if (movedLeft) {
            ev.preventDefault();
            ev.stopPropagation();
        }
    }, true);

    // Do not block auxiliary clicks (middle click autoscroll / open-in-new-tab)
    container.addEventListener('auxclick', function () { /* intentionally empty */ }, true);

    if (window.PointerEvent) {
        container.addEventListener('pointerdown', onPointerDown, { passive: false });
        window.addEventListener('pointermove', onPointerMove, { passive: false });
        window.addEventListener('pointerup', onPointerUp, { passive: false });
        window.addEventListener('pointercancel', onPointerUp, { passive: false });
    } else {
        // Touch fallback
        container.addEventListener('touchstart', function (ev) {
            const t = ev.touches[0];
            onPointerDown({ clientX: t.clientX, clientY: t.clientY, pointerType: 'touch', button: 0, pointerId: 'touch' });
        }, { passive: true });

        container.addEventListener('touchmove', function (ev) {
            const t = ev.touches[0];
            onPointerMove({ clientX: t.clientX, clientY: t.clientY, pointerId: 'touch', cancelable: ev.cancelable, preventDefault: () => ev.preventDefault() });
        }, { passive: false });

        container.addEventListener('touchend', function () {
            onPointerUp({ pointerId: 'touch' });
        }, { passive: true });
    }
})();


(function () {
    const btn = document.getElementById('toTop');
    if (!btn) return;

    const SHOW_AFTER = 200;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Показ/скрытие при прокрутке
    const toggle = () => {
        if (window.scrollY > SHOW_AFTER) {
            btn.classList.add('is-visible');
        } else {
            btn.classList.remove('is-visible');
        }
    };

    // Клик — плавный скролл к верху
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReduced ? 'auto' : 'smooth'
        });
    });

    // Инициализация и слушатели
    window.addEventListener('scroll', toggle, { passive: true });
    window.addEventListener('load', toggle);
    toggle();
})();
