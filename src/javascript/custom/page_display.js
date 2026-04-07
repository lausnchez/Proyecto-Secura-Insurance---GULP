const actual_page = document.body.dataset.page;
let original_data = [];
document.addEventListener('DOMContentLoaded', () => {
    loadPolizasData().then(data =>{
        original_data = data;

        const actualPage = document.body.dataset.page;
        console.log("Actual page: " + actualPage);
            
        // ─── PAGE HOME ─────────────────────────────────────────────────────────────
        if (actualPage === 'home') {
            // Código específico para home
            console.log("Página actual: " + actualPage );
            const home_data = original_data.slice(0,3); // 3 primeros elementos
            console.log(home_data);
        } 
        
        // ─── PAGE PRÓXIMAS RENOVACIONES ─────────────────────────────────────────────────────────────
        else if (actualPage === 'proximas-renovaciones') {
            // Código específico para próximas renovaciones
            console.log("Página actual: " + actualPage );
            const home_data = original_data.slice(0,11); // 3 primeros elementos
            console.log(home_data);
        }
    });
});