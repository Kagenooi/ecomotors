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
    filterSelect,
    toggleFilter
} from "./module.js";

window.toggleFilter = toggleFilter;
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



const fileAttach = document.querySelector('#fileAttach');
const inner = document.querySelector('#files');
const fileDecor = inner.querySelector('.contactUs__file_inner_decor');

let selectedFiles = [];

fileAttach.addEventListener('input', function (e) {
    const files = Array.from(e.target.files);

    // ограничение до 8
    const limitedFiles = files.slice(0, 8);
    if (files.length > 8) {
        alert('Можно выбрать не больше 8 файлов');
    }

    // пересобираем список файлов (только картинки)
    selectedFiles = limitedFiles.filter(file => file.type.startsWith('image/'));

    // чистим ТОЛЬКО превью, декор не трогаем
    clearPreviews();

    // создаём превью под актуальный список
    selectedFiles.forEach(file => createPreview(file));

    syncInputFiles();
    updateDecorState();
});

function clearPreviews() {
    // удаляем только блоки превью
    inner.querySelectorAll('.attachedWrapper').forEach(el => el.remove());
}

function createPreview(file) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('attachedWrapper');

    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('attachedWrapper__btn');

    const deleteBtnIcon = document.createElement('img');
    deleteBtnIcon.src = 'images/delete.png';
    deleteBtnIcon.classList.add('attachedWrapper__btn_icon');

    deleteBtn.appendChild(deleteBtnIcon);
    wrapper.appendChild(deleteBtn);

    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.alt = file.name;
    img.classList.add('attachedImage');
    wrapper.appendChild(img);

    deleteBtn.addEventListener('click', () => {
        // убираем файл из массива
        selectedFiles = selectedFiles.filter(f => f !== file);

        // удаляем превью
        wrapper.remove();
        URL.revokeObjectURL(img.src);

        // синхронизируем input.files и декор
        syncInputFiles();
        updateDecorState();
    });

    inner.appendChild(wrapper);
}

function syncInputFiles() {
    const dt = new DataTransfer();
    selectedFiles.forEach(file => dt.items.add(file));
    fileAttach.files = dt.files;
}

function updateDecorState() {
    if (!fileDecor) return;

    if (selectedFiles.length > 0) {
        fileDecor.classList.add('inactive');
    } else {
        fileDecor.classList.remove('inactive');
    }
}
