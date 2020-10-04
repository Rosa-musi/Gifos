
const divBusqueda = document.getElementById('titleSearcher_searcher');
const iconBuscar = document.getElementById('lupaBusqueda'); 
const btnCerrarBusqueda = document.getElementById('cerrarSugerencias'); 
const lupaBusquedaActiva = document.getElementById('lupaBusquedaActiva'); 
const divSugerencias = document.getElementById('divSugerencias');


searchInput.addEventListener('keyup', buscadorActivo);
function buscadorActivo() {
    busqueda = searchInput.value;
    divBusqueda.classList.remove('titleSearcher_searcher');
    divBusqueda.classList.add('titleSearcher_searchActive');
    iconBuscar.style.display = "none";
    btnCerrarBusqueda.style.display = "block";
    lupaBusquedaActiva.style.display = "flex";
    if (busqueda.length >= 1) {
        async function sug () {
            const url = `https://api.giphy.com/v1/tags/related/${busqueda}?api_key=${apikey}&limit=4`
            const response = await fetch(url);
            var result = await response.json(); 
            return result
        }
        let info = sug()
        info.then(data => {
            sugerenciasData(data);
        })
        .catch(error => {
            console.error("Error: ", error);
        })
    } else {
        cerrarBoxBusqueda(); 
    }
}

function sugerenciasData(data) {
    let sugerencia = data.data;
    
    divSugerencias.innerHTML = `
    <hr>
    <ul class="ulSugerencias" id="ulSugerencias">
        <li class="liSugerencia">
            <i class="fas fa-search sugerenciaLiLupaGris"></i>
            <p class="buscador-sugerencia-texto" >${sugerencia[0].name}</p>
        </li>
        <li class="liSugerencia">
            <i class="fas fa-search sugerenciaLiLupaGris"></i>
            <p class="buscador-sugerencia-texto" >${sugerencia[1].name}</p>
        </li>
        <li class="liSugerencia">
            <i class="fas fa-search sugerenciaLiLupaGris"></i>
            <p class="buscador-sugerencia-texto" >${sugerencia[2].name}</p>
        </li>
        <li class="liSugerencia">
            <i class="fas fa-search sugerenciaLiLupaGris"></i>
            <p class="buscador-sugerencia-texto" >${sugerencia[3].name}</p>
        </li>
    </ul>`;
}

function cerrarBoxBusqueda () {
    divBusqueda.classList.add('titleSearcher_searcher');
    divBusqueda.classList.remove('titleSearcher_searchActive');
    divSugerencias.innerHTML = " "
    iconBuscar.style.display = "block";
    btnCerrarBusqueda.style.display = "none";
} 

btnCerrarBusqueda.addEventListener('click', limpiarBusqueda);

function limpiarBusqueda() {
    searchInput.value = "";  
    divBusqueda.classList.add('titleSearcher_searcher');
    divBusqueda.classList.remove('titleSearcher_searchActive');
    divSugerencias.innerHTML = " "
    iconBuscar.style.display = "block";
    btnCerrarBusqueda.style.display = "none";
}


divSugerencias.addEventListener('click', function (li) {
    searchInput.value = li.target.textContent;
    search();
})
