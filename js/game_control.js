let button = document.getElementById("start")
let carousel = document.getElementById('carousel')
let buttons = document.getElementById('buttons')

button.addEventListener('click',(e)=>{
    main = document.getElementsByClassName("main")
    main[0].style.display = "inline-block"
    button.style.display = "none"

    carousel.style.display = "none"
    buttons.style.display = "none"
})