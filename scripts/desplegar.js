 let close = document.getElementById('close');
 let divDesplegar = document.getElementById('desplegarID')
 let imgMax = document.getElementById('img_max')
 let tituloMax = document.getElementById('max_titulo')
 


function desplegarFav(esteNodo){
    let closeF = document.getElementById('closeF')
    let divDesplegarFav = document.getElementById('favDesplegarID')
    let url = esteNodo.getAttribute("data-gif-url");
    let title = esteNodo.getAttribute("data-gif-title");
    imgMax.src = url;
    tituloMax.innerText = title
    divDesplegarFav.style.display = "flex"
    closeF.addEventListener('click', () =>{
        divDesplegarFav.style.display = "none"
    })

    let maxFav = document.getElementById('maxFavFav');
    let maxImg = document.getElementById('img_max').src;
    let maxDesc = document.getElementById('maxDescFav');



    maxFav.addEventListener('click', ()=>{
        let new_data = maxImg
        if(localStorage.getItem('data') == null){
            localStorage.setItem('data', '[]');
        }
        let old_data = JSON.parse(localStorage.getItem('data'));
       
        old_data.push(new_data);
    
        localStorage.setItem('data', JSON.stringify(old_data));  
    })

    maxDesc.addEventListener('click', ()=>{
        let url = maxImg
        downloadCreatedGif(url)
    })
}


function maxFavMob (esteNodo) {

    esteNodo.addEventListener('click', () =>{ 
        let closeF = document.getElementById('closeF')
        let divDesplegarFav = document.getElementById('favDesplegarID')
        let title = esteNodo.getAttribute("data-gif-title");
        let url = esteNodo.getAttribute("src");

        imgMax.src = url;
        tituloMax.innerText = title
        divDesplegarFav.style.display = "flex"
        closeF.addEventListener('click', () =>{
            divDesplegarFav.style.display = "none"
        })

        let maxFav = document.getElementById('maxFavFav');
        let maxImg = document.getElementById('img_max').src;
        let maxDesc = document.getElementById('maxDescFav');

        maxFav.addEventListener('click', ()=>{
            let new_data = maxImg
            if(localStorage.getItem('data') == null){
                localStorage.setItem('data', '[]');
            }
            let old_data = JSON.parse(localStorage.getItem('data'));
        
            old_data.push(new_data);
        
            localStorage.setItem('data', JSON.stringify(old_data));  
        })

        maxDesc.addEventListener('click', ()=>{
            let url = maxImg
            downloadCreatedGif(url)
        })
    })
} 


function desplegarFavC(esteNodo){

    let url = esteNodo.getAttribute("data-gif-url");
    let title = esteNodo.getAttribute("alt");
    var resultsHTML = ' '
    let index = document.getElementById("aLlorar")
    let favoritos = document.getElementById("aLlorar1")
    let misGifos = document.getElementById("aLlorar2")
    
    resultsHTML += `
    <div id="no_desplegar" class="modalCar">
        <div class="container_desplegar_trending">
            <img id="close_f" class="closeButton_t" src="imagenes/iconos/close.svg" alt="">
            <img class="imgCar" src="${url}" alt="cat">
            <div class="max_datosF">
                <p class="max_tituloF" >${title}</p>
                <div class="max_iconsF">
                    <img  class="icon_maxF max_favF" onclick="addToFavorites(this)" data-gif-id="${url}" src="imagenes/iconos/icon-fav-hover.svg" alt="favoritos">
                    <img  class="icon_maxF max_descF"  onclick="descargaOnClick(this)" data-gif-id="${url}" src="imagenes/iconos/icon-download.svg" alt="">
                </div>
            </div>
        </div>  
    </div>
    `
    if(index !== null){
        index.innerHTML = resultsHTML
    } else if (favoritos !== null) {
        favoritos.innerHTML = resultsHTML
    } else if (misGifos !== null){
        misGifos.innerHTML = resultsHTML
    }
    
    let no_desplegar = document.getElementById('no_desplegar')
    let close = document.getElementById('close_f')
    close.addEventListener('click', () =>{
        no_desplegar.style.display = "none"
    }) 

}



function maxCarMob(esteNodo) {
    
    esteNodo.addEventListener('click', () =>{ 
        let url = esteNodo.getAttribute("src");
        let title = esteNodo.getAttribute("alt");
        var resultsHTML = ' '
        let index = document.getElementById("aLlorar")
        let favoritos = document.getElementById("aLlorar1")
        let misGifos = document.getElementById("aLlorar2")
        
        resultsHTML += `
        <div id="no_desplegar" class="modalCar">
            <div class="container_desplegar_trending">
                <img id="close_f" class="closeButton_t" src="imagenes/iconos/close.svg" alt="">
                <img class="imgCar" src="${url}" alt="cat">
                <div class="max_datosF">
                    <p class="max_tituloF" >${title}</p>
                    <div class="max_iconsF">
                        <img  class="icon_maxF max_favF" onclick="addToFavorites(this)" data-gif-id="${url}" src="imagenes/iconos/icon-fav-hover.svg" alt="favoritos">
                        <img  class="icon_maxF max_descF"  onclick="descargaOnClick(this)" data-gif-id="${url}" src="imagenes/iconos/icon-download.svg" alt="">
                    </div>
                </div>
            </div>  
        </div>
        `
        if(index !== null){
            index.innerHTML = resultsHTML
        } else if (favoritos !== null) {
            favoritos.innerHTML = resultsHTML
        } else if (misGifos !== null){
            misGifos.innerHTML = resultsHTML
        }
        
        let no_desplegar = document.getElementById('no_desplegar')
        let close = document.getElementById('close_f')
        close.addEventListener('click', () =>{
            no_desplegar.style.display = "none"
        }) 
    })
} 
