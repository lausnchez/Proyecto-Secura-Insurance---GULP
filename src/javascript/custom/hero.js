if(window.location.pathname.includes('home')){
  // Recoger los elementos del Hero y variables de pantalla
  const hero_header = document.querySelector(".hero__contents h2");
  const mobileVariable = getComputedStyle(document.documentElement).getPropertyValue("--tablet");
  const mobileScreenWidth = parseInt(mobileVariable);

  // Cambiar de clase según el tamaño de la ventana
  function updateLayout() {
    if (window.innerWidth <= mobileScreenWidth) {
      hero_header.classList.replace("base_title-hero", "base_header2-hero");
    } else {
      hero_header.classList.replace("base_header2-hero", "base_title-hero");
    }
  }

  updateLayout();
  window.addEventListener("resize", updateLayout);
}