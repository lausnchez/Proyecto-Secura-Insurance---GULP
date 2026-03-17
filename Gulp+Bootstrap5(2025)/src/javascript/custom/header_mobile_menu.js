// Recoger elementos del DOM
//---------------------------------------------------------------------------------
const body = document.querySelector("body");    // Para togglear el bloqueo del scroll

// Elementos del profile
const headerProfileButton = document.querySelector('#header_submenu__button_profile button');
const headerProfileMenu = document.querySelector('.header__submenus__mobile .profile-dropdown');

// Elementos del burger
const headerBurgerButton = document.querySelector('#header_submenu__button_burger button');
const headerBurgerMenu = document.querySelector('.header__submenus__mobile .header__mobile-burger-submenu');

// Elementos del close
const headerCloseButton = document.querySelector('#header_submenu__button_close');

// Elementos del language
const headerLanguageButton = document.querySelector(".header__mobile-burger-submenu__language-dropdown a");
const headerLanguageMenu = document.querySelector(".header__mobile-burger-submenu__language-dropdown ul");

const classToggle = "mobile-active";    // Despliega un menú
const hiddenClass = "header-submenu-button-hidden"; // Oculta un elemento
const bodyScrollBlock = "menu-open";    // Bloquea el scroll del body

// Ocultar el botón de cierre al inicializar
headerCloseButton.classList.add(hiddenClass);

// Función para cerrar el menú desplegado actualmente
//---------------------------------------------------------------------------------
headerCloseButton?.addEventListener('click', closeAllMenus);

function closeAllMenus(){
    // Mostrar botones
    headerBurgerButton.classList.remove(hiddenClass);
    headerProfileButton.classList.remove(hiddenClass);
    // Ocultar botón de cierre
    headerCloseButton.classList.add(hiddenClass);
    // Ocultar menús desplegables
    headerProfileMenu?.classList.remove(classToggle);
    headerBurgerMenu?.classList.remove(classToggle);
    headerLanguageMenu?.classList.remove(classToggle);

    // Habilitar de nuevo el scroll
    body.classList.remove(bodyScrollBlock);
}

// Función para mostrar/ocultar el submenu del profile
//---------------------------------------------------------------------------------
headerProfileButton?.addEventListener('click', showProfileMobileSubmenu);

function showProfileMobileSubmenu(){
    // Mostrar menú
    headerProfileMenu?.classList.add(classToggle);

    // Cambiar botones disponibles
    headerProfileButton.classList.add(hiddenClass);
    headerBurgerButton.classList.add(hiddenClass);
    headerCloseButton.classList.remove(hiddenClass);

    // Bloquear scroll del body
    body.classList.add(bodyScrollBlock);

}

// Función para mostrar/ocultar el submenu burger
//---------------------------------------------------------------------------------
headerBurgerButton?.addEventListener('click', showBurgerMobileSubmenu);

function showBurgerMobileSubmenu(){
    // Mostrar menú
    headerBurgerMenu?.classList.add(classToggle);

    // Cambiar botones disponibles
    headerProfileButton.classList.add(hiddenClass);
    headerBurgerButton.classList.add(hiddenClass);
    headerCloseButton.classList.remove(hiddenClass);

    // Bloquear scroll del body
    body.classList.add(bodyScrollBlock);
}

// Función para mostrar/ocultar el submenu language
//---------------------------------------------------------------------------------
headerLanguageButton?.addEventListener('click', showLanguageMobileSubmenu);

function showLanguageMobileSubmenu(){
    // Mostrar menú
    headerLanguageMenu?.classList.toggle(classToggle);
}