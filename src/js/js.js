const menuBtn = document.querySelector('.header__nav-menu-btn');
const menuBurger = document.querySelector('.header__nav-menu-burger');
const body = document.querySelector('body');

const width = window.innerWidth;

let menuOpen = false;
menuBtn.addEventListener('click', e => {
    if (!menuOpen) {
        e.stopPropagation();
        menuBtn.classList.add('open');
        menuBurger.classList.add('open');
        menuOpen = true;
    } else {
        e.stopPropagation();
        menuBtn.classList.remove('open');
        menuBurger.classList.remove('open');
        menuOpen = false;
    }
});


body.onresize = e => {
    if (e.target.innerWidth >= 480) {
        menuBtn.classList.remove('open');
        menuBurger.classList.remove('open');
        menuOpen = false;
    }
   
     
        
 
    
};

document.addEventListener('click', function (e) {
    const target = e.target;
    const its_menu = target == menuBurger || menuBurger.contains(target);
    const its_btnMenu = target == menuBtn;
    const menu_is_active = menuBurger.classList.contains('open');

    if (!its_menu && !its_btnMenu && menu_is_active) {
        if (!menuOpen) {
            menuBtn.classList.add('open');
            menuBurger.classList.add('open');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            menuBurger.classList.remove('open');
            menuOpen = false;
        }
    }
});
