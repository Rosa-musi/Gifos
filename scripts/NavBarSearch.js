
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



searchIconNav.addEventListener('click', function(){ 
    var q = searchInputNav.value
    search3(q)
}) 


searchInputNav.addEventListener('keyup', function(e) {
    if (e.keyCode === 13) {
        e.preventDefault()
        searchIconNav.click();
    }
});


function search3(){
    async function searchGiphy(q) {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=12&offset=${offset}` 
        const response = await fetch(url);  
        var result = await response.json();  
        tittleSearcher.innerHTML = searchInputNav.value 
        separador.style.display = "flex"
        return result                                
    }
    verMasIndex.style.display = "none";
    let info = searchGiphy(searchInputNav.value);   
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
    }).catch(error => {                           
        console.log(error)
    })
    
}



verMasNavBar.addEventListener('click', function(e){ 
    e.preventDefault()
    var q = searchInputNav.value
    offsetBar = offsetBar + 12
    limitBar = limitBar + 12
    searchMas3(q)

})

function searchMas3(){
    async function searchGiphy(q) {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=${limitBar}&offset=${offsetBar}` 
        const response = await fetch(url);  
        var result = await response.json();  
        tittleSearcher.innerHTML = searchInputNav.value 
        separador.style.display = "flex"
        return result                               
    }
    console.log(searchGiphy())
    let info = searchGiphy(searchInputNav.value);   
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
        
    }).catch(error => {                           
        console.log(error)
    })
    
}
