function addToFavorites(gifUrl){
    let new_data = gifUrl.getAttribute("data-gif-id");
    gifUrl.setAttribute("src", "imagenes/iconos/icon-fav-active.svg")

     if(localStorage.getItem('data') == null){
        localStorage.setItem('data', '[]');
    }

    let old_data = JSON.parse(localStorage.getItem('data'));
    old_data.push(new_data);
    localStorage.setItem('data', JSON.stringify(old_data));  
}
