/**
 * En éste archivo se encuentra todo lo relativo al manejo de paginación,
 * filtros y ordenado de los datos de la página.
 */

// ─── PAGINACIÓN ─────────────────────────────────────────────────────────────

function comprobarValoresPaginacion(){
    console.log('Current page: ' + renovacionesCurrentPage);
    console.log('Max pages: ' + renovacionesMaxPages);
    console.log('Per page: ' + renovacionesPerPage);
    console.log('');
}

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


// ─── ETIQUETAS DE FILTRO ─────────────────────────────────────────────────────────────

function deleteAllFilters(id = ''){
    filters.length = 0;
    updateTotalFiltersCounter();

    const filterTagContainer = document.querySelector('.p-renovaciones__filter__filterContainer');
    filterTagContainer.innerHTML = '';
}

function deleteSpecificFilter(key){
    const index = filters.findIndex(f => f[key]);
    if(index != -1){
        filters.splice(index,1);
    }
    updateFilterOutput();
    updateTotalFiltersCounter();
}

function filter(){
    let newData = [...original_renovaciones_data];

    // Inputs de los filters
    const filter_no_poliza = document.querySelector('#modal-filtros-pr-filters__no-poliza-input');
    const filter_no_riesgo = document.querySelector('#modal-filtros-pr-filters__no-riesgo-input');
    const filter_fecha_contrato = document.querySelector('#modal-filtros-pr-filters__fecha-contrato-input');
    const filter_fecha_vencimiento = document.querySelector('#modal-filtros-pr-filters__fecha-vencimiento-input');
    const filter_importe_min = document.querySelector('#modal-filtros-pr-filters__importe-min-input');
    const filter_importe_max = document.querySelector('#modal-filtros-pr-filters__importe-max-input');
    const filter_estado = document.querySelector('#modal-filtros-pr-filters__estado-input');

    // Número de póliza
    const no_poliza = filter_no_poliza.value.trim();
    if(no_poliza != ''){
        newData = newData.filter(f=>
           String(f.no_poliza).startsWith(no_poliza) // f.no_poliza == no_poliza
        );
    }

    // Nombre del riesgo
    const no_riesgo = filter_no_riesgo.value.trim().toLowerCase();
    if(no_riesgo != ''){
        newData = newData.filter(f =>
            f.nombre_riesgo.toLowerCase().includes(no_riesgo)
        );
    }
    

    // Fecha de contrato
    const f_contrato = filter_fecha_contrato.value.trim();

    if(f_contrato != null && f_contrato != ''){
        let date_filter_contrato = new Date(f_contrato.replace(/-/g, '\/'));   // Fecha del selector
        newData = newData.filter(f=>{
            const date_registro_contrato = new Date(f.fecha_contrato.replace(/-/g, '\/'));   // Fecha del registro
            return date_filter_contrato.getTime() <= date_registro_contrato.getTime();
        });
    }
    

    // Fecha de vencimiento
    const f_vencimiento = filter_fecha_vencimiento.value.trim();

    if(f_vencimiento != null && f_vencimiento != ''){
        let date_filter_venc = new Date(f_vencimiento.replace(/-/g, "\/")); // FEcha del selector
        newData = newData.filter(f=>{
            const date_registro_venc = new Date(f.fecha_vencimiento.replace(/-/g, "\/"));
            return date_filter_venc.getTime() >= date_registro_venc.getTime();
        });
    }

    // Importe
    const importe_min = filter_importe_min.value.trim();
    const importe_max = filter_importe_max.value.trim();

    if(importe_min != ''){
        let min_number = Number.parseFloat(importe_min);
        newData = newData.filter(f => f.importe >= min_number);
    }

    if(importe_max  != ''){
        let max_number = Number.parseFloat(importe_max);
        newData = newData.filter(f=> f.importe <= max_number);

    }

    // Estado
    const estado = filter_estado.value;
    if(estado != -1){
        newData = newData.filter(f=>f.estado_poliza === estado);
    }

    console.log(newData);
}

function validateFilterInput(){
    
}

function addNewFilter(key, value){

}



/**
 * Vacía el contenedor de filtros y genera una tag por cada uno de los
 * filtros aplicados al registro de pólizas
 */
function updateFilterOutput(){
    const filterTagContainer = document.querySelector('.p-renovaciones__filter__filterContainer');
    filterTagContainer.innerHTML = '';
    filters.forEach((filter) =>{ 
        const [[key, value]] = Object.entries(filter);
        filterTagContainer.appendChild(filterTagDisplay(key, value));
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