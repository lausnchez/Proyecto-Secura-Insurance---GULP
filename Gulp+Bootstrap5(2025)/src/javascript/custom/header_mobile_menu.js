// Recoger elementos del DOM
const headerSubmenuButtonProfile = document.querySelector('#header_submenu__button_profile');
const headerSubmenuButtonBurger = document.querySelector('#header_submenu__button_burger');

// Función para mostrar/ocultar el submenu del perfil
headerSubmenuButtonProfile?.addEventListener('click', showProfileMobileSubmenu);

function showProfileMobileSubmenu() {
    console.log("botón de profile mobile pulsado");
}