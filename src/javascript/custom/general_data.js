/**
 * En éste archivo se encuentran todos los datos que necesitan ser volcados en
 * la página de alguna manera: filtros, selectores...
 */

// Array para los datos del selector de orden en 'próximas renovaciones'
const selectorOptionsOrdenarData = [
    {value: 'no-poliza', content: 'No. de póliza'},
    {value: 'nombre-riesgo', content: 'Nombre del riesgo'},
    {value: 'fecha-validez', content: 'Fecha de validez'},
    {value: 'importe', content: 'Importe'},
    {value: 'estado', content: 'Estado'},
];

// Array para los datos del selector de cantidad de pólizas mostradas en 'próximas-renovaciones'
const selectorCantidadPolizasData = [
    {value: '3', content: '3'},
    {value: '5', content: '5'},
    {value: '10', content: '10'},
    {value: '25', content: '25'},
    {value: '50', content: '50'},
    {value: '75', content: '75'},
    {value: '100', content: '100'},
];