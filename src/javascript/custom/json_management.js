/**
 * Este archivo se encarga de manejar todo lo relativo al json principal de
 * datos y el manejo de esos propios datos.
 * 
 * Llama a todos los métodos necesarios al cargar los datos de la página,
 * como mostrar los datos recogidos en la tabla, paginación...
 */

const actual_page = document.body.dataset.page;
let original_renovaciones_data = [];

document.addEventListener('DOMContentLoaded', () => {
    loadPolizasData().then(data =>{
        original_renovaciones_data = data;

        const actualPage = document.body.dataset.page;
        console.log("Actual page: " + actualPage);
            
        // ─── PAGE HOME ─────────────────────────────────────────────────────────────
        if (actualPage === 'home') {
            const home_data = original_renovaciones_data.slice(0,3);
            displayRenovacionesDataHome(home_data);
            heroManagementHome();
        } 
        
        // ─── PAGE PRÓXIMAS RENOVACIONES ─────────────────────────────────────────────────────────────
        else if (actualPage === 'proximas-renovaciones') {
            const proximas_renovaciones_data = original_renovaciones_data.slice(0,renovacionesPerPage);
            updateMaxPages();
            displayDataProximasRenovaciones(proximas_renovaciones_data);
            paginatePolizasData();
        }
    });
});

// ─── CARGAR DATOS DEL JSON ─────────────────────────────────────────────────────────────
function loadPolizasData() {
    return fetch('assets/data/polizas.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos de pólizas cargados:', data.length);
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function paginatePolizasData(){
    let start = (renovacionesCurrentPage - 1) * renovacionesPerPage;
    let end = start + renovacionesPerPage;

    let paginacion = original_renovaciones_data.slice(start, end);
    return paginacion;
}

// ─── VALIDACIONES ─────────────────────────────────────────────────────────────

/**
 * Valida los datos que se le pasan antes de pintarlos en la página
 * para asegurarnos que no dan ningún tipo de problema
 * @param {*} content 
 * @returns 
 */
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