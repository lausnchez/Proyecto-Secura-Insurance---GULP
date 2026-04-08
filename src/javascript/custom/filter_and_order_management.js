// ─── ETIQUETAS DE FILTRO ─────────────────────────────────────────────────────────────
const filterTagContainer = document.querySelector('.p-renovaciones__filter__filterContainer');

/**
 * Genera una nueva estiqueta de filtro a partir de una string,
 * o un array mostrando el primer elemento de éste
 * @param {string/array} filterContent 
 */
function newFilterTag(filterContent){
    let filterTag = filterTagDisplay(filterContent);    
    filterTagContainer.appendChild(filterTag);
}

newFilterTag(["Múltiple",'filtro3', 'filtro2', 'filtro3', 'filtro4']);
newFilterTag('Filtro nuevo');

// ─── SELECTOR DE ORDEN ─────────────────────────────────────────────────────────────
function orderByOptionsPolizasDisplay(){
    const selectorOrden = document.querySelector('.p-renovaciones__filter__num-selector__selector select');

    selectorOptionsOrdenarData.forEach((option) =>{
        const selectorOptionsContent= document.createElement('option');
        
        selectorOptionsContent.value = option.value;
        selectorOptionsContent.textContent = option.content;

        selectorOrden.appendChild(selectorOptionsContent);
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
}