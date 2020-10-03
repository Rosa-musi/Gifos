const btnSwitch = document.querySelector('#boton_modoNoc');

btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Guardamso el modo en localstorage.
    if(document.body.classList.contains('dark')){
        localStorage.setItem('dark-mode', 'true');
    }else{
        localStorage.setItem('dark-mode', 'false');
    }
    if(localStorage.getItem('dark-mode') === 'true'){
        btnSwitch.textContent = "Modo Diurno"
    }else if(localStorage.getItem('dark-mode') === 'false'){
        btnSwitch.textContent = "Modo Nocturno"
    }
});

// Obtenemos el modo actual.
if(localStorage.getItem('dark-mode') === 'true'){
    document.body.classList.add('dark');
    btnSwitch.textContent = "Modo Diurno"
}else if(localStorage.getItem('dark-mode') === 'false'){
    document.body.classList.remove('dark');
    btnSwitch.textContent = "Modo Nocturno"
}

