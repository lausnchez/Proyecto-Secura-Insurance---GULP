
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
    updateMobileIcons();    // Icons en mobile
    addStateClassControl(); // Event listeners para el modo edición
    
    // Abrir edición en cada card individual
    toggleUpdateInputs('personalInfo');
    toggleUpdateInputs('facturacion');
    toggleUpdateInputsVariant('metodo-pago');
    toggleUpdateInputsVariant('dir-corresp');
    toggleUpdateInputsVariant('contacto');

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

function addStateClassControl(){
    const stateClass = "detalle-poliza-card--editMode";

    const updateButtons = document.querySelectorAll('.detalle-poliza__update-button');
    const saveButtons = document.querySelectorAll('.detalle-poliza__header-save-button, .detalle-poliza__save-button');

    // Botones de Update
    updateButtons.forEach((updateButton) =>{
        updateButton.addEventListener('click', (event)=>{
            const card = event.currentTarget.closest('.detalle-poliza-card');
            if(!card) return;
            const cardID = card.id.replace('detalle-poliza-card-', '');

            syncCardEditableFields(card, 'to-inputs');
            card.classList.add(stateClass);

            if(event.currentTarget.classList.contains('detalle-poliza__variant-update-button')){
                toggleUpdateInputsVariant(cardID);
            }
            else{
                toggleUpdateInputs(cardID);
            }
            
        });
    });

    // Botones de Save
    saveButtons.forEach((saveButton) =>{
        saveButton.addEventListener('click', (event)=>{
            const card = event.currentTarget.closest('.detalle-poliza-card');
            if(!card) return;
            const cardID = card.id.replace('detalle-poliza-card-', '');

            syncCardEditableFields(card, 'to-content');
            card.classList.remove(stateClass);

            if(event.currentTarget.classList.contains('detalle-poliza__variant-save-button')){
                toggleUpdateInputsVariant(cardID);
            }
            else{
                toggleUpdateInputs(cardID);
            }
        });
    });
}

function syncCardEditableFields(card, mode){
    const infoContainers = card.querySelectorAll('.detalle-poliza-info-container');

    infoContainers.forEach((container)=>{
        const title = container.querySelector('.detalle-poliza-info-container__title');
        const content = container.querySelector('.detalle-poliza-info-container__content');
        const input = container.querySelector('.detalle-poliza-info-container__input');

        if(!input || !content) return;

        if(mode === 'to-inputs'){
            // El titulo acompaña al input como referencia del campo
            if(title) input.setAttribute('placeholder', title.textContent.trim());

            const currentValue = content.textContent.trim();
            input.value = currentValue;
            return;
        }

        if(mode === 'to-content'){
            content.textContent = input.value.trim();
        }
    });
}

function toggleUpdateInputs(cardID){
    const stateClass = "detalle-poliza-card--editMode";
    const hiddenClass = "detalle-poliza-info-container__content--hidden";
    const hiddenUpdateClass = "detalle-poliza__header-save-button--hidden";
    const hiddenSaveClass = "detalle-poliza__header-save-button--hidden";

    const card = document.querySelector('#detalle-poliza-card-' + cardID);
    const updateButton = document.querySelector('#detalle-poliza__header-update-' + cardID);
    const saveButton = document.querySelector('#detalle-poliza__header-save-' + cardID);

    const inputs = document.querySelectorAll(`#detalle-poliza-card-${cardID} .detalle-poliza-info-container__input`);
    const labels = document.querySelectorAll(`#detalle-poliza-card-${cardID} .detalle-poliza-info-container__content`);
    
    if(!card) return false; // Comprobamos que la card existe

    // Estado de edición
    if(card.classList.contains(stateClass)){
        // Labels
        labels.forEach((label) =>{
            label.classList.add(hiddenClass);
        });
        // Inputs
        inputs.forEach((input)=>{
            input.classList.remove(hiddenClass);
        });
        // Buttons
        if(updateButton) updateButton.classList.add(hiddenUpdateClass);
        if(saveButton) saveButton.classList.remove(hiddenSaveClass);
    }
    // Estado de visualización
    else{
        // Labels
        labels.forEach((label) =>{
            label.classList.remove(hiddenClass);
        });
        // Inputs
        inputs.forEach((input)=>{
            input.classList.add(hiddenClass);
        });
        // Buttons
        if(updateButton) updateButton.classList.remove(hiddenUpdateClass);
        if(saveButton) saveButton.classList.add(hiddenSaveClass); 
    }
}

function toggleUpdateInputsVariant(cardID){
    const stateClass = "detalle-poliza-card--editMode";
    const hiddenClass = "detalle-poliza-info-container__content--hidden";
    const hiddenUpdateClass = "detalle-poliza__contents__edit--hidden";
    const hiddenSaveClass = "detalle-poliza__contents__edit--hidden";

    const card = document.querySelector('#detalle-poliza-card-' + cardID);
    const updateButton = document.querySelector('#detalle-poliza__variant-update-button-' + cardID);
    const saveButton = document.querySelector('#detalle-poliza__variant-save-button-' + cardID);

    const inputs = document.querySelectorAll(`#detalle-poliza-card-${cardID} .detalle-poliza-info-container__input`);
    const labels = document.querySelectorAll(`#detalle-poliza-card-${cardID} .detalle-poliza-info-container__content`);
    
    if(!card) return false; // Comprobamos que la card existe

    // Estado de edición
    if(card.classList.contains(stateClass)){
        // Labels
        labels.forEach((label) =>{
            label.classList.add(hiddenClass);
        });
        // Inputs
        inputs.forEach((input)=>{
            input.classList.remove(hiddenClass);
        });
        // Buttons
        if(updateButton) updateButton.classList.add(hiddenUpdateClass);
        if(saveButton) saveButton.classList.remove(hiddenSaveClass);
    }
    // Estado de visualización
    else{
        // Labels
        labels.forEach((label) =>{
            label.classList.remove(hiddenClass);
        });
        // Inputs
        inputs.forEach((input)=>{
            input.classList.add(hiddenClass);
        });
        // Buttons
        if(updateButton) updateButton.classList.remove(hiddenUpdateClass);
        if(saveButton) saveButton.classList.add(hiddenSaveClass); 
    }
}

function openUpdateInputsDirFacturacion(){

}

function openUpdateInputsMetodoPago(){
    
}

function openUpdateInputsDirCorrespondencia(){

}

function openUpdateInputsContacto(){

}

// FUNCIONES DE MOBILE
// ------------------------------------------------
function updateMobileIcons(){
    // Recoger los elementos
    const icons = document.querySelectorAll(".detalle-poliza__variant-update-button .general-update-button__icon");
    const mobileClass = 'icon-edit-red';
    const desktopClass = 'icon-edit';

    const mobileVariable = getComputedStyle(document.documentElement).getPropertyValue("--tablet");
    const mobileScreenWidth = parseInt(mobileVariable);

    // Cambiar de clase según el tamaño de la ventana
    function updateLayout() {
        icons.forEach((icon)=>{
            if (window.innerWidth <= mobileScreenWidth) {
                icon.classList.remove(desktopClass);
                icon.classList.add(mobileClass);
            } else {
                icon.classList.remove(mobileClass);
                icon.classList.add(desktopClass);
            }
        });
    }
    
    updateLayout();
    window.addEventListener("resize", updateLayout);
}