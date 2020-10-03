const slider = document.getElementById('slider')

function trending(){
    async function trendingGiphy() {
        const apikey = 't8p6p3sJzlMsg9EGCF7ynuBUk6YULEk1'
        const url = `http://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=12` //apy key con variable de búsqueda
        const response = await fetch(url);  //me responde con el formato promesa
        var result = await response.json();  // lo parseo a json
        return result          
                 //este return me dará el archivo que obtuve en formato json
    }
    console.log(trendingGiphy())
    let info = trendingGiphy();   //mi resultado de la búsqueda usando la función searchGiphy más el valor del input
    let idDin = document.getElementsByClassName('DespCar').item(0); //getElementsBuClassName te regresa un HTML colection, es un objeto con todas las carácterísticas del tag donde está la clase, con "item(0)" accedo a las características y asi puedo sacar el id dinámico para cada div
    let idDin2 = idDin.id
    info.then(json => {                          //un then para poner en pantalla los resultados si todo salió bien
        var resultsHTML = ' '
 
        json.data.forEach(gif => {
            console.log(gif.images.original.url)
            const url = gif.images.original.url
            const title = gif.title
            resultsHTML += `
            <div class= "box">
                <div class="imagen">  
                    <img onclick="maxCarMob(this)" src="${url}" alt="${title}">
                </div>
                <div class="content"> 
                    <div class="tarjeta_icons">
                        <img onclick="addToFavorites(this)" data-gif-id="${url}" class="icon" src="imagenes/iconos/icon-fav-hover.svg" alt="">
                        <img class="icon fav_active" src="imagenes/iconos/icon-fav-active.svg" alt="">
                        <img class="icon" onclick="descargaOnClick(this)" data-gif-id="${url}" src="imagenes/iconos/icon-download.svg" alt="">
                        <img class="icon" data-gif-url="${url}" alt="${title}" data-gif-id="${idDin2}" onclick="desplegarFavC(this)" src="imagenes/iconos/icon-max-normal.svg" >
                    </div>
                    <div class="tarjeta_texto">
                        <p class="bold">${title}</p>  
                    </div>
                </div>
            </div>
            `
        slider.innerHTML = resultsHTML
        })
       
    }).catch(error => {                           //catch por si hay algún error del servidor
        console.log(error)
    })
}

trending() 