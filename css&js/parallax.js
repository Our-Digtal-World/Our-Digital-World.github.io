// let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1');
let hill2 = document.getElementById('hill2');
let hill3 = document.getElementById('hill3');
let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5');
let hill0 = document.getElementById('hill0');
// let tree = document.getElementById('tree');
let dialog = document.getElementById('dialog');
let dialog1 = document.getElementById('dialog1');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    // text.style.marginTop = value * 1.5 + 'px';
    // leaf.style.top = value * -1.5 + 'px';
    // leaf.style.left = value * 1.5 + 'px';
    hill5.style.left = value * 1.5 + 'px';
    hill5.style.bottom = value * 1 + 'px';
    hill0.style.top = value * 1 + 'px';
    hill4.style.left = value * -1.25 + 'px';
    hill4.style.top = value * 1.25 + 'px';
    hill3.style.left = value * 0.8 + 'px';
    hill2.style.left = value * -1 + 'px';
    hill5.style.top = value * 0.5 + 'px';
    hill2.style.top = value * -1 + 'px';
    hill1.style.top = value * 0.5 + 'px';
    // tree.style.left = value * -1.5 + 'px';

    dialog.style.marginTop = value * 1.25 + 'px';
    dialog1.style.marginTop = value * 2 + 200 + 'px';
});