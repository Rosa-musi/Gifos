let contenedor = document.getElementById('sugTrend')
let verMasIndexTerms = document.getElementById('verMasIndexTerms')
let offsetTerms = 0
let limitTerms = 12


function trendingTerms(){
    async function getTrendingTerms() {
        const apikey = 't8p6p3sJzlMsg9EGCF7ynuBUk6YULEk1'
        const url = `http://api.giphy.com/v1/trending/searches?api_key=${apikey}` //apy key con variable de búsqueda
        const response = await fetch(url);  //me responde con el formato promesa
        var result = await response.json();  // lo parseo a json
        return result                   //este return me dará el archivo que obtuve en formato json
    }
    console.log(getTrendingTerms())
    let info = getTrendingTerms();   //mi resultado de la búsqueda usando la función searchGiphy más el valor del input
    info.then(json => {     
        let array = json.data                   
        let cortar = array.slice(0,5);
        console.log(cortar)
        let resultsHTML = ' '

        resultsHTML += `
        <p onclick="search2(this)" class="wordTrend" data-word=${cortar[0]}> ${cortar[0]}, </p>
        <p onclick="search2(this)" class="wordTrend" data-word=${cortar[1]}> ${cortar[1]}, </p>
        <p onclick="search2(this)" class="wordTrend" data-word=${cortar[2]}> ${cortar[2]}, </p>
        <p onclick="search2(this)" class="wordTrend" data-word=${cortar[3]}> ${cortar[3]}, </p>
        <p onclick="search2(this)" class="wordTrend" data-word=${cortar[4]}> ${cortar[4]} </p>
        
        `
        contenedor.innerHTML = resultsHTML
        
        
    }).catch(error => {                           //catch por si hay algún error del servidor
        console.log(error)
    }) 
}

trendingTerms() 

function search2(dep){
    async function searchGiphy(q) {
        const apikey = 't8p6p3sJzlMsg9EGCF7ynuBUk6YULEk1'
        const url = `http://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=${limitTerms}&offset=${offsetTerms}` //apy key con variable de búsqueda
        const response = await fetch(url);  //me responde con el formato promesa
        var result = await response.json();  // lo parseo a json
        let busqueda = dep.getAttribute("data-word");
        tittleSearcher.innerHTML = busqueda
        separador.style.display = "flex"
        return result                                //este return me dará el archivo que obtuve en formato json
    }
    console.log(searchGiphy())
    let busquedas = dep.getAttribute("data-word");
    console.log(busquedas)
    let info = searchGiphy(busquedas);
    console.log(info)   //mi resultado de la búsqueda usando la función searchGiphy más el valor del input
    info.then(json => {                          //un then para poner en pantalla los resultados si todo salió bien
        var resultsHTML = ' '
 
        json.data.forEach(gif => {
            console.log(gif.images.original.url)
            const url = gif.images.original.url
            const title = gif.title
                    
            resultsHTML += `

            <div class= "box2"> 
                <div class="imgBox"> 
                    <img onclick="maxCarMob(this)" src="${url}" alt="${title}">
                </div>
                <div class="content"> 
                    <div class="tarjeta_icons">
                        <img onclick="addToFavorites(this)" data-gif-id=${url} class="icon favoritear" src="imagenes/iconos/icon-fav-hover.svg" alt="">
                        <img onclick="descarga(this)" id="descarga"  class="icon descargar" src="imagenes/iconos/icon-download.svg" alt="">
                        <img class="icon desplegar" onclick="desplegarFavC(this)" data-gif-url=${url} data-gif-title=${title} src="imagenes/iconos/icon-max-normal.svg" alt="">
                    </div>
                    <div class="tarjeta_texto">
                        <p class="bold">${title}</p>  
                    </div>
                </div>
            </div>
            `
            
            resultsEl.innerHTML = resultsHTML
           
        })
        verMasIndex.style.display = "flex"
    }).catch(error => {                           //catch por si hay algún error del servidor
        console.log(error)
    })
    
}


contenedor.addEventListener('click', function (p) {
    searchInput.value = p.target.textContent;
    offsetTerms = offsetTerms + 12;
    limitTerms = limitTerms + 12;
    search2();
}) 