// Elementos del profile
const headerMobileButtonProfile = document.querySelector('#header_submenu__button_profile');
const headerProfileMenu = document.querySelector('.header__submenus__mobile .profile-dropdown');

// Elementos del burger
const headerMobileButtonBurger = document.querySelector('#header_submenu__button_burger');
const headerBurgerMenu = document.querySelector('.header__submenus__mobile .header__mobile-burger-submenu');

const classToggle = "mobile_active";

// Función para mostrar/ocultar el submenu del profile
//---------------------------------------------------------------------------------
headerMobileButtonProfile?.addEventListener('click', showProfileMobileSubmenu);

function showProfileMobileSubmenu() {
    headerProfileMenu?.classList.toggle(classToggle);

    if(headerProfileMenu?.classList.contains(classToggle)){
        headerBurgerMenu?.classList.remove(classToggle);
    }
}

// Función para mostrar/ocultar el submenu burger
//---------------------------------------------------------------------------------
headerMobileButtonBurger?.addEventListener('click', showBurgerMobileSubmenu);

function showBurgerMobileSubmenu(){
    headerBurgerMenu?.classList.toggle(classToggle);

    // No mostrar menú de profile
    if(headerBurgerMenu?.classList.contains(classToggle)){
        headerProfileMenu?.classList.remove(classToggle);
    }
}