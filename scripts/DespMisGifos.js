
const MisGifosContent = document.getElementById('toldYa'); 
const btnMisGifos = document.getElementById('verMasMisGifos'); 
let favMisGifos = localStorage.getItem('MisGifos'); 
let dataMisGifos = JSON.parse(favMisGifos) 
const descargaMisGifos = document.getElementById('maxDescMisGifos')
let limiteMinimoMG = 0
let limiteMaximoMG = 12


mostFavMisGifos(MisGifosContent, btnMisGifos, dataMisGifos)

function mostFavMisGifos(clase, btnVerMas, datosLocalS){
    if(localStorage.getItem('MisGifos') != null){ 
        MisGifosContent.className = "otro";
        let resultsHTML = ' '

        if (datosLocalS.length <= 12) {
            clase.className = "otro";
            datosLocalS.forEach(url => {
                resultsHTML += `
                <div class="box2"> 
                    <div class="imgBox"> 
                        <img class="imgMisGifos" onclick="maxMobMisG(this)"src="${url}">
                    </div>
                    <div class="content"> 
                        <div class="tarjeta_icons">
                            <img class="icon borrar" onclick="borrarMiGif(this)" data-gif-id="${url}" src="imagenes/iconos/icon-trash-normal.svg" alt="borrar">
                            <img class="icon descargar" onclick="descargaOnClick(this)" data-gif-id="${url}" src="imagenes/iconos/icon-download.svg" alt="">
                            <img class="icon desplegar" onclick="desplegarMisGifs(this)" data-gif-url="${url}" src="imagenes/iconos/icon-max-normal.svg" alt="">
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
                            <img class="imgMisGifos" onclick="maxMobMisG(this)"src="${url}">
                        </div>
                        <div class="content"> 
                            <div class="tarjeta_icons">
                                <img class="icon borrar" onclick="borrarMiGif(this)" data-gif-id="${url}" src="imagenes/iconos/icon-trash-normal.svg" alt="borrar">
                                <img class="icon descargar" onclick="descargaOnClick(this)" data-gif-id="${url}" src="imagenes/iconos/icon-download.svg" alt="">
                                <img class="icon desplegar" onclick="desplegarMisGifs(this)" data-gif-url="${url}" src="imagenes/iconos/icon-max-normal.svg" alt="">
                            </div>
                        </div>
                    </div>
                    `
                    clase.innerHTML = resultsHTML 
                }); 
        }
    }
}


function desplegarMisGifs(esteNodo){
    let closeF = document.getElementById('closeMisG')
    let divDesplegarFav = document.getElementById('misGifosDesplegarID')
    let url = esteNodo.getAttribute("data-gif-url");
    let imgMax = document.getElementById("img_max");
    let maxDesc = document.getElementById('maxDescMisGifos');
    let maxBorrar = document.getElementById('maxBorrarMisGifos');

    imgMax.src = url;
    divDesplegarFav.style.display = "flex"
    closeF.addEventListener('click', () =>{
        divDesplegarFav.style.display = "none"
    })

    maxDesc.addEventListener('click', ()=>{
        downloadCreatedGif(url)
    })
    const index = dataMisGifos.findIndex(number => number === url)
    maxBorrar.addEventListener('click', ()=>{
    
        let old_data = JSON.parse(localStorage.getItem('MisGifos'));
        old_data.splice(index, 1);
        localStorage.setItem('MisGifos', JSON.stringify(old_data));  
    }) 

}



function maxMobMisG(esteNodo) {

    esteNodo.addEventListener('click', () =>{ 

        let closeF = document.getElementById('closeMisG')
        let divDesplegarFav = document.getElementById('misGifosDesplegarID')
        let url = esteNodo.getAttribute("src");
        let imgMax = document.getElementById("img_max")
        let maxDesc = document.getElementById('maxDescMisGifos');
        let maxBorrar = document.getElementById('maxBorrarMisGifos');
        
        imgMax.src = url;
        divDesplegarFav.style.display = "flex"
        closeF.addEventListener('click', () =>{
            divDesplegarFav.style.display = "none"
        })

        maxDesc.addEventListener('click', ()=>{
            downloadCreatedGif(url)
        })

        const index = dataMisGifos.findIndex(number => number === url)
        maxBorrar.addEventListener('click', ()=>{
            let new_data = index;
            let old_data = JSON.parse(localStorage.getItem('MisGifos'));
            old_data.splice(new_data, 1);
            localStorage.setItem('MisGifos', JSON.stringify(old_data));  
         })
    })
} 



function borrarMiGif(esteNodo){
    let url = esteNodo.getAttribute("data-gif-id");
    let old_data = JSON.parse(localStorage.getItem('MisGifos'));
    const index = old_data.findIndex(number => number === url)
    let new_data = index;

    old_data.splice(new_data, 1);
    localStorage.setItem('MisGifos', JSON.stringify(old_data));    

}

function SinContenidoMisGifos (){
    let old_data = JSON.parse(localStorage.getItem('MisGifos'));
    if (old_data.length == 0){
        MisGifosContent.className = "misGifos_images";
    }
}

SinContenidoMisGifos()


btnMisGifos.addEventListener('click', ()=>{
    limiteMinimoMG = limiteMinimoMG + 12;
    limiteMaximoMG = limiteMaximoMG + 12;
    desplegarBtnVerMasMG()
}) 


function desplegarBtnVerMasMG (){
    MisGifosContent.className = "otro";
    let resultsHTML = ' '

    if (dataMisGifos.length > limiteMinimoMG && dataMisGifos.length <= limiteMaximoMG){
        btnMisGifos.style.display = "none";
        dataMisGifos.forEach(url => {
            resultsHTML += `
            <div class="box2"> 
            <div class="imgBox"> 
                <img class="imgMisGifos" onclick="maxMobMisG(this)"src="${url}">
            </div>
            <div class="content"> 
                <div class="tarjeta_icons">
                    <img class="icon borrar" onclick="borrarMiGif(this)" data-gif-id="${url}" src="imagenes/iconos/icon-trash-normal.svg" alt="borrar">
                    <img class="icon descargar" onclick="descargaOnClick(this)" data-gif-id="${url}" src="imagenes/iconos/icon-download.svg" alt="">
                    <img class="icon desplegar" onclick="desplegarMisGifs(this)" data-gif-url="${url}" src="imagenes/iconos/icon-max-normal.svg" alt="">
                </div>
            </div>
        </div>
            `
            MisGifosContent.innerHTML = resultsHTML 
        }); 
    } else if (dataMisGifos.length > limiteMinimoMG && dataMisGifos.length > limiteMaximoMG){
        btnMisGifos.style.display = "flex";
        let arrayCortado = dataMisGifos.slice(0,limiteMaximoMG)
        arrayCortado.forEach(url => {
            resultsHTML += `
            <div class="box2"> 
            <div class="imgBox"> 
                <img class="imgMisGifos" onclick="maxMobMisG(this)"src="${url}">
            </div>
            <div class="content"> 
                <div class="tarjeta_icons">
                    <img class="icon borrar" onclick="borrarMiGif(this)" data-gif-id="${url}" src="imagenes/iconos/icon-trash-normal.svg" alt="borrar">
                    <img class="icon descargar" onclick="descargaOnClick(this)" data-gif-id="${url}" src="imagenes/iconos/icon-download.svg" alt="">
                    <img class="icon desplegar" onclick="desplegarMisGifs(this)" data-gif-url="${url}" src="imagenes/iconos/icon-max-normal.svg" alt="">
                </div>
            </div>
        </div>
            `
            MisGifosContent.innerHTML = resultsHTML 
        }); 

    }
}
