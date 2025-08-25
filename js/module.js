export function toggleActive(target) {
    document.querySelector(`#${target}`).classList.toggle('active');
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

export function closeSelect() {
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