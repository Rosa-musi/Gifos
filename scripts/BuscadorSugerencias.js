
const divBusqueda = document.getElementById('titleSearcher_searcher');
const iconBuscar = document.getElementById('lupaBusqueda'); 
const btnCerrarBusqueda = document.getElementById('cerrarSugerencias'); 
const lupaBusquedaActiva = document.getElementById('lupaBusquedaActiva'); 
const divSugerencias = document.getElementById('divSugerencias');


searchInput.addEventListener('keyup', buscadorActivo);
function buscadorActivo() {
    busqueda = searchInput.value;
    /* Modificación de estilos -> Buscador pasa a estado ACTIVO */
    divBusqueda.classList.remove('titleSearcher_searcher');
    divBusqueda.classList.add('titleSearcher_searchActive');
    iconBuscar.style.display = "none";
    btnCerrarBusqueda.style.display = "block";
    lupaBusquedaActiva.style.display = "flex";
    /* Traigo SUGERENCIAS de términos desde la API */
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

/* BÚSQUEDA Cerrada */
btnCerrarBusqueda.addEventListener('click', limpiarBusqueda);
/* CLEAR del input y reset de estilos */
function limpiarBusqueda() {
    searchInput.value = "";  //esto no funciona si mi función cerrarBoxBusqueda está mal 
    divBusqueda.classList.add('titleSearcher_searcher');
    divBusqueda.classList.remove('titleSearcher_searchActive');
    divSugerencias.innerHTML = " "
    iconBuscar.style.display = "block";
    btnCerrarBusqueda.style.display = "none";
}

//Botón de búsqueda y enter para buscar
divSugerencias.addEventListener('click', function (li) {
    searchInput.value = li.target.textContent;
    search();
})


