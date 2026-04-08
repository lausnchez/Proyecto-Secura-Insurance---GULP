const actual_page = document.body.dataset.page;
let original_data = [];
document.addEventListener('DOMContentLoaded', () => {
    loadPolizasData().then(data =>{
        original_data = data;

        const actualPage = document.body.dataset.page;
        console.log("Actual page: " + actualPage);
            
        // ─── PAGE HOME ─────────────────────────────────────────────────────────────
        if (actualPage === 'home') {
            const home_data = original_data.slice(0,3); // 3 primeros elementos
            displayDataHome(home_data);
        } 
        
        // ─── PAGE PRÓXIMAS RENOVACIONES ─────────────────────────────────────────────────────────────
        else if (actualPage === 'proximas-renovaciones') {
            const proximas_renovaciones_data = original_data.slice(0,10); // 10 primeros elementos
            displayDataProximasRenovaciones(proximas_renovaciones_data);
        }
    });
});

function displayDataHome(content){
    const container = document.querySelector('#prt-home .proximas-renovaciones-tabla__contents');
    content.forEach(element => {
        let row = displayRenovacion(element);
        container.appendChild(row);
    });
}

function displayDataProximasRenovaciones(content){
    const container = document.querySelector('#prt-proximas-renovaciones .proximas-renovaciones-tabla__contents');
    
}