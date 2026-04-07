// Body
const body = document.querySelector("body");

// Elementos del profile mobile
// ----------------------------------------------------------------
const headerProfileButton = document.querySelector(
  "#header_submenu__button_profile button",
);

const headerProfileMenu = document.querySelector(
  ".header__submenus__mobile .profile-dropdown",
);

// Elementos del profile Desktop
// ----------------------------------------------------------------
const headerProfileDesktopButton = document.querySelector(
  "#header-submenu-item-desktop__profile",
);

const headerProfileDesktopMenu = document.querySelector(
  ".header__submenu__dropdown.profile-dropdown",
);

// Elementos del burger
// ----------------------------------------------------------------
const headerBurgerButton = document.querySelector(
  "#header_submenu__button_burger button",
);
const headerBurgerMenu = document.querySelector(
  ".header__submenus__mobile .header__mobile-burger-submenu",
);

// Elementos del close
// ----------------------------------------------------------------
const headerCloseButton = document.querySelector(
  "#header_submenu__button_close",
);

// Elementos del language mobile
// ----------------------------------------------------------------
// const headerLanguageButton = document.querySelector(
//   ".header__mobile-burger-submenu__language-dropdown a",
// );
const headerLanguageButton = document.querySelector(
  ".header__mobile-burger-submenu__language-dropdown a",
);
const headerLanguageMenu = document.querySelector(
  ".header__mobile-burger-submenu__language-dropdown ul",
);

// Elementos del language desktop
// ----------------------------------------------------------------
const headerLanguageDesktopButton = document.querySelector(
  "#header-submenu-item-desktop__language",
);

const headerLanguageDesktopMenu = document.querySelector(
  ".header__submenu__dropdown.language-dropdown",
);

// ----------------------------------------------------------------

const classToggle = "mobile-active"; // Despliega un menú en mobile
const classToggleDesktop = "desktop-active"; // Despliega un menú en mobile
const hiddenClass = "header-submenu-button-hidden"; // Oculta un elemento
const notScroll = "not-scroll"; // Clase para evitar el scroll en mobile

//-------------------------------------------------------------------------------------------

// FUNCIONES DEL MOBILE

//-------------------------------------------------------------------------------------------

// Ocultar el botón de cierre al inicializar
headerCloseButton.classList.add(hiddenClass);

// Función para cerrar el menú desplegado actualmente
//---------------------------------------------------------------------------------
headerCloseButton?.addEventListener("click", closeAllMenus);
body.classList.remove(notScroll);

function closeAllMenus() {
  // Mostrar botones
  headerBurgerButton.classList.remove(hiddenClass);
  headerProfileButton.classList.remove(hiddenClass);
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
headerProfileButton?.addEventListener("click", showProfileMobileSubmenu);

function showProfileMobileSubmenu() {
  // Mostrar menú
  headerProfileMenu?.classList.add(classToggle);

  // Cambiar botones disponibles
  headerProfileButton.classList.add(hiddenClass);
  headerBurgerButton.classList.add(hiddenClass);
  headerCloseButton.classList.remove(hiddenClass);
  // Bloquear scroll
  body.classList.add(notScroll);

  console.log("Botón de perfil pulsado");
}

// Función para mostrar/ocultar el submenu burger
//---------------------------------------------------------------------------------
headerBurgerButton?.addEventListener("click", showBurgerMobileSubmenu);

function showBurgerMobileSubmenu() {
  // Mostrar menú
  headerBurgerMenu?.classList.add(classToggle);

  // Cambiar botones disponibles
  headerProfileButton.classList.add(hiddenClass);
  headerBurgerButton.classList.add(hiddenClass);
  headerCloseButton.classList.remove(hiddenClass);
  // Bloquear scroll
  body.classList.add(notScroll);
}

// Función para mostrar/ocultar el submenu language
//---------------------------------------------------------------------------------
headerLanguageButton?.addEventListener("click", showLanguageMobileSubmenu);

function showLanguageMobileSubmenu() {
  console.log("Menú de language mobile pulsado");
  // Mostrar menú
  headerLanguageMenu?.classList.toggle(classToggle);
}


//-------------------------------------------------------------------------------------------

// FUNCIONES DEL DESKTOP

//-------------------------------------------------------------------------------------------

// Función para mostrar/ocultar el submenu del profile en desktop
//---------------------------------------------------------------------------------
headerProfileDesktopButton?.addEventListener("click", showProfileMenuDesktop);

function showProfileMenuDesktop(){
  console.log("Has pulsado el botón de profile");
  headerProfileDesktopMenu?.classList.toggle(classToggleDesktop);
}

// Función para mostrar/ocultar el submenu del language en desktop
//---------------------------------------------------------------------------------
headerLanguageDesktopButton?.addEventListener("click", showLanguageMenuDesktop);

function showLanguageMenuDesktop(){
  console.log("Has pulsado el botón de language");
  headerLanguageDesktopMenu?.classList.toggle(classToggleDesktop);
}