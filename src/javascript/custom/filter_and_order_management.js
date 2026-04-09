/**
 * En éste archivo se encuentra todo lo relativo al manejo de paginación,
 * filtros y ordenado de los datos de la página.
 */

// ─── PAGINACIÓN ─────────────────────────────────────────────────────────────

let renovacionesCurrentPage = 1;
let renovacionesPerPage = 10;
let renovacionesMaxPages = 0;

function nextPage(){
    if(renovacionesCurrentPage < renovacionesMaxPages){
        renovacionesCurrentPage++;
        updateCurrentAndMaxPages();
    }
}

function previousPage(){
    if(renovacionesCurrentPage > 1){
        renovacionesCurrentPage--;
        updateCurrentAndMaxPages();
    }
}

function firstPage(){
    renovacionesCurrentPage = 1;
    updateCurrentAndMaxPages();
}

function lastPage(){
    renovacionesCurrentPage = renovacionesMaxPages;
    updateCurrentAndMaxPages();
}

function updateMaxPages(){
    renovacionesMaxPages = Math.ceil(original_renovaciones_data.length / renovacionesPerPage);
    console.log('RenovacionesMaxPages: ' + renovacionesMaxPages);
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

/**
 * Genera una nueva estiqueta de filtro a partir de una string,
 * o un array mostrando el primer elemento de éste
 * @param {string/array} filterContent 
*/
function newFilterTag(filterContent){
    const filterTagContainer = document.querySelector('.p-renovaciones__filter__filterContainer');
    let filterTag = filterTagDisplay(filterContent);    
    filterTagContainer.appendChild(filterTag);
}

// ─── SELECTOR DE ORDEN ─────────────────────────────────────────────────────────────
function orderByOptionsPolizasDisplay(){
    const selectorOrden = document.querySelector('.p-renovaciones__filter__num-selector__selector select');

    selectorOptionsOrdenarData.forEach((option) =>{
        const selectorOptionsContent= document.createElement('option');
        
        selectorOptionsContent.value = option.value;
        selectorOptionsContent.textContent = option.content;

        selectorOrden.appendChild(selectorOptionsContent);
    });

    selectorOrden.addEventListener('change', (e)=>{

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
        renovacionesPerPage = e.target.value;
        console.log(renovacionesPerPage);
    });
}