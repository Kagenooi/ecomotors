export function adaptive() {
    const wrapper = document.querySelector('#adaptive');
    let zoom = document.body.clientWidth / 19.2/ 100;
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
}
