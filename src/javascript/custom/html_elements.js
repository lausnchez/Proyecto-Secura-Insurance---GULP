/**
 * En éste archivo se encuentran todas las funciones en lo relativo a generar
 * elementos HTML en la página.
 */

// ─── RENOVACIONES ─────────────────────────────────────────────────────────────

/**
 * LLama a la función de validación de los datos y devuelve una row con
 * los datos correctos ya insertados
 * @param {*} renovacionContents 
 * @returns 
*/
function displayRenovacion(renovacionContents){
    const renovacionData = validateRenovacionesContent(renovacionContents); // Validar datos previamente
    
    const renovacionRow = document.createElement('a');
    renovacionRow.classList.add('proximas-renovaciones-row');    
    renovacionRow.setAttribute('data-poliza-id', renovacionData.no_poliza);
    renovacionRow.setAttribute('href', '#');
    
    // Número de póliza
    const poliza = document.createElement('div');
    poliza.classList.add('proximas-renovaciones__contenedor');
    poliza.innerHTML = `
    <span class='proximas-renovaciones__contenedor-title base_body'>No. de póliza</span>
    <span class='proximas-renovaciones-row__numPoliza'>${renovacionData.no_poliza}</span>
    `;
    renovacionRow.appendChild(poliza);
    
    
    // Nombre del riesgo
    const riesgo = document.createElement('div');
    riesgo.classList.add('proximas-renovaciones__contenedor');
    riesgo.innerHTML = `
    <span class='proximas-renovaciones__contenedor-title base_body'>Nombre del riesgo</span>
    <span class='proximas-renovaciones-row__nombreRiesgo'>${renovacionData.nombre_riesgo}</span>
    `;
    renovacionRow.appendChild(riesgo);
    
    // Fecha de contrato
    const contrato = document.createElement('div');
    contrato.classList.add('proximas-renovaciones__contenedor');
    contrato.innerHTML = `
    <span class='proximas-renovaciones__contenedor-title base_body'>Fecha de contrato</span>
    <span class='proximas-renovaciones-row__fechaContrato'>${renovacionData.fecha_contrato.toLocaleDateString('es-ES')}</span>
    `;
    renovacionRow.appendChild(contrato);
    
    // Fecha de vencimiento
    const vencimiento = document.createElement('div');
    vencimiento.classList.add('proximas-renovaciones__contenedor');
    vencimiento.innerHTML = `
    <span class='proximas-renovaciones__contenedor-title base_body'>Fecha de Vencimiento</span>
    <span class='proximas-renovaciones-row__fechaVencimiento'>${renovacionData.fecha_vencimiento.toLocaleDateString('es-ES')}</span>
    `;
    renovacionRow.appendChild(vencimiento);
    
    // Importe
    const importeDiv = document.createElement('div');
    importeDiv.classList.add('proximas-renovaciones__contenedor');
    importeDiv.innerHTML = `
    <span class='proximas-renovaciones__contenedor-title base_body'>Importe</span>
    <span class='proximas-renovaciones-row__importe'>${renovacionData.importe}€</span>
    `;
    renovacionRow.appendChild(importeDiv);
    
    // Tag 
    const tag = renovacionTagDisplay(renovacionData.estado);
    renovacionRow.appendChild(tag);

    // Agregar Event Listener
    renovacionRow.addEventListener('click', ()=>{
        localStorage.setItem('selectedPoliza', JSON.stringify(renovacionContents));
        window.location.href = 'detalle_poliza.html';
    });
    
    return renovacionRow;
}

/**
 * Devuelve la tag correspondiente al dato pasado por parámetro
 * y dato por el contenido de una renovación
 * @param {string} renovacionState 
 * @returns {HTMLElement} tag
*/
function renovacionTagDisplay(renovacionState){
    // Diferentes estados de las etiquetas con su respectivo icono y clase de texto
    const estadosMap = {
        Pendiente: {
            icon: 'icon-clock-subtitle',
            textClass: 'base_body-tag--pendiente'
        },
        Pagada: {
            icon: 'icon-check-green',
            textClass: 'base_body-tag--pagada'
        },
        Vencido: {
            icon: 'icon-close-red',
            textClass: 'base_body-tag--vencido'
        },
        Expirada: {
            icon: 'icon-close-red',
            textClass: 'base_body-tag--vencido'
        },
        Vigente: {
            icon: 'icon-check-green',
            textClass: 'base_body-tag--pagada'
        },
    };
    
    const config = estadosMap[renovacionState];
    const stateLowerCase = renovacionState?.toLowerCase() || '';
    
    const tag = document.createElement('div');
    tag.classList.add('proxima-renovacion__tag');
    
    if (config) {
        tag.classList.add(`tag-${stateLowerCase}`);
    }
    
    // Definir contenidos de la tag y sus valores por defecto
    const iconClass = config?.icon || 'icon-close-red';
    const textClass = config?.textClass || 'base_body-tag--none';
    const text = renovacionState || 'Desconocido';
    
    tag.innerHTML = `
    <span class="${iconClass}"></span>
    <span class="${textClass}">${text}</span>
    `;

    return tag;
}

// ─── FILTROS ─────────────────────────────────────────────────────────────
/**
 * Genera una etiqueta por filtro aplicado con un icono de cierre para eliminar ese
 * mismo filtro de la búsqueda de pólizas
 * @param {string} filterContent 
 * @returns 
 */
function filterTagDisplay(filterKey, filterContent){
    const general_filter_tag = document.createElement('div');
    general_filter_tag.classList.add('general-filter-tag');
    general_filter_tag.dataset.key = filterKey;

    const textContent = document.createElement('span');
    textContent.classList.add('general-filter-tag__textContent');
    
    if(Array.isArray(filterContent)){
        // Texto del filtro (primer elemento del array)
        textContent.textContent = filterContent[0];
        general_filter_tag.appendChild(textContent);

        // Número de póliza multiselector
        const totalFiltersSelected = document.createElement('span');
        totalFiltersSelected.classList.add('general-filter-tag__totalFilters');
        totalFiltersSelected.textContent = '+' + (filterContent.length-1);
        general_filter_tag.appendChild(totalFiltersSelected);
        
    }else{
        // Texto del filtro
        textContent.textContent = filterContent;
        general_filter_tag.appendChild(textContent);
    }

    
    // Botón de eliminar filtro
    const close_button = document.createElement('button');
    close_button.classList.add('icon-close-white');
    general_filter_tag.appendChild(close_button);

    close_button.addEventListener('click', ()=>{
        deleteSpecificFilter(general_filter_tag.dataset.key);
        deleteFilterFromModal(general_filter_tag.dataset.key);
        updateFilter();
    });

    return general_filter_tag;
}