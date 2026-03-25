// Recoger elementos del DOM
//---------------------------------------------------------------------------------

// Body
const body = document.querySelector("body");

// Elementos del profile
const headerProfileButtonMobile = document.querySelector(
  "#header_submenu__button_profile button",
);

const headerProfileButtonDesktop = document.querySelector(
  "#header-submenu-item-desktop__profile"
);

const headerProfileMenu = document.querySelector(
  ".header__submenus__mobile .profile-dropdown",
);

// Elementos del burger
const headerBurgerButton = document.querySelector(
  "#header_submenu__button_burger button",
);
const headerBurgerMenu = document.querySelector(
  ".header__submenus__mobile .header__mobile-burger-submenu",
);

// Elementos del language
const headerLanguageButtonDesktop = document.querySelector(
  "#header-submenu-item-desktop__language"
);

// Elementos del close
const headerCloseButton = document.querySelector(
  "#header_submenu__button_close",
);

// Elementos del language
const headerLanguageButton = document.querySelector(
  ".header__mobile-burger-submenu__language-dropdown a",
);
const headerLanguageMenu = document.querySelector(
  ".header__mobile-burger-submenu__language-dropdown ul",
);


// Variables de control de los elementos
const classToggle = "mobile-active"; // Despliega un menú
const hiddenClass = "header-submenu-button-hidden"; // Oculta un elemento
const notScroll = "not-scroll"; // Clase para evitar el scroll en mobile

// Ocultar el botón de cierre al inicializar
headerCloseButton.classList.add(hiddenClass);

// Función para cerrar el menú desplegado actualmente
//---------------------------------------------------------------------------------
headerCloseButton?.addEventListener("click", closeAllMenus);
body.classList.remove(notScroll);

function closeAllMenus() {
  // Mostrar botones
  headerBurgerButton.classList.remove(hiddenClass);
  headerProfileButtonMobile.classList.remove(hiddenClass);
  // Ocultar botón de cierre
  headerCloseButton.classList.add(hiddenClass);
  // Ocultar menús desplegables
  headerProfileMenu?.classList.remove(classToggle);
  headerBurgerMenu?.classList.remove(classToggle);
  headerLanguageMenu?.classList.remove(classToggle);
  // Desbloquear scroll
  body.classList.remove(notScroll);
}

// Función para mostrar/ocultar el submenu del profile
//---------------------------------------------------------------------------------
headerProfileButtonMobile?.addEventListener("click", showProfileMobileSubmenu);

function showProfileMobileSubmenu() {
  // Mostrar menú
  headerProfileMenu?.classList.add(classToggle);

  // Cambiar botones disponibles
  headerProfileButtonMobile.classList.add(hiddenClass);
  headerBurgerButton.classList.add(hiddenClass);
  headerCloseButton.classList.remove(hiddenClass);
  // Bloquear scroll
  body.classList.add(notScroll);
}

// Función para mostrar/ocultar el submenu burger
//---------------------------------------------------------------------------------
headerBurgerButton?.addEventListener("click", showBurgerMobileSubmenu);

function showBurgerMobileSubmenu() {
  // Mostrar menú
  headerBurgerMenu?.classList.add(classToggle);

  // Cambiar botones disponibles
  headerProfileButtonMobile.classList.add(hiddenClass);
  headerBurgerButton.classList.add(hiddenClass);
  headerCloseButton.classList.remove(hiddenClass);
  // Bloquear scroll
  body.classList.add(notScroll);
}

// Función para mostrar/ocultar el submenu language
//---------------------------------------------------------------------------------
headerLanguageButton?.addEventListener("click", showLanguageMobileSubmenu);

function showLanguageMobileSubmenu() {
  // Mostrar menú
  headerLanguageMenu?.classList.toggle(classToggle);
}
