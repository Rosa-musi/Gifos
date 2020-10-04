const slider = document.getElementById('slider')

function trending(){
    async function trendingGiphy() {
        const apikey = 't8p6p3sJzlMsg9EGCF7ynuBUk6YULEk1'
        const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=12` 
        const response = await fetch(url);  
        var result = await response.json();  
        return result          
    }
    let info = trendingGiphy();   
    let idDin = document.getElementsByClassName('DespCar').item(0); 
    let idDin2 = idDin.id
    info.then(json => {                         
        var resultsHTML = ' '
 
        json.data.forEach(gif => {
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
       
    }).catch(error => {                           
        console.log(error)
    })
}

trending()  
