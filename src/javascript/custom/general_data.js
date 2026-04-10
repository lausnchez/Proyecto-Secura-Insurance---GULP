/**
 * En éste archivo se encuentran todos los datos que necesitan ser volcados en
 * la página de alguna manera: filtros, selectores...
 */

// Datos necesarios para la paginación
let renovacionesCurrentPage = 1;
let renovacionesPerPage = 0;
let renovacionesMaxPages = 0;


// Datos necesarios para el filtrado
let filters = [
    {no_poliza: ['75846843']},
    {importe: '30.000'}
];

// Array para los datos del selector de orden en 'próximas renovaciones'
const selectorOptionsOrdenarData = [
    {value: 'no_poliza', content: 'No. de póliza'},
    {value: 'nombre_riesgo', content: 'Nombre del riesgo'},
    {value: 'fecha_vencimiento', content: 'Fecha de validez'},
    {value: 'importe', content: 'Importe'},
    {value: 'estado_poliza', content: 'Estado'},
];

// Array para los datos del selector de cantidad de pólizas mostradas en 'próximas-renovaciones'
const selectorCantidadPolizasData = [
    {value: '5', content: '5'},
    {value: '10', content: '10'},
    {value: '25', content: '25'},
    {value: '50', content: '50'},
    {value: '75', content: '75'},
    {value: '100', content: '100'},
];