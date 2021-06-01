window.addEventListener('load', ()=>{
    let muestra= document.getElementById("muestra");
    let sami = document.getElementById("sami");
    let samiestatica = document.getElementById("muestraSami");
    let boton = document.getElementById("boton");
    let maquina1 = document.getElementById("muestraizq");
    let maquina2 = document.getElementById("muestrader");
    let letras = document.getElementsByClassName("letras");
    setTimeout(()=>{
        muestra.style.display="block";
        for(i=0; i<6; i++)
        {
            letras[i].classList.add("none");
        }
        sami.classList.add("samibaja");
    },2000)
    setTimeout(()=>{
        samiestatica.style.display="block";
    },4500);
    setTimeout(()=>{
        samiestatica.classList.add("blur");
        muestra.classList.add("blur");
        sami.style.display="none";
        
    },5000)
    setTimeout(()=>{
        boton.style.display="block";
        maquina1.style.display="block";
        maquina2.style.display="block";
    },5200)
    
})