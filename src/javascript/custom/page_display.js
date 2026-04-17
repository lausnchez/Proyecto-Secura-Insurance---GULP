/**
 * En éste archivo se encuentran todos las funciones que se encargan
 * de mostrar datos por pantalla.
 */


// ─── PAGE HOME ─────────────────────────────────────────────────────────────

function displayRenovacionesDataHome(content){
    const container = document.querySelector('#prt-home .proximas-renovaciones-tabla__contents');
    content.forEach(element => {
        let row = displayRenovacion(element);
        container.appendChild(row);
    });
}

function heroManagementHome(){
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


// ─── PAGE PRÓXIMAS RENOVACIONES ─────────────────────────────────────────────────────────────


function displayDataProximasRenovaciones(){
    fillRenovationsTable();
    
    // NÚMERO DE PÓLIZAS CABECERA
    const num_polizas_cabecera = document.querySelector('.p-renovaciones-page-info__title-button .general-info-tag__textContent');
    num_polizas_cabecera.textContent = current_renovaciones_data.length + ' Pólizas';
    
    // NÚMERO DE PÁGINAS
    const num_paginas_totales = document.querySelector('.p-renovaciones__paginacion__totalPages');
    num_paginas_totales.textContent = 'Página ' + renovacionesCurrentPage + ' de ' + renovacionesMaxPages;
    
    // RELLENAR SELECTORES
    orderByOptionsPolizasDisplay();
    quantitySelectorPolizasDisplay();
    estadoSelectorFilterModalDisplay();
    
    // PAGINACIÓN
    btnPaginacionSetter();
    
    // Crear contador de filtros si no existe
    const opening_button = document.querySelector('#pr-filter-modal-button');
    if (!document.querySelector('#pr-filter-button__contadorFiltros')) {
        const contadorFiltros = document.createElement('span');
        contadorFiltros.setAttribute('id', 'pr-filter-button__contadorFiltros');
        opening_button.appendChild(contadorFiltros);
    }
    
    // FILTROS
    updateFilterOutput();
    
    // Borrar filtros
    const btn_delete_filters = document.querySelector('.p-renovaciones__filter__num-selector__totalFiltros__borrarFiltros');
    btn_delete_filters.addEventListener('click', (e)=>{
        deleteAllFilters();
        updateTotalFiltersCounter();
    });
    
    // MODAL
    displayModalFunctionability();
    updateButtonFilterCounter();
    
}

function updateCurrentAndMaxPages(){
    const num_paginas_totales = document.querySelector('.p-renovaciones__paginacion__totalPages');
    updateMaxPages();
    num_paginas_totales.textContent = 'Página ' + renovacionesCurrentPage + ' de ' + renovacionesMaxPages;  // Mostrar página en la que se está
}

function fillRenovationsTable(){
    // Vaciar tabla
    const table_container = document.querySelector('#prt-proximas-renovaciones .proximas-renovaciones-tabla__contents');
    table_container.innerHTML = '';
    
    // Recoger datos del json correspondientes
    let page = paginatePolizasData();
    
    // Display de los datos
    page.forEach(element =>{
        let row = displayRenovacion(element);
        table_container.appendChild(row);
    });
}


// ─── PAGE PRÓXIMAS RENOVACIONES - MODAL ─────────────────────────────────────────────────────────────

const modal_hidden_class = 'modal__container--hidden';
const modal_overlay_hidden_class = 'modal__overlay--hidden';

// const modal = document.querySelector('#modal-pr-filtros .modal__container');
const modal = document.querySelector('#modal-pr-filtros-contents');
const overlay = document.querySelector('#modal-pr-filtros-overlay');

function displayModalFunctionability(){
    const btn_displayModal = document.querySelector('.p-renovaciones__filter__filter >button');    
    const btn_borrarFiltros = document.querySelector('.modal-filtros-pr-buttons-borrarFiltros');
    const btn_aplicarFiltros = document.querySelector('.modal-filtros-pr-buttons-aplicarFiltros');
    const btn_modal_close = document.querySelector('.modal-filtros-pr-header .icon-close');
    
    // RESPONSIVE DEL MODAL
    modalMobileDisplay();
    
    // ABRIR MODAL
    btn_displayModal.addEventListener('click', ()=>{
        openModal(modal);
    });
    
    // APLICAR FILTROS
    btn_aplicarFiltros.addEventListener('click', ()=>{
        closeModal(modal);
        updateInternalFilters();    // Actualizar filtros
        internalFilter();   // Filtrar según nuevos parámetros
        updateFilterOutput();   // Actualizar visualmente la pantalla
    });
    
    // BORRAR FILTROS
    btn_borrarFiltros.addEventListener('click', ()=>{
        resetFilterValuesModal();
        deleteAllFilters();
        closeModal(modal);
    });
    
    // CERRAR MODAL
    btn_modal_close.addEventListener('click', ()=>{
        closeModal(modal);
    });
    
    // CIERRE POR OVERLAY
    overlay.addEventListener('click', ()=>{
        closeModal(modal);
    });
}

function closeModal(modal){
    modal.classList.add(modal_hidden_class);
    overlay.classList.add(modal_overlay_hidden_class);
    
    const body = document.querySelector('body');
    body.classList.remove(notScroll);
}

function openModal(modal){
    modal.classList.remove(modal_hidden_class);
    overlay.classList.remove(modal_overlay_hidden_class);
    
    const body = document.querySelector('body');
    body.classList.add(notScroll);
}

function resetFilterValuesModal(){
    const formulario = document.querySelector('.modal-filtros-pr-filters');
    formulario.reset();
}

function modalMobileDisplay(){
    const modal = document.querySelector('#modal-pr-filtros-contents');
    const overlay = document.querySelector('#modal-pr-filtros-overlay');
    const opening_button = document.querySelector('#pr-filter-modal-button');
    
    const mobileVariable = getComputedStyle(document.documentElement).getPropertyValue("--tablet");
    const mobileScreenWidth = parseInt(mobileVariable);
    
    function updateLayoutModal(){
        if(window.innerWidth <= mobileScreenWidth){
            modal.classList.add("modal--mobile");
            overlay.classList.add("overlay--mobile");
            opening_button.classList.add("filter-button--mobile");            
            
        }else{
            modal.classList.remove("modal--mobile");
            overlay.classList.remove("overlay--mobile");
            opening_button.classList.remove("filter-button--mobile");
        }
    }
    
    updateLayoutModal();
    window.addEventListener("resize", updateLayoutModal);
}


// ─── SELECTORES ─────────────────────────────────────────────────────────────


function orderByOptionsPolizasDisplay(){
    const selectorOrden = document.querySelector('.p-renovaciones__filter__num-selector__selector select');
    
    selectorOptionsOrdenarData.forEach((option) =>{
        const selectorOptionsContent= document.createElement('option');
        
        selectorOptionsContent.value = option.value;
        selectorOptionsContent.textContent = option.content;
        
        selectorOrden.appendChild(selectorOptionsContent);
    });
    
    selectorOrden.addEventListener('change', (e)=>{
        sortRenovaciones(e.target.value);
        fillRenovationsTable();
    });
}

function quantitySelectorPolizasDisplay(){
    const selectorQuantityPolizas = document.querySelector('.p-renovaciones__paginacion__orderBy select');
    
    selectorCantidadPolizasData.forEach((option) =>{
        const selectorQuantityPolizasOption= document.createElement('option');
        
        selectorQuantityPolizasOption.value = option.value;
        selectorQuantityPolizasOption.textContent = option.content;
        
        selectorQuantityPolizas.appendChild(selectorQuantityPolizasOption);
    });
    
    selectorQuantityPolizas.addEventListener('change', (e)=>{
        renovacionesPerPage = Number(e.target.value);
        renovacionesCurrentPage = 1; // Resetear a la primera página al cambiar cantidad
        updateMaxPages();
        fillRenovationsTable();
        updateCurrentAndMaxPages();
    });
}

function estadoSelectorFilterModalDisplay(){
    const selectorFilterModal = document.querySelector('.modal-filters__estado__select');
    selectorFilterModal.innerHTML = '';
    
    const opcion0 = document.createElement('option');
    opcion0.value = -1;
    opcion0.textContent = 'Seleccione un estado de póliza';
    selectorFilterModal.appendChild(opcion0);
    
    selectorEstadoFilterModal.forEach((data) =>{
        const option = document.createElement('option');
        option.value = data.value;
        option.textContent = data.content;
        selectorFilterModal.appendChild(option);
    });
}