

const searchIcon = document.getElementById('lupa1')
const searchInput = document.getElementById('search-input')
const resultsEl = document.getElementById('searchResults')
const tittleSearcher = document.getElementById('tittleSearcher')
const separador = document.getElementById('separador')
const verMasIndex = document.getElementById('verMasIndex')
const apikey = 't8p6p3sJzlMsg9EGCF7ynuBUk6YULEk1' 
var offset = 0
var limit = 12

//Búsqueda con ícono de buscar
searchIcon.addEventListener('click', function(){ 
    var q = searchInput.value
    search(q)
})

//Búsqueda con el enter
searchInput.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        e.preventDefault()
        searchIcon.click();
    }
});

function search(){
    async function searchGiphy(q) {
        const url = `http://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=12&offset=${offset}` //apy key con variable de búsqueda
        const response = await fetch(url);  //me responde con el formato promesa
        var result = await response.json();  // lo parseo a json
        tittleSearcher.innerHTML = searchInput.value //cambio el valor del título de las búsquedas
        separador.style.display = "flex"
        return result                                //este return me dará el archivo que obtuve en formato json
    }
    console.log(searchGiphy())
    let info = searchGiphy(searchInput.value);   //mi resultado de la búsqueda usando la función searchGiphy más el valor del input
    info.then(json => {                          //un then para poner en pantalla los resultados si todo salió bien
        var resultsHTML = ' '
 
        json.data.forEach(gif => {
            console.log(gif.images.original.url)
            const url = gif.images.original.url
            const title = gif.title  
            
            resultsHTML += `

            <div class= "box2"> 
                <div class="imgBox"> 
                    <img  onclick="maxCarMob(this)" src="${url}" alt="${title}">
                </div>
                <div class="content"> 
                    <div class="tarjeta_icons">
                        <img onclick="addToFavorites(this)" data-gif-id="${url}" class="icon favoritear" src="imagenes/iconos/icon-fav-hover.svg" alt="">
                        <img onclick="descargaOnClick(this)" data-gif-id="${url}"  class="icon descargar" src="imagenes/iconos/icon-download.svg" alt="">
                        <img class="icon desplegar" onclick="desplegarFavC(this)" data-gif-url="${url}" data-gif-title="${title}" src="imagenes/iconos/icon-max-normal.svg" alt="">
                    </div>
                    <div class="tarjeta_texto">
                        <p class="bold">${title}</p>  
                    </div>
                </div>
            </div>
            `
            resultsEl.innerHTML = resultsHTML
        })
        if(json.data == 0) {
            resultsEl.classList.remove('searchResults');
            resultsEl.classList.add('sinResults');
            resultsEl.innerHTML = `
            <div class="BusqSinResultados">
                <img src="imagenes/iconos/icon-busqueda-sin-resultado.svg">
                <p>Intenta con otra búsqueda.</p>   
            </div>
            `
        }
        verMasIndex.style.display = "flex"
    }).catch(error => {                           //catch por si hay algún error del servidor
        console.log(error)
    })
    
}



verMasIndex.addEventListener('click', function(e){ //aquí no tenemos que obtener el id del botón porque con el evento submit lo hace por defecto
    e.preventDefault()
    var q = searchInput.value
    offset = offset + 12
    limit = limit + 12
    searchMas(q)

})

function searchMas(){
    async function searchGiphy(q) {
        const url = `http://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=${limit}&offset=${offset}` //apy key con variable de búsqueda
        const response = await fetch(url);  //me responde con el formato promesa
        var result = await response.json();  // lo parseo a json
        tittleSearcher.innerHTML = searchInput.value //cambio el valor del título de las búsquedas
        separador.style.display = "flex"
        return result                                //este return me dará el archivo que obtuve en formato json
    }
    console.log(searchGiphy())
    let info = searchGiphy(searchInput.value);   //mi resultado de la búsqueda usando la función searchGiphy más el valor del input
    info.then(json => {                          //un then para poner en pantalla los resultados si todo salió bien
        var resultsHTML = ' '
 
        json.data.forEach(gif => {
            console.log(gif.images.original.url)
            const url = gif.images.original.url
            const title = gif.title  
            
            resultsHTML += `

            <div class= "box2"> 
                <div class="imgBox"> 
                    <img  onclick="maxBuscMob(this)" src="${url}" alt="${title}">
                </div>
                <div class="content"> 
                    <div class="tarjeta_icons">
                        <img onclick="addToFavorites(this)" data-gif-id="${url}" class="icon favoritear" src="imagenes/iconos/icon-fav-hover.svg" alt="">
                        <img onclick="descargaOnClick(this)" data-gif-id="${url}"  class="icon descargar" src="imagenes/iconos/icon-download.svg" alt="">
                        <img class="icon desplegar" onclick="desplegar(this)" data-gif-url="${url}" data-gif-title="${title}" src="imagenes/iconos/icon-max-normal.svg" alt="">
                    </div>
                    <div class="tarjeta_texto">
                        <p class="bold">${title}</p>  
                    </div>
                </div>
            </div>
            `
            resultsEl.innerHTML = resultsHTML
        })
         if(json.data == 0) {
            resultsEl.classList.remove('searchResults');
            resultsEl.classList.add('sinResults');
            resultsEl.innerHTML = `
            <div class="BusqSinResultados">
                <img src="imagenes/iconos/icon-busqueda-sin-resultado.svg">
                <p>Intenta con otra búsqueda.</p>   
            </div>
            `
            verMasIndex.style.display = "none"
        } 
        
    }).catch(error => {                           //catch por si hay algún error del servidor
        console.log(error)
    })
    
}
