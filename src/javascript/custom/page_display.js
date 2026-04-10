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


function displayDataProximasRenovaciones(content){
    fillRenovationsTable();

    // NÚMERO DE PÓLIZAS CABECERA
    const num_polizas_cabecera = document.querySelector('.p-renovaciones-page-info__title-button .general-info-tag__textContent');
    num_polizas_cabecera.textContent = current_renovaciones_data.length + ' Pólizas';

    // NÚMERO DE PÓLIZAS
    const num_polizas = document.querySelector('.p-renovaciones__filter__num-selector span');
    num_polizas.textContent = current_renovaciones_data.length + ' Pólizas';

    // NÚMERO DE PÁGINAS
    const num_paginas_totales = document.querySelector('.p-renovaciones__paginacion__totalPages');
    num_paginas_totales.textContent = 'Página ' + renovacionesCurrentPage + ' de ' + renovacionesMaxPages;

    // RELLENAR SELECTORES
    orderByOptionsPolizasDisplay();
    quantitySelectorPolizasDisplay();

    // PAGINACIÓN
    btnPaginacionSetter();

    // FILTROS
    updateTotalFiltersCounter();

    // Borrar filtros
    const btn_delete_filters = document.querySelector('.p-renovaciones__filter__num-selector__totalFiltros__borrarFiltros');
    btn_delete_filters.addEventListener('click', (e)=>{
        deleteFilters();
    });


    newFilterTag(["Múltiple",'filtro3', 'filtro2', 'filtro3', 'filtro4']);
    newFilterTag('Filtro nuevo');
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

    console.log('--------------------------------------------');
    console.log("Páginas recuperadas: " + page.length);

    // Display de los datos
    page.forEach(element =>{
        let row = displayRenovacion(element);
        table_container.appendChild(row);
    });
}

function updateTotalFiltersCounter(){
    const filterCounter = document.querySelector('.p-renovaciones__filter__num-selector__totalFiltros__filtros');
    
    let totalFilters = 0;
    filters.forEach(filter =>{
        const value = Object.values(filter)[0];
        if(Array.isArray(value)){
            totalFilters += value.length;
        }else if(value !== null && value !== undefined && value !== ''){
            totalFilters++;
        }
    });

    filterCounter.textContent = totalFilters + ' filtros aplicados';
}