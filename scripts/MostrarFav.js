
var FavContent = document.getElementById('favoritos_images');
const verMasFavoritos = document.getElementById('verMasFavoritos');
let fav = localStorage.getItem('data');   
let dataF = JSON.parse(fav)  
let limiteMinimo = 0
let limiteMaximo = 12

function mostFav(clase, btnVerMas, datosLocalS){
    if(localStorage.getItem('data') != null){ 

        clase.className = "otro";
        let resultsHTML = ' '

        if (datosLocalS.length <= 12) {
            datosLocalS.forEach(url => {
                resultsHTML += `
                <div class="box2"> 
                    <div class="imgBox"> 
                        <img onclick="maxFavMob(this)"src="${url}">
                    </div>
                    <div class="content"> 
                        <div class="tarjeta_icons">
                            <img class="icon fav_active" src="imagenes/iconos/icon-fav-active.svg" alt="">
                            <img class="icon" onclick="descargaOnClick(this)" data-gif-id="${url}" src="imagenes/iconos/icon-download.svg" alt="">
                            <img class="icon desplegar" onclick="desplegarFav(this)" data-gif-url="${url}" src="imagenes/iconos/icon-max-normal.svg" alt="">
                        </div>
                    </div>
                </div>
                `
                clase.innerHTML = resultsHTML 
            }); 
        } else if (datosLocalS.length > 12){
            btnVerMas.style.display = "flex";
            let cortoArray = datosLocalS.slice(0,12);
            cortoArray.forEach(url => {
                    resultsHTML += `
                    <div class="box2"> 
                        <div class="imgBox"> 
                            <img onclick="maxFavMob(this)"src="${url}">
                        </div>
                        <div class="content"> 
                            <div class="tarjeta_icons">
                                <img class="icon fav_active" src="imagenes/iconos/icon-fav-active.svg" alt="">
                                <img class="icon" onclick="descargaOnClick(this)" data-gif-id="${url}" src="imagenes/iconos/icon-download.svg" alt="">
                                <img class="icon desplegar" onclick="desplegarFav(this)" data-gif-url="${url}" src="imagenes/iconos/icon-max-normal.svg" alt="">
                            </div>
                        </div>
                    </div>
                    `
                    clase.innerHTML = resultsHTML 
                }); 
        }
    } 
    
}
            



mostFav(FavContent, verMasFavoritos, dataF)

verMasFavoritos.addEventListener('click', ()=>{
    limiteMinimo = limiteMinimo + 12;
    limiteMaximo = limiteMaximo + 12;
    desplegarBtnVerMasFav()
}) 



function desplegarBtnVerMasFav (){
    FavContent.className = "otro";
    let resultsHTML = ' '

    if (dataF.length > limiteMinimo && dataF.length <= limiteMaximo){
        verMasFavoritos.style.display = "none";
        dataF.forEach(url => {
            resultsHTML += `
            <div class="box2"> 
                <div class="imgBox"> 
                    <img onclick="maxFavMob(this)"src="${url}">
                </div>
                <div class="content"> 
                    <div class="tarjeta_icons">
                        <img class="icon fav_active" src="imagenes/iconos/icon-fav-active.svg" alt="">
                        <img class="icon" onclick="descargaOnClick(this)" data-gif-id="${url}" src="imagenes/iconos/icon-download.svg" alt="">
                        <img class="icon desplegar" onclick="desplegarFav(this)" data-gif-url="${url}" src="imagenes/iconos/icon-max-normal.svg" alt="">
                    </div>
                </div>
            </div>
            `
            FavContent.innerHTML = resultsHTML 
        }); 
    } else if (dataF.length > limiteMinimo && dataF.length > limiteMaximo){
        verMasFavoritos.style.display = "flex";
        let arrayCortado = dataF.slice(0,limiteMaximo)
        arrayCortado.forEach(url => {
            resultsHTML += `
            <div class="box2"> 
                <div class="imgBox"> 
                    <img onclick="maxFavMob(this)"src="${url}">
                </div>
                <div class="content"> 
                    <div class="tarjeta_icons">
                        <img class="icon fav_active" src="imagenes/iconos/icon-fav-active.svg" alt="">
                        <img class="icon" onclick="descargaOnClick(this)" data-gif-id="${url}" src="imagenes/iconos/icon-download.svg" alt="">
                        <img class="icon desplegar" onclick="desplegarFav(this)" data-gif-url="${url}" src="imagenes/iconos/icon-max-normal.svg" alt="">
                    </div>
                </div>
            </div>
            `
            FavContent.innerHTML = resultsHTML 
        }); 

    }
}
