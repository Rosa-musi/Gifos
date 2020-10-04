const searchIcon = document.getElementById('lupa1')
const searchInput = document.getElementById('search-input')
const resultsEl = document.getElementById('searchResults')
const tittleSearcher = document.getElementById('tittleSearcher')
const separador = document.getElementById('separador')
const verMasIndex = document.getElementById('verMasIndex')
const apikey = 't8p6p3sJzlMsg9EGCF7ynuBUk6YULEk1' 
var offset = 0
var limit = 12


searchIcon.addEventListener('click', function(){ 
    var q = searchInput.value
    search(q)
})


searchInput.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        e.preventDefault()
        searchIcon.click();
    }
});

function search(){
    async function searchGiphy(q) {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=12&offset=${offset}` 
        const response = await fetch(url); 
        var result = await response.json();  
        tittleSearcher.innerHTML = searchInput.value 
        separador.style.display = "flex"
        return result                              
    }
    verMasNavBar.style.display = "none"
    let info = searchGiphy(searchInput.value);   
    info.then(json => {                     
        var resultsHTML = ' '
 
        json.data.forEach(gif => {
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
    }).catch(error => {                           
        console.log(error)
    })
    
}

verMasIndex.addEventListener('click', function(e){ 
    e.preventDefault()
    var q = searchInput.value
    offset = offset + 12
    limit = limit + 12
    searchMas(q)

})

function searchMas(){
    async function searchGiphy(q) {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=${limit}&offset=${offset}` 
        const response = await fetch(url);  
        var result = await response.json(); 
        tittleSearcher.innerHTML = searchInput.value 
        separador.style.display = "flex"
        return result                              
    }
    console.log(searchGiphy())
    let info = searchGiphy(searchInput.value);   
    info.then(json => {                     
        var resultsHTML = ' '
 
        json.data.forEach(gif => {
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
        
    }).catch(error => {                           
        console.log(error)
    })
    
}
