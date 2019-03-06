const menu = document.querySelector('.menu-container');
const hamburger = document.querySelector('.hamburger');

const clickHamburger = () => {
    if (menu.style.display !== 'flex') {
        menu.style.position = 'absolute';
        menu.style.display = 'flex';
        menu.style.marginTop = '50px';
        return false;
    }
    menu.style.display = 'none';
}

hamburger.addEventListener('click', clickHamburger);
