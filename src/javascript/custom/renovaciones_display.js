// ─── VALIDACIONES ─────────────────────────────────────────────────────────────

function validateRenovacionesContent(content) {
    
    const fecha_Hoy = new Date();
    const fecha_Vencimiento_Default = new Date(fecha_Hoy);
    fecha_Vencimiento_Default.setFullYear(fecha_Hoy.getFullYear() + 1);
    
    const parseDate = (value, fallback) => {
        if (!value) return fallback;
        const d = new Date(value);
        return isNaN(d.getTime()) ? fallback : d;
    };
    
    const parseImporte = (value) => {
        const val = parseFloat(value);
        return isNaN(val)
        ? '0'
        : val.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };
    
    return {
        no_poliza:        content?.no_poliza ?? '0',
        nombre_riesgo:    content?.nombre_riesgo ?? 'No definido',
        fecha_contrato:   parseDate(content?.fecha_contrato, fecha_Hoy),    // Fecha, fallback
        fecha_vencimiento: parseDate(content?.fecha_vencimiento, fecha_Vencimiento_Default),    // Fecha, fallback
        importe:          parseImporte(content?.importe),
        estado:           content?.estado_poliza ?? '',
    };
}

// ─── DISPLAY ─────────────────────────────────────────────────────────────

function displayRenovacion(renovacionContents){
    const renovacionData = validateRenovacionesContent(renovacionContents); // Validar datos previamente

    const renovacionRow = document.createElement('div');
    renovacionRow.classList.add('proximas-renovaciones-row');

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
    const tag = tagDisplay(renovacionData.estado);
    renovacionRow.appendChild(tag);

    return renovacionRow;
}


/**
 * Devuelve la tag correspondiente al dato pasado por parámetro
 * y dato por el contenido de una renovación
 * @param {string} renovacionState 
 * @returns {HTMLElement} tag
 */
function tagDisplay(renovacionState){
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
        }
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