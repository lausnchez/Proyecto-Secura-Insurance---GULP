
// ─── PAGE DETALLE POLIZA ─────────────────────────────────────────────────────────────

// let polizaActual = {"no_poliza":75844689,"nombre_riesgo":"Dacia Sandero","fecha_contrato":"2023-06-03","fecha_vencimiento":"2025-12-31","importe":23778.65,"estado_poliza":"Pagada"};
let personalInfo = {
    "no_poliza": 75844689,
    "CIF": "H59721886",
    "nombre": "Laura Sánchez",
    "d_fiscal": "Nueva 32",
    "d_direccion" : "CP LLUIS COMPANYS Nº 6, CL",
    "d_numero" : "3",
    "d_ciudad" : "Madrid",
    "d_cp" : "28915" 
};

let polizaActual;

function displayDetallePoliza(poliza) {
    polizaActual = poliza;
    
    updateDetallePolizaPageInfo();  // Page Info
    updateDetallePolizaTitular();   // Titular
    updateDetallePolizaDireccionFacturacion();  // Dirección de facturación
    displayDetallePolizasUltimasCuotas();   // Últimas cuotas

}

function updateDetallePolizaPageInfo(){
    // Elementos HTML
    const breadcrumbsNumPoliza = document.querySelector('#detalle-poliza-page-info__breadcrumbs__noPoliza');
    const titleNombreRiesgo = document.querySelector('#detalle-poliza-page-info__noRiesgo');
    const titleNumPoliza = document.querySelector('#detalle-poliza-page-info__noPoliza');
    
    // Update data
    breadcrumbsNumPoliza.textContent = polizaActual[0].no_poliza;
    titleNombreRiesgo.textContent = polizaActual[0].nombre_riesgo;
    titleNumPoliza.textContent = "No. de póliza: " + polizaActual[0].no_poliza;
}

function updateDetallePolizaTitular(){
    // Elementos HTML
    const t_cif = document.querySelector("#detalle-poliza-info-personalInfo-CIF-content");
    const t_nombre = document.querySelector("#detalle-poliza-info-personalInfo-nombre-content");
    const t_dfiscal = document.querySelector("#detalle-poliza-info-personalInfo-direccionFiscal-content");

    // Tag Display (comprobar vigencia con las fechas de contrato y vencimiento)
    let estado;
    if(polizaVigente(polizaActual.fecha_contrato, polizaActual.fecha_vencimiento)){
        estado = "Vigente";
    }else estado = "Vencido";

    const t_estado_container = document.querySelector("#detalle-poliza-card-personalInfo-estado");
    let t_estado_tag = renovacionTagDisplay(estado);
    t_estado_container.appendChild(t_estado_tag);

    // Update Data
    t_cif.textContent = personalInfo.CIF;
    t_nombre.textContent = personalInfo.nombre;
    t_dfiscal.textContent = personalInfo.d_fiscal;
}

function updateDetallePolizaDireccionFacturacion(){
    // Elementos HTML
    const pi_direccion = document.querySelector("#detalle-poliza-info-facturacion-direccion-content");
    const pi_numero = document.querySelector("#detalle-poliza-info-facturacion-numero-content");
    const pi_ciudad = document.querySelector("#detalle-poliza-info-facturacion-ciudad-content");
    const pi_cp = document.querySelector("#detalle-poliza-info-facturacion-cp-content");

    // Update Data
    pi_direccion.textContent = personalInfo.d_direccion;
    pi_numero.textContent =personalInfo.d_numero;
    pi_ciudad.textContent = personalInfo.d_ciudad;
    pi_cp.textContent = personalInfo.d_cp;
}

function displayDetallePolizasUltimasCuotas(){
    const container = document.querySelector(".detalle-poliza-u_cuotas__table");
    container.innerHTML = '';

    sortRenovaciones('fecha_emision', false, polizaActual);
    
    polizaActual.slice(0,3).forEach((poliza) =>{
        const newRow = displayRenovacionDetallePoliza(poliza);
        container.appendChild(newRow);
    });
}