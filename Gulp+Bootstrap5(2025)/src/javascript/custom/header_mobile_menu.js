// Recoger elementos del DOM
const headerSubmenuButtonProfile = document.querySelector('#header_submenu__button_profile');
const headerMobileProfileMenu = document.querySelector(".header__mobile-profile-submenu");

const headerSubmenuButtonBurger = document.querySelector('#header_submenu__button_burger');
const headerMobileBurgerMenu = document.querySelector(".header__mobile-burger-submenu");

// Función para mostrar/ocultar el submenu del perfil
//---------------------------------------------------------------------------------
headerSubmenuButtonProfile?.addEventListener('click', showProfileMobileSubmenu);

function showProfileMobileSubmenu() {
    headerMobileProfileMenu?.classList.toggle("active");
    console.log("profile menu pulsado");

    if(headerMobileProfileMenu?.classList.contains("active")){
        headerMobileBurgerMenu?.classList.remove("active");
    }
}

// Función para mostrar/ocultar el submenú hamburguesa
//---------------------------------------------------------------------------------
headerSubmenuButtonBurger?.addEventListener('click', showBurgerMobileSubmenu);

function showBurgerMobileSubmenu(){
    headerMobileBurgerMenu?.classList.toggle("active");

    // No mostrar menú de profile
    if(headerMobileBurgerMenu?.classList.contains("active")){
        headerMobileProfileMenu?.classList.remove("active");
    }

    console.log("burguer menu pulsado");
}