window.addEventListener('load', ()=>{
    let muestra= document.getElementById("muestra");
    let sami = document.getElementById("sami");
    let samiestatica = document.getElementById("muestraSami");
    let boton = document.getElementById("boton");
    setTimeout(()=>{
        muestra.style.display="block";
        sami.classList.add("samibaja");

    },2000)
    setTimeout(()=>{
        samiestatica.style.display="block";
    },4500);
    setTimeout(()=>{
        samiestatica.classList.add("blur");
        muestra.classList.add("blur");
        boton.style.display="block";
    },5000)
    
})