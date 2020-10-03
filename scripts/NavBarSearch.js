//Variables
const navSearch = document.getElementById('titleSearcher_searcherNav');
const verMasNavBar = document.getElementById('verMasNavBar');
let offsetBar = 0
let limitBar = 12


window.addEventListener('scroll', () => {
    const scrollPX = window.scrollY;
     if(scrollPX > 20){
         navSearch.style.display = 'flex';
     }else{
        navSearch.style.display = 'none';
     }
});

const searchIconNav = document.getElementById('lupaBusquedaNav')
const searchInputNav = document.getElementById('search-inputNav')


//Búsqueda con ícono de buscar
searchIconNav.addEventListener('click', function(){ 
    var q = searchInputNav.value
    search3(q)
}) 

//Búsqueda con el enter
searchInputNav.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        e.preventDefault()
        searchIconNav.click();
    }
});


function search3(){
    async function searchGiphy(q) {
        const url = `http://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=12&offset=${offset}` //apy key con variable de búsqueda
        const response = await fetch(url);  //me responde con el formato promesa
        var result = await response.json();  // lo parseo a json
        tittleSearcher.innerHTML = searchInputNav.value //cambio el valor del título de las búsquedas
        separador.style.display = "flex"
        return result                                //este return me dará el archivo que obtuve en formato json
    }
    console.log(searchGiphy())
    let info = searchGiphy(searchInputNav.value);   //mi resultado de la búsqueda usando la función searchGiphy más el valor del input
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
        verMasNavBar.style.display = "flex"
    }).catch(error => {                           //catch por si hay algún error del servidor
        console.log(error)
    })
    
}



verMasNavBar.addEventListener('click', function(e){ //aquí no tenemos que obtener el id del botón porque con el evento submit lo hace por defecto
    e.preventDefault()
    var q = searchInputNav.value
    offsetBar = offsetBar + 12
    limitBar = limitBar + 12
    searchMas3(q)

})

function searchMas3(){
    async function searchGiphy(q) {
        const url = `http://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=${limitBar}&offset=${offsetBar}` //apy key con variable de búsqueda
        const response = await fetch(url);  //me responde con el formato promesa
        var result = await response.json();  // lo parseo a json
        tittleSearcher.innerHTML = searchInputNav.value //cambio el valor del título de las búsquedas
        separador.style.display = "flex"
        return result                                //este return me dará el archivo que obtuve en formato json
    }
    console.log(searchGiphy())
    let info = searchGiphy(searchInputNav.value);   //mi resultado de la búsqueda usando la función searchGiphy más el valor del input
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
            verMasNavBar.style.display = "none"
        }
        
    }).catch(error => {                           //catch por si hay algún error del servidor
        console.log(error)
    })
    
}