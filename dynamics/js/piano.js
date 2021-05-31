//Variables del canvas
let canvas = document.getElementById("piano");
let ctx = canvas.getContext("2d");
let reintentar = $("#reintentar");
reintentar.hide();
let y; //Variable que controla como van bajando las teclas, se incializa una tecla antes de la que es.
let vel;
//Variable que nos permite saber si fallamos y detener la animacion.
let fallo; 

//AUDIO Y ARREGLO DE TECLAS RANDOM --------------------------------------------------------------------------------
//Constantes de los audios.
const CANCION = ["wetH", "rondo", "bumblebee"]; //Almacena el nombre de las canciones.
let song_rand = Math.floor(Math.random()*10) % 3; //Variable que elije una cancion al azar.
let audios; //Arreglo que va a almacenar las rutas de los distintos audios de cada cancion.
let num_audio; //Variable de control que permite recorrer el arreglo con las rutas.
let audio; //Variable de objeto audio.
let rand; //Variable que cambiara su valor de una forma random del 0 al 3.

const TECLAS = [58, 56, 48] //Almacena la canctidad de teclas (archivos) que tiene cada cancion.
let tecla = {
    alto: canvas.height/4,
    ancho: canvas.width/4
}
let teclas_rand;  //Arreglo que almacena las pociciones random de las teclas.

//FUNCIONES -------------------------------------------------------------------------------------------------------
function inicializar (){
    audios= new Array();
    teclas_rand= new Array();
    num_audio=0;
    vel=0;
    y = - tecla.alto
    fallo = false;
    for(let i=1; i<=TECLAS[song_rand]; i++)
    {  
        rand = Math.round(Math.random()*3);
        //Se guarda en el arreglo las rutas completas con cada audio.
        audios.push('../statics/media/piano_songs/'+CANCION[song_rand]+'/'+CANCION[song_rand]+'('+i+').mp3');

        //Crea las posiciones de las teclas de forma randomizada del 0 al 3.
        teclas_rand.push(rand);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    basePian();
    dib_teclas(teclas_rand, y);
    tabla();
}

//Funcion que permite desplegar el puntaje.
function puntaje (aciertos, velocidad){
    velocidad *= 100;
    let puntos = $("#puntos");
    let redondear = Math.round(velocidad+(aciertos*10));
    puntos.text(redondear);
}

//Funcion que permite detener la animacion y reproduce un adio de fallo
function fin(){
    fallo=true;
    cancelAnimationFrame(animacion);
    audio = new Audio("../statics/media/piano_songs/fallo.mp3");
    audio.play();
    setTimeout(()=>{
    derrota();
    }, 50);
    reintentar.show();
}

//Funcion que determina si un numero es entero o flotante.
function entero(n) { 
    if (n % 1 === 0)
        return true;
    else
        return false;
}

//Funcion que despliega una corona.
function victoria(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
        ctx.moveTo(75, 97.5)
        ctx.lineTo(75, 35);
        ctx.lineTo(125, 60);
        ctx.lineTo(150, 22.5);
        ctx.lineTo(175, 60);
        ctx.lineTo(225, 35);
        ctx.lineTo(225, 97.5);
    ctx.closePath();
    ctx.fillStyle= "gold";
    ctx.fill();
}

//Funcion que dibuja una carita triste.
function derrota(){
    ctx.beginPath();
        ctx.font = "bold 30px Verdana";
        ctx.fillStyle="red";
        ctx.fillText("（︶︿︶）", canvas.width/4, canvas.height/2);
    ctx.closePath();
}

//Funcion que dibuja la base del tablero antes de empezar.
function basePian(){
    for(let i=0; i<4; i++)
    {
        ctx.beginPath();
        ctx.rect(canvas.width/4 * i, canvas.height-tecla.alto, tecla.ancho, tecla.alto);
        ctx.fillStyle="red";
        ctx.fill();
        ctx.closePath();
    } 
}

//Funcion que dibuja las teclas con sus posiciones random, ademas de dibujas en gris las que ya se pulsaron.
function dib_teclas(carril, y){
    for(i=0; i<=TECLAS[song_rand]; i++)
    {
        //cuando presionas una tecla negra correctamente se vuelve gris.
        if(entero(carril[i]) == false){
        ctx.beginPath();
            ctx.rect(canvas.width/4*carril[i]*10, canvas.height-((i+1)*tecla.alto)+y, canvas.width/4,canvas.height/4);
            ctx.fillStyle="gray";
            ctx.strokeStyle = "white";
            ctx.stroke();
            ctx.fill();
        ctx.closePath();
        }
        //dibuja las teclas negras mientras la localidad sea un entero y no toque el borde inferior
        else if(entero(carril[i]) == true && (canvas.height-((i+1)*tecla.alto)+y <= canvas.height-tecla.alto)){
        ctx.beginPath();
            ctx.rect(canvas.width/4*carril[i], canvas.height-((i+1)*tecla.alto)+y, canvas.width/4, canvas.height/4);
            ctx.fillStyle="black";
            ctx.strokeStyle = "white";
            ctx.stroke();
            ctx.fill();
        ctx.closePath();
        }
        //detiene la animación porque tocó el borde inferior(perdiste)
        else
            fin();
    }
}

//Funcion que dibuja la division del canvas.
function tabla(){
    //Variables que determinan la posicion de las lineas.
    let primera = canvas.width/4;
    let segunda = canvas.width/2;
    let tercera = primera + segunda;

    //linea a 1/4.
    ctx.moveTo(primera, 0);
    ctx.lineTo(primera, canvas.height);
    //linea a 1/5.
    ctx.moveTo(segunda, 0);
    ctx.lineTo(segunda, canvas.height);
    //linea a 1/4.
    ctx.moveTo(tercera, 0);
    ctx.lineTo(tercera, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
}

//Funcion que permite comprobar si presionaste la teclaa correcta, y reproduce el sonido.
function jugar(carril, flotante){
    if(teclas_rand[num_audio]==carril){
        audio = new Audio(audios[num_audio]);
        audio.play();
        teclas_rand[num_audio]=flotante;
        vel+=0.03;
        num_audio++;
        puntaje(num_audio,vel);
        //Si llegas al final, cancela la animacion y ejecuta la victoria.
        if(num_audio == TECLAS[song_rand])
        {
            setTimeout(()=>{
                cancelAnimationFrame(animacion);
                victoria();
            }, 500);
        }
    }
    //Si no presionaste la respuesta correcta, ejecuta fin.
    else
        fin(); 
}

//Inicializacion de el juego.
inicializar();

//ANIMACIONES ----------------------------------------------------------------------------------
let animacion;
function draw(){
    console.log("Sigue animacion");
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dib_teclas(teclas_rand, y);
    tabla();
    y+=1+vel; //VELOCIDAD
    if(fallo == false)
    animacion = requestAnimationFrame(draw);    
}

//EVENTOS --------------------------------------------------------------------------

//Evento de boton de reintentar. 
reintentar.click(()=>{
    console.log("boton reintentar");
    reintentar.hide();
    inicializar();
    setTimeout(()=>{
        draw();
    }, 1000);
});

//Evento de boton de jugar.
$("#empezar").click(()=>{
    $("#empezar").hide();
    draw();

    //Eventos del teclado.
    $("body").keydown((e)=>{
        if(fallo == false && (e.key == 'a' || e.key == 's' || e.key == 'd' || e.key == 'f'))
        {
            switch(e.key)
            {
                case 'a':
                    jugar(0,0.0000000000000000000000000000000001);
                break;

                case 's':
                    jugar(1,0.1);
                break;

                case 'd':
                    jugar(2,0.2);
                break;

                case 'f':
                    jugar(3,0.3);
                break;
            }
        }
    });
});