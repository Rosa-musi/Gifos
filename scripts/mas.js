const comenzar = document.getElementById('comenzar');
const grabar = document.getElementById('grabar');
const finalizar = document.getElementById('finalizar');
const subirGif = document.getElementById('subirGif');
const video = document.getElementById('video');
const letrasVideo = document.getElementById('letrasVideo');
const letrasPermiso = document.getElementById('letrasPermiso');
const createGifoNumbers = document.getElementById('createGifo_numbers');
const contNumbers = document.getElementById('contNumbers');
const repCap = document.getElementById('repCap');
const mostrarGifGrabado = document.getElementById('mostrarGif');
const gifG = document.getElementById('mostrarGif_img');
const gifoCargado = document.getElementById('gifoCargado');
const subiendoGifo = document.getElementById('subiendoGifo')
const hover = document.getElementById('mostrarGif_hover');
const urlMas = document.getElementById('urlMas');
const descargarMas = document.getElementById('descargarMas');
const paso1 = document.getElementById('paso1');
const paso2 = document.getElementById('paso2');
const paso3 = document.getElementById('paso3');
const apikey = 't8p6p3sJzlMsg9EGCF7ynuBUk6YULEk1';

async function initiateWebcam() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: 320,
            width: 480
        }
    });
    video.srcObject = stream;
    video.play();
    letrasPermiso.style.display = "none";
    video.style.display = "flex";
    comenzar.style.display = "none"
    grabar.style.display = "flex"
    paso1.classList.add('notSelected');
    paso1.classList.remove('selected');
    paso2.classList.remove('notSelected');
    paso2.classList.add('selected');
   

    async function startRecordings(){
        const stream = video.srcObject;

        gifRecorder = new RecordRTCPromisesHandler(stream, {
            type: "gif",
            height: 320,
            width: 480
        });
        await gifRecorder.startRecording();
    }

    grabar.addEventListener('click', () =>{
        startRecordings();
        grabar.style.display = "none";
        finalizar.style.display = "flex";
        
    });

    async function stopRecordings(){
        await gifRecorder.stopRecording();
        var blob = await gifRecorder.getBlob();
        var blobGuardar = URL.createObjectURL(blob);  
        video.style.display = "none";
        stream.stop();

        mostrarGifGrabado.style.display = "flex"; 
        gifG.src = blobGuardar 


        async function uploadCreatedGif(){
            const formData = new FormData();
            formData.append("file", blob, "myGif.gif");
            const params = {
                method: "POST",
                body: formData,
                json: true
            };
            const dataGif = await fetchURL(`https://upload.giphy.com/v1/gifs?api_key=${apikey}`, params);
            console.log(await dataGif);
            let id = dataGif.data.id
            let msg = dataGif.meta.msg
            let link = `https://media3.giphy.com/media/${id}/giphy.gif?cid=0abcc9646hfbypznn11zmcey8x9ql7cbcujsjmrrwdytucun&rid=giphy.gifhttps://media3.giphy.com/media//giphy.gif?cid=0abcc9646hfbypznn11zmcey8x9ql7cbcujsjmrrwdytucun&rid=giphy.gifhttps://media3.giphy.com/media//giphy.gif?cid=0abcc9646hfbypznn11zmcey8x9ql7cbcujsjmrrwdytucun&rid=giphy.gif`
            addToMyGifos(link)
            if (msg == "OK"){
                subiendoGifo.style.display = "none";
                gifoCargado.style.display = "flex";
                descargarMas.addEventListener('click', ()=>{
                invokeSaveAsDialog(blob);
                })
                urlMas.addEventListener('click', () =>{
                     window.open(link, "Gifo")
                }) 
            }
            return await dataGif;
        
        }
        
        subirGif.addEventListener('click', () =>{
            uploadCreatedGif()
            hover.style.display = "flex";
            subirGif.style.display = "none"
            repCap.style.display = "none";
            paso2.classList.add('notSelected');
            paso2.classList.remove('selected');
            paso3.classList.remove('notSelected');
            paso3.classList.add('selected');
        });   
        
    }

    finalizar.addEventListener('click', () =>{
        stopRecordings()
        finalizar.style.display = "none";
        subirGif.style.display = "flex";
        createGifoNumbers.style.justifyContent = "space-between";
        contNumbers.style.marginLeft = "222px";
        repCap.style.display = "flex";
    });    
    repCap.addEventListener('click', () =>{
        mostrarGifGrabado.style.display = "none";
        subirGif.style.display = "none";
        initiateWebcam()
    })
     
}

 async function fetchURL(url, params = null){
    try {
        const fetchData = await fetch (url, params);
        const response = await fetchData.json();
        return response;
    } catch (error) {
        if (error.name !== "AbortError") {
            console.log("Error al obtener resultados");
        }
        return error;
    }
} 


comenzar.addEventListener('click', () =>{
    letrasVideo.style.display = "none";
    letrasPermiso.style.display = "flex";
    paso1.classList.remove('notSelected');
    paso1.classList.add('selected');
    initiateWebcam()  
});

function addToMyGifos(gifUrl){
    let new_data = gifUrl

     if(localStorage.getItem('MisGifos') == null){
        localStorage.setItem('MisGifos', '[]');
    }
    let old_data = JSON.parse(localStorage.getItem('MisGifos'));
    old_data.push(new_data);
    localStorage.setItem('MisGifos', JSON.stringify(old_data));  
}
