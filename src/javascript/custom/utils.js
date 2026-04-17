/**
 * Comprueba si la fecha de hoy está entre las dos dadas
 * @param {*} fechaContrato 
 * @param {*} fechaVencimiento 
 * @returns boolean
 */
function polizaVigente(fechaContrato, fechaVencimiento){
    const inicio = new Date(fechaContrato);
    const final = new Date(fechaVencimiento);
    const hoy = new Date();

    if(hoy >= inicio && hoy <= final){
        return true;
    }else return false;
}