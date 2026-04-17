
// ─── PAGE DETALLE POLIZA ─────────────────────────────────────────────────────────────

// let polizaActual = {"no_poliza":75844689,"nombre_riesgo":"Dacia Sandero","fecha_contrato":"2023-06-03","fecha_vencimiento":"2025-12-31","importe":23778.65,"estado_poliza":"Pagada"};
let polizaActual;

function displayDetallePoliza(poliza) {
    polizaActual = poliza;
    updateDataDetallePolizaInfo(polizaActual);
}

function updateDataDetallePolizaInfo(){
    // Elementos HTML
    const breadcrumbsNumPoliza = document.querySelector('#detalle-poliza-page-info__breadcrumbs__noPoliza');
    const titleNombreRiesgo = document.querySelector('#detalle-poliza-page-info__noRiesgo');
    const titleNumPoliza = document.querySelector('#detalle-poliza-page-info__noPoliza');
    
    // Update data
    breadcrumbsNumPoliza.textContent = polizaActual.no_poliza;
    titleNombreRiesgo.textContent = polizaActual.nombre_riesgo;
    titleNumPoliza.textContent = "No. de póliza: " + polizaActual.no_poliza;
}
