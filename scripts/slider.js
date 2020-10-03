const Slider = document.getElementById('slider');
const prevSlider = document.getElementById('prev');
const nextSlider = document.getElementById('next');

prevSlider.addEventListener('click', (e) => {
    Slider.scrollBy({
        top: 0,
        left: -367,
        behavior: "smooth"
    })
})

nextSlider.addEventListener('click', (e) => {
    Slider.scrollBy({
        top: 0,
        left: 367,
        behavior: "smooth"
    })
})