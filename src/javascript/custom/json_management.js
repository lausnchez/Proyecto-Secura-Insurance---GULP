// RECOGER LOS DATOS TOTALES DE LAS PÓLIZAS
// ---------------------------------------------------------------------------

function loadTotalPolizasData() {
    return fetch('assets/data/polizas.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo JSON');
        }
        return response.json();
    })
    .then(data => {
        console.log('Datos de pólizas cargados:', data);
        return data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

loadTotalPolizasData();
// loadTotalPolizasData().then(polizas => {
    
// });

// RECOGER DATOS DE LAS PÓLIZAS FILTRADOS
// ---------------------------------------------------------------------------

