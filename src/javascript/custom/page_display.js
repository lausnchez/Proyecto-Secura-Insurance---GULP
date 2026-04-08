const actual_page = document.body.dataset.page;
let original_data = [];
document.addEventListener('DOMContentLoaded', () => {
    loadPolizasData().then(data =>{
        original_data = data;

        const actualPage = document.body.dataset.page;
        console.log("Actual page: " + actualPage);
            
        // ─── PAGE HOME ─────────────────────────────────────────────────────────────
        if (actualPage === 'home') {
            const home_data = original_data.slice(0,3);
            displayDataHome(home_data);
        } 
        
        // ─── PAGE PRÓXIMAS RENOVACIONES ─────────────────────────────────────────────────────────────
        else if (actualPage === 'proximas-renovaciones') {
            const proximas_renovaciones_data = original_data.slice(0,10);
            displayDataProximasRenovaciones(proximas_renovaciones_data);
        }
    });
});

// ─── PAGE HOME ─────────────────────────────────────────────────────────────
function displayDataHome(content){
    const container = document.querySelector('#prt-home .proximas-renovaciones-tabla__contents');
    content.forEach(element => {
        let row = displayRenovacion(element);
        container.appendChild(row);
    });
}

// ─── PAGE PRÓXIMAS RENOVACIONES ─────────────────────────────────────────────────────────────
function displayDataProximasRenovaciones(content){
    // TABLA
    const table_container = document.querySelector('#prt-proximas-renovaciones .proximas-renovaciones-tabla__contents');
    content.forEach(element =>{
        let row = displayRenovacion(element);
        table_container.appendChild(row);
    });
    // NÚMERO DE PÓLIZAS CABECERA
    const num_polizas_cabecera = document.querySelector('.p-renovaciones-page-info__title-button .general-info-tag__textContent');
    num_polizas_cabecera.textContent = original_data.length + ' Pólizas';

    // NÚMERO DE PÓLIZAS
    const num_polizas = document.querySelector('.p-renovaciones__filter__num-selector span');
    num_polizas.textContent = original_data.length + ' Pólizas';
}