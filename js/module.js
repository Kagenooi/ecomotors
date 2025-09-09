export function toggleActive(target, event) {
    document.querySelector(`#${target}`).classList.toggle('active');
    event?.classList.toggle('active');
}

export function chooseLang(evt, displayId, sourceId, modalId, btnClass, thisBtn) {
    // Не переходим по ссылке
    if (evt && typeof evt.preventDefault === 'function') evt.preventDefault();

    // Ограничиваем поиск текущим виджетом
    const root = thisBtn.closest('.langs') || document;

    // Элементы внутри текущего блока
    const buttonEl = root.querySelector(`.${btnClass}`) || document.querySelector(`.${btnClass}`);
    const displayEl = root.querySelector(`#${displayId}`) || document.getElementById(displayId);
    const sourceEl = root.querySelector(`#${sourceId}`) || document.getElementById(sourceId);

    if (!buttonEl || !displayEl) return; // на всякий случай

    // Текущее значение (что показано на кнопке)
    const beforeLangValue =
        (buttonEl.value ?? '').trim() ||
        (displayEl.textContent ?? '').trim();

    // Новое значение: сначала пробуем атрибут value у пункта,
    // если его нет — берём текст внутри элемента-источника (#sourceId) или самой ссылки
    let nowLangValue =
        (thisBtn.getAttribute('value') || '').trim() ||
        (sourceEl?.textContent || thisBtn.textContent || '').trim();

    if (!nowLangValue) return;

    // Применяем новое значение
    buttonEl.value = nowLangValue;
    displayEl.textContent = nowLangValue;

    // Меняем местами значения у пункта списка
    thisBtn.setAttribute('value', beforeLangValue);
    if (sourceEl) sourceEl.textContent = beforeLangValue;
}


export function closeMenuBtn() {
    document.querySelector('.navbar__menu_btn').classList.remove('active');
}
export function openSelect(target) {
    const panel = target.nextElementSibling;
    if (!panel) return;

    // считаем, что открыт, если явно задан style.maxHeight (и он не пуст)
    const isOpen = panel.style.maxHeight && panel.style.maxHeight !== '0px';

    if (isOpen) {
        target.classList.remove('active');
        // убрать inline-стиль — вернёт панель в исходное (закрытое) состояние)
        panel.style.maxHeight = '';
        panel.classList.remove('active');
    } else {
        target.classList.add('active');
        // открыть — установить высоту содержимого в px (для корректной анимации)
        panel.style.maxHeight = panel.scrollHeight + 'px';
        panel.classList.add('active');
    }
}

export function close() {
    const modal = document.querySelectorAll('.select'); // или ваш элемент

    document.addEventListener('click', (event) => {
        for (let i = 0; i < modal.length; i++) {
            if (!modal[i]) return;
            if (modal[i].querySelector('.select__content').classList.contains('active') && !modal[i].contains(event.target)) {
                modal[i].querySelector('.select__content').classList.remove('active');
                modal[i].querySelector('.select__content').style.maxHeight = null;
                modal[i].querySelector('.select__btn').classList.remove('active');
            }
        }
    });
}

export function closeMenu() {
    const menu = document.querySelectorAll('.navbar__menu'); // или ваш элемент

    document.addEventListener('click', (event) => {
        for (let i = 0; i < menu.length; i++) {
            if (!menu[i]) return;
            if (menu[i].querySelector('#burger').classList.contains('active') && !menu[i].contains(event.target)) {
                menu[i].querySelector('#burger').classList.remove('active');
                menu[i].querySelector('.navbar__menu_btn').classList.remove('active');
            }
        }
    });
}

export function closeLang() {
    const langs = document.querySelectorAll('.langs'); // или ваш элемент

    document.addEventListener('click', (event) => {
        for (let i = 0; i < langs.length; i++) {
            if (!langs[i]) return;
            if (langs[i].querySelector('.navbar__lang_btn')?.classList.contains('active') && !langs[i].contains(event.target)) {
                langs[i].querySelector('.navbar__lang_btn')?.classList.remove('active');
                langs[i].querySelector('.navbar__lang_list')?.classList.remove('active');
            }
            if (langs[i].querySelector('.burger__menu_lang_btn')?.classList.contains('active') && !langs[i].contains(event.target)) {
                langs[i].querySelector('.burger__menu_lang_btn')?.classList.remove('active');
                langs[i].querySelector('.burger__menu_lang_list')?.classList.remove('active');
            }
        }
    });
}

export function chooseOption(element) {
    let parent = element.parentElement;
    while (parent) {
        if (parent.classList.contains('select')) {
            parent.querySelector('.select__btn_txt').innerHTML = element.innerHTML;
            parent.querySelector('.select__content').classList.remove('active');
            parent.querySelector('.select__content').style.maxHeight = null;
            parent.querySelector('.select__btn').classList.remove('active');
        }
        parent = parent.parentElement;
    }
    return null; // если не найден
}


export function toggleSearch(inp) {
    document.querySelector(`#${inp}`).classList.toggle('active');
}