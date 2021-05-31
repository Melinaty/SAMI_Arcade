//Variables del canvas
let canvas = document.getElementById("piano");
let ctx = canvas.getContext("2d");

let fallo = false; //Variable que nos permite saber si fallamos y detener la animacion.

//AUDIO Y ARREGLO DE TECLAS RANDOM --------------------------------------------------------------------------------
//Constantes de los audios.
const CANCION = ["rondo", "wetH", "wetH"]; //Almacena el nombre de las canciones.
let song_rand = Math.floor(Math.random()*10) % 3; //Variable que elije una cancion al azar.
let audios =  new Array(); //Arreglo que va a almacenar las rutas de los distintos audios de cada cancion.
let num_audio = 0; //Variable de control que permite recorrer el arreglo con las rutas.
let audio; //Variable de objeto audio.

const TECLAS = [56, 58, 58] //Almacena la canctidad de teclas (archivos) que tiene cada cancion.
let tecla = {
    alto: canvas.height/4,
    ancho: canvas.width/4
}
let teclas_rand = new Array();  //Arreglo que almacena las pociciones random de las teclas.

//For que recorre la longitud del numero de teclas de la cancion, y en el, se crea el arreglo con las rutas de los archivos, ademas de el orden random de las teclas.
for(let i=1; i<=TECLAS[song_rand]; i++)
{   
    let rand = Math.round(Math.random()*3);
    //Se guarda en el arreglo las rutas completas con cada audio.
    audios.push('../statics/media/piano_songs/'+CANCION[song_rand]+'/'+CANCION[song_rand]+'('+i+').mp3');

    //Crea las posiciones de las teclas de forma randomizada del 0 al 3.
    teclas_rand.push(rand);
}

//FUNCIONES -------------------------------------------------------------------------------------------------------

function fin(){
    fallo=true;
    audio = new Audio("../statics/media/piano_songs/fallo.mp3");
    audio.play();
    setTimeout(()=>{
        derrota();
    }, 50);
}

//Funcion que determina si un numero es entero o flotante.
function entero(n) { 
    if (n % 1 === 0)
        return true;
    else
        return false;
}

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

function derrota(){
    ctx.beginPath();
        ctx.font = "bold 30px Verdana";
        ctx.fillStyle="red";
        ctx.fillText("（︶︿︶）", canvas.width/4, canvas.height/2);
    ctx.closePath();
}

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

function jugar(carril, flotante){
    if(teclas_rand[num_audio]==carril){
        audio = new Audio(audios[num_audio]);
        audio.play();
        teclas_rand[num_audio]=flotante;
        vel+=0.03;
        console.log(audios[num_audio]);
        num_audio++;
        if(num_audio == TECLAS[song_rand])
        {
            setTimeout(()=>{
                cancelAnimationFrame(animacion);
                victoria();
            }, 500);
        }
    }
    else
        fin(); 
}

//Variable que controla como van bajando las teclas, se incializa una tecla antes de la que es.
let y = -tecla.alto;

//Inicializacion de el juego.
basePian();
dib_teclas(teclas_rand, y);
tabla();

//ANIMACIONES ----------------------------------------------------------------------------------
let animacion;
let vel = 0;
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dib_teclas(teclas_rand, y);
    tabla();
    y+=1+vel; //VELOCIDAD
    if(fallo == false)
        animacion = requestAnimationFrame(draw);
    else
        ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//EVENTOS DEL TECLADO --------------------------------------------------------------------------
$("#duracion").click(()=>{
    $("#duracion").hide();
    draw();

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