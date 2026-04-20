/**
 * En éste archivo se encuentra todo lo relativo al manejo de paginación,
 * filtros y ordenado de los datos de la página.
 */

// Inputs de los filters
const filter_no_poliza = document.querySelector('#modal-filtros-pr-filters__no-poliza-input');
const filter_no_riesgo = document.querySelector('#modal-filtros-pr-filters__no-riesgo-input');
const filter_fecha_contrato = document.querySelector('#modal-filtros-pr-filters__fecha-contrato-input');
const filter_fecha_vencimiento = document.querySelector('#modal-filtros-pr-filters__fecha-vencimiento-input');
const filter_importe_min = document.querySelector('#modal-filtros-pr-filters__importe-min-input');
const filter_importe_max = document.querySelector('#modal-filtros-pr-filters__importe-max-input');
const filter_estado = document.querySelector('#modal-filtros-pr-filters__estado-input');

// ─── PAGINACIÓN ─────────────────────────────────────────────────────────────

function nextPage(){
    if(renovacionesCurrentPage < renovacionesMaxPages){
        renovacionesCurrentPage++;
        updateCurrentAndMaxPages();
        fillRenovationsTable();

        comprobarValoresPaginacion();
    }
}

function previousPage(){
    if(renovacionesCurrentPage > 1){
        renovacionesCurrentPage--;
        updateCurrentAndMaxPages();
        fillRenovationsTable();

        comprobarValoresPaginacion();
    }
}

function firstPage(){
    renovacionesCurrentPage = 1;
    updateCurrentAndMaxPages();
    fillRenovationsTable();

    comprobarValoresPaginacion();
}

function lastPage(){
    renovacionesCurrentPage = renovacionesMaxPages;
    updateCurrentAndMaxPages();
    fillRenovationsTable();

    comprobarValoresPaginacion();
}

function updateMaxPages(){
    renovacionesMaxPages = Math.ceil(current_renovaciones_data.length / renovacionesPerPage);
}

// BOTONES DE MANEJO DE PAGINACIÓN
function btnPaginacionSetter(){
    const btn_nextPage = document.querySelector('#btn_pr_nextPage');
    const btn_previousPage = document.querySelector('#btn_pr_previousPage');
    const btn_firstPage = document.querySelector('#btn_pr_firstPage');
    const btn_lastPage = document.querySelector('#btn_pr_lastPage');

    btn_nextPage.addEventListener('click', ()=>{
        nextPage();
    });

    btn_previousPage.addEventListener('click', ()=>{
        previousPage();
    });

    btn_firstPage.addEventListener('click', ()=>{
        firstPage();
    });

    btn_lastPage.addEventListener('click', ()=>{
        lastPage();
    });
}


// ─── FILTROS ─────────────────────────────────────────────────────────────

function updateFilter(){
    internalFilter();   // Actualiza el filtrado según los filtros internos
    updateFilterOutput();   // Actualiza la página según los filtros internos
}

/**
 * Borra todos los filtros almacenados internamente
 */
function deleteAllFilters(){
    filters.length = 0;
    updateFilter();
}

/**
 * Borra uno de los filtros internos según la key que contengan
 * @param {*} key 
 */
function deleteSpecificFilter(key){
    const index = filters.findIndex(f => f[key]);
    if(index != -1){
        filters.splice(index,1);
    }
    updateFilterOutput();
}

/***
 * Pensada para cuando se borra un filtro por etiqueta.
 * Dependiendo de la key de la etiqueta se vaciará un campo
 * específico del modal.
 */
function deleteFilterFromModal(key){
    if(key === 'no_poliza'){filter_no_poliza.value = '';}
    if(key === 'nombre_riesgo'){filter_no_riesgo.value = '';}
    if(key === 'fecha_contrato'){filter_fecha_contrato.value = '';}
    if(key === 'fecha_vencimiento'){filter_fecha_vencimiento.value = '';}
    if(key === 'importe_minimo'){filter_importe_min.value = '';}
    if(key === 'importe_maximo'){filter_importe_max.value = '';}
    if(key === 'estado_poliza'){filter_estado.value = '';}
}

/**
 * Actualiza los filtros internos dependiendo de los valores insertados en el modal
 */
function updateInternalFilters(){
    // Reseteamos los filtros
    deleteAllFilters();

    // Número de póliza
    const no_poliza = filter_no_poliza.value.trim();
    if(no_poliza != ''){addFilter('no_poliza', no_poliza);}

    // Nombre del riesgo
    const no_riesgo = filter_no_riesgo.value.trim().toLowerCase();
    if(no_riesgo != ''){addFilter('nombre_riesgo', no_riesgo);}
    
    // Fecha de contrato
    const f_contrato = filter_fecha_contrato.value.trim();
    if(f_contrato != null && f_contrato != ''){addFilter('fecha_contrato', f_contrato);}
    
    // Fecha de vencimiento
    const f_vencimiento = filter_fecha_vencimiento.value.trim();
    if(f_vencimiento != null && f_vencimiento != ''){addFilter('fecha_vencimiento', f_vencimiento);}

    // Importe
    const importe_min = filter_importe_min.value.trim();
    const importe_max = filter_importe_max.value.trim();
    if(importe_min != ''){addFilter('importe_minimo', importe_min);}
    if(importe_max  != ''){ addFilter('importe_maximo', importe_max);}

    // Estado
    const estado = filter_estado.value;
    if(estado != -1){addFilter('estado_poliza', estado);}
}

/**
 * Recoge los contenidos del array de datos original y genera una copia filtrada según
 * los parámetros insertados en los filtros internos. Actualiza el current_renovaciones_data
 */
function internalFilter(){
    let newData = [...original_renovaciones_data];

    // Recorre los filtros y filtra los contenidos del nuevo array
    filters.forEach((filter) =>{
        const [key, value] = Object.entries(filter)[0];

        // Número de póliza
        if(key === 'no_poliza'){
            newData = newData.filter(f=>
                String(f.no_poliza).startsWith(value)
            );
        }

        // Nombre del riesgo
        if(key === 'nombre_riesgo'){
            newData = newData.filter(f =>
                f.nombre_riesgo.toLowerCase().includes(value)
            );
        }

        // Fecha de contratación
        if(key === 'fecha_contrato'){
            let date_filter_contrato = new Date(value.replace(/-/g, '\/'));   // Fecha del selector
            newData = newData.filter(f=>{
                const date_registro_contrato = new Date(f.fecha_contrato.replace(/-/g, '\/'));   // Fecha del registro
                return date_filter_contrato.getTime() <= date_registro_contrato.getTime();
            });
        }

        // Fecha de vencimiento
        if(key === 'fecha_vencimiento'){
            let date_filter_venc = new Date(value.replace(/-/g, "\/")); // FEcha del selector
            newData = newData.filter(f=>{
                const date_registro_venc = new Date(f.fecha_vencimiento.replace(/-/g, "\/"));
                return date_filter_venc.getTime() >= date_registro_venc.getTime();
            });
        }
        
        // Importe mínimo
        if(key === 'importe_minimo'){
            let min_number = Number.parseFloat(value);
            newData = newData.filter(f => f.importe >= min_number);
        }

        // Importe máximo
        if(key === 'importe_maximo'){
            let max_number = Number.parseFloat(value);
            newData = newData.filter(f=> f.importe <= max_number);
        }

        // Estado de la póliza
        if(key === 'estado_poliza'){
            newData = newData.filter(f=>f.estado_poliza === value);
        }
    });

    current_renovaciones_data = newData;
}

// Agrega un nuevo filtro interno
function addFilter(key, value){
    const newFilter = {[key]: value};
    filters.push(newFilter);
}

/**
 * Actualiza todo lo que tiene que ver con los visuales de los filtros en la
 * página web
 */
function updateFilterOutput(){
    updateFiltersTags();    // Genera las etiquetas
    updateTotalFiltersCounter();    // Recuenta los filters y actualiza el número en la web
    updateButtonFilterCounter();    // Actualiza el contador del botón
    fillRenovationsTable(); // Actualiza la tabla de renovaciones
    updateCurrentAndMaxPages(); // Actualiza la paginación
    updateTotalPolizas();   // Actualiza el total de pólizas que cumplen los filtros
}

function updateTotalPolizas(){
    const num_polizas = document.querySelector('.p-renovaciones__filter__num-selector span');
    num_polizas.textContent = current_renovaciones_data.length + ' Pólizas';
}

/**
 * Actualiza los tags relativos a los filtros de la página de nuevas renovaciones
 */
function updateFiltersTags(){
    const filterTagContainer = document.querySelector('.p-renovaciones__filter__filterContainer');
    filterTagContainer.innerHTML = '';
    filters.forEach((filter) =>{ 
        const [key, value] = Object.entries(filter)[0];
        filterTagContainer.appendChild(filterTagDisplay(key, value));
    });
}

/**
 * Actualiza los contadores de filtros de la página de nuevas renovaciones
 */
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

function updateButtonFilterCounter(){
    const button = document.querySelector('#pr-filter-button__contadorFiltros');
    if(button){
        button.textContent = filters.length.toString();
    }else button.textContent = '0';
}