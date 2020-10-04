function descarga() {
    descarga = document.getElementsByClassName('descargar');

   for (boton of descarga){
        boton.addEventListener('click', () =>{
            let icono = boton.getAttribute("data-gif-id")  
            downloadCreatedGif(icono)
            
        })
    }                        
}





function descargaOnClick(este){
    url = este.getAttribute("data-gif-id");
    downloadCreatedGif(url)
   
}

async function downloadCreatedGif(url){
    const downloadUrl = url;
    const fetchedGif = fetch(downloadUrl);
    const blobGif = (await fetchedGif).blob();
    const urlGif = URL.createObjectURL(await blobGif);
    const saveImg = document.createElement("a");
    saveImg.href = urlGif;
    saveImg.download = "downloaded-gifo.gif";
    saveImg.style = 'display: "none"';
    document.body.appendChild(saveImg);
    saveImg.click();
    document.body.removeChild(saveImg);
}
