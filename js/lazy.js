function initLazyLoadNoCss(options = {}) {
    const {
        selector = 'img[data-src], img[data-srcset], picture source[data-srcset]',
        root = null,
        rootMargin = '0px 0px 200px 0px',
        threshold = 0.01,
        observeMutations = true,
        enableBackground = false
    } = options;

    const queryElements = () => Array.from(document.querySelectorAll(selector));

    function applyToImage(img) {
        if (!img || img.nodeType !== 1) return;
        const ds = img.getAttribute('data-src');
        const dss = img.getAttribute('data-srcset');

        if (dss) {
            img.setAttribute('srcset', dss);
            img.removeAttribute('data-srcset');
        }
        if (ds) {
            img.setAttribute('src', ds);
            img.removeAttribute('data-src');
        }
    }

    function applyToSource(source) {
        const dss = source.getAttribute('data-srcset');
        if (dss) {
            source.setAttribute('srcset', dss);
            source.removeAttribute('data-srcset');
        }
    }

    function applyBackground(el) {
        if (!enableBackground) return;
        const url = el.getAttribute('data-bg');
        if (url) {
            // inline style only — не используем внешние CSS или классы
            el.style.backgroundImage = `url("${url}")`;
            el.removeAttribute('data-bg');
        }
    }

    function loadElement(el) {
        if (!el) return;
        if (el.tagName === 'IMG') {
            // поддержка <picture> — сначала обновим источники внутри picture (если есть)
            const picture = el.closest && el.closest('picture');
            if (picture) {
                picture.querySelectorAll('source[data-srcset]').forEach(applyToSource);
            }
            applyToImage(el);
            return;
        }

        if (el.tagName === 'SOURCE') {
            applyToSource(el);
            return;
        }

        // фоновый блок (опционально)
        if (enableBackground && el.hasAttribute && el.hasAttribute('data-bg')) {
            applyBackground(el);
            return;
        }
    }

    // Сразу подгрузить все (фоллбек)
    function loadAllImmediately() {
        // image/source selector + optional background selector
        const sel = enableBackground ? `${selector}, [data-bg]` : selector;
        Array.from(document.querySelectorAll(sel)).forEach(loadElement);
    }

    let io = null;
    if ('IntersectionObserver' in window) {
        io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting || entry.intersectionRatio > 0) {
                    loadElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { root, rootMargin, threshold });
    }

    function observeAll() {
        const sel = enableBackground ? `${selector}, [data-bg]` : selector;
        const items = Array.from(document.querySelectorAll(sel));
        if (!items.length) return;
        if (!io) {
            // если нет IntersectionObserver — сразу подгружаем
            items.forEach(loadElement);
            return;
        }
        items.forEach(item => {
            // если у img уже есть src/srcset — пропускаем (чтобы не перезаписывать)
            if (item.tagName === 'IMG') {
                if (item.getAttribute('src') || item.getAttribute('srcset')) return;
            }
            if (item.tagName === 'SOURCE') {
                if (item.getAttribute('srcset')) return;
            }
            if (enableBackground && item.hasAttribute && item.hasAttribute('data-bg')) {
                // наблюдаем
            }
            io.observe(item);
        });
    }

    // Опциональный MutationObserver для динамических вставок
    let mo = null;
    if (observeMutations && 'MutationObserver' in window) {
        mo = new MutationObserver(mutations => {
            for (const m of mutations) {
                if (!m.addedNodes || !m.addedNodes.length) continue;
                m.addedNodes.forEach(node => {
                    if (node.nodeType !== 1) return;
                    // сам узел подходит
                    if (node.matches && node.matches(selector)) {
                        if (io) io.observe(node);
                        else loadElement(node);
                    }
                    // и его потомки
                    if (node.querySelectorAll) {
                        const sel = enableBackground ? `${selector}, [data-bg]` : selector;
                        node.querySelectorAll(sel).forEach(child => {
                            if (io) io.observe(child);
                            else loadElement(child);
                        });
                    }
                });
            }
        });
        mo.observe(document.documentElement || document.body, { childList: true, subtree: true });
    }

    function disconnect() {
        if (io) io.disconnect();
        if (mo) mo.disconnect();
    }

    // Автоматически стартуем когда DOM готов
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        observeAll();
    } else {
        document.addEventListener('DOMContentLoaded', observeAll, { once: true });
    }

    return { observeAll, disconnect };
}

export default initLazyLoadNoCss;