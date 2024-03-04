let button = document.getElementById("start")

button.addEventListener('click',(e)=>{
    main = document.getElementsByClassName("main")
    main[0].style.display = "inline-block"
    button.style.display = "none"
})