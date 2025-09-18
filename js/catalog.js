import {
    toggleActive,
    openSelect,
    close,
    chooseOption,
    closeMenu,
    closeMenuBtn,
    chooseLang,
    filterSelect,
    closeLang,
    toggleSearch,
    toggleFilter
} from "./module.js";

window.toggleFilter = toggleFilter;
window.filterSelect = filterSelect;
filterSelect();

window.toggleActive = toggleActive;
window.openSelect = openSelect;
window.close = close;
window.toggleSearch = toggleSearch;
close();
closeMenu();
window.closeLang = closeLang;
closeLang();
window.chooseLang = chooseLang;
window.chooseOption = chooseOption;
window.closeMenuBtn = closeMenuBtn;


const productSwiper = new Swiper(".productSwiper", {
    loop: true,
    navigation: {
        nextEl: ".product__slider_btn.next",
        prevEl: ".product__slider_btn.prev",
    },
    pagination: {
        el: ".swiper-pagination",
    },
});


if (document.body.clientWidth > 768) {
    const recomended = new Swiper("#recomended", {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
            nextEl: ".recomended__slider_btn.next",
            prevEl: ".recomended__slider_btn.prev",
        }
    });
}


import {
    adaptive
} from "../adaptiveMode/adaptive.js";
window.adaptive = adaptive;
adaptive();
window.addEventListener('resize', function () { adaptive() });


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


function toggleSubfilter(sub) {
    let filter = document.querySelector(`#${sub}`);
    if (filter.style.maxHeight) {
        filter.style.maxHeight = null;
    } else {
        filter.style.maxHeight = filter.style.maxHeight + filter.scrollHeight + 'px';
    }
}
window.toggleSubfilter = toggleSubfilter;


/* touch-scroll (fixed: allow normal link clicks) */
(function () {
    const container = document.querySelector('.header__submenu_list') || document.querySelector('.header__submenu');
    if (!container) return;

    let pointerDown = false;
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let scrollStart = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let rafId = null;
    let startButton = null;
    let movedLeft = false;

    const THRESHOLD_DRAG_START = 6;
    const VELOCITY_STOP = 0.02;
    const FRAME_MS = 16;

    function now() { return performance.now(); }

    function onPointerDown(e) {
        startButton = (typeof e.button === 'number') ? e.button : 0;

        // allow browser handle non-left mouse buttons (middle/right)
        if (e.pointerType === 'mouse' && e.button !== 0) {
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

        // DO NOT call setPointerCapture here — it can interfere with click delivery.
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
                // start actual drag: capture pointer now (so we keep receiving moves)
                if (e.pointerId != null && container.setPointerCapture) {
                    try { container.setPointerCapture(e.pointerId); } catch (err) { }
                }
            } else if (Math.abs(dy) > THRESHOLD_DRAG_START && Math.abs(dy) > Math.abs(dx)) {
                // vertical scroll — abort our handling
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

        // horizontal dragging
        container.scrollLeft = scrollStart - dx;

        if (startButton === 0) {
            movedLeft = Math.abs(dx) > 5;
        }

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
        // If we never set pointerDown (e.g. non-left mouse button), allow native behaviour
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

        // reset movedLeft shortly after so normal clicks resume
        setTimeout(() => { movedLeft = false; }, 50);

        pointerDown = false;
        dragging = false;
        startButton = null;
        container.classList.remove('is-dragging');
    }

    // Remove click/auxclick interception so links behave normally.
    // (previous code blocked clicks when a drag had happened — we don't do that)

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
            onPointerMove({ clientX: t.clientX, clientY: t.clientY, pointerId: 'touch', cancelable: ev.cancelable });
        }, { passive: false });

        container.addEventListener('touchend', function () {
            onPointerUp({ pointerId: 'touch' });
        }, { passive: true });
    }
})();


const choosemb = document.querySelector('#choosemb');
const chooseInps = choosemb.querySelectorAll('input');
chooseInps.forEach(element => {
    let activeEl;
    if (element.checked) {
        activeEl = element.id;
        choosemb.classList.remove('active');
    }
    element.addEventListener('change', function () {
        choosemb.classList.remove('active');
        if (this.dataset.id != activeEl && this.checked) {
            console.log(true);
            choosemb.classList.add('active');
        }
    })
});