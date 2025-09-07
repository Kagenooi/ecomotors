export function adaptive() {
    const wrapper = document.querySelector('#adaptive');
    let zoom = document.body.clientWidth / 19.2 / 100;
    if (document.body.clientWidth > 1281 && document.body.clientWidth < 1630) {
        zoom = document.body.clientWidth / 16.3 / 100;
    }
    if (document.body.clientWidth > 768 && document.body.clientWidth < 1281) {
        zoom = document.body.clientWidth / 11.5 / 100;
    }
    if (document.body.clientWidth < 769) {
        zoom = document.body.clientWidth / 3.2 / 100;
    }
    wrapper.style.zoom = zoom;

    if (document.body.clientWidth < 769) {
        // сохраняем значение zoom для других частей кода (удобно)
        wrapper.dataset.zoom = String(zoom);

        // --- корректируем модалки ---
        // желаемая видимая высота (в пикселях) — можно брать долю окна
        const desiredVisiblePx = Math.round(window.innerHeight * 1); // 90% vh
        document.querySelectorAll('.burger').forEach(modal => {
            // высота, которую нужно присвоить до масштабирования
            const neededHeight = Math.max(Math.round(desiredVisiblePx / zoom), 240); // минимум 240px
            modal.style.height = neededHeight + 'px';
            // удобно задать и max-height, чтобы скролл внутри работал корректно
            modal.style.maxHeight = Math.round(window.innerHeight / zoom) + 'px';
            modal.style.overflowY = 'auto';
        });
    }
}
