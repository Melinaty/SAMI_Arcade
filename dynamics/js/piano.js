//Variables del canvas
let canvas = document.getElementById("piano");
let ctx = canvas.getContext("2d");

//AUDIO Y ARREGLO DE TECLAS RANDOM --------------------------------------------------------------------------------
//Constantes de los audios.
const CANCION = ["rondo", "rondo", "rondo"]; //Almacena el nombre de las canciones.
let song_rand = Math.floor(Math.random()*10) % 3; //Variable que elije una cancion al azar.
let audios =  new Array(); //Arreglo que va a almacenar las rutas de los distintos audios de cada cancion.

const TECLAS = [56, 56, 56] //Almacena la canctidad de teclas (archivos) que tiene cada cancion.
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

//Funcion que determina si un numero es entero o flotante.
function entero(n) { 
    if (n % 1 === 0)
        return true;
    else
        return false;
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
        if(entero(carril[i]) == false){
            ctx.beginPath();
            ctx.rect(canvas.width/4*carril[i]*10, canvas.height-((i+1)*tecla.alto)+y, canvas.width/4,canvas.height/4);
            ctx.fillStyle="gray";
            ctx.strokeStyle = "white";
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
        else{
            ctx.beginPath();
            ctx.rect(canvas.width/4*carril[i], canvas.height-((i+1)*tecla.alto)+y, canvas.width/4, canvas.height/4);
            ctx.fillStyle="black";
            ctx.strokeStyle = "white";
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
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
    animacion = requestAnimationFrame(draw);
}

//requestAnimationFrame(draw);
let audio;
let num_audio = 0;
let fallo = false;


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
                //Se crea un nuevo audio, con la ruta especificada.
                if(teclas_rand[num_audio]==0){
                    audio = new Audio(audios[num_audio]);
                    teclas_rand[num_audio]=0.0000000000000000000001;
                    num_audio++;
                    vel+=0.05;

                }
                else{
                    fallo = true;
                    audio = new Audio("../statics/media/piano_songs/fallo.mp3");
                    cancelAnimationFrame(animacion);
                }
                //audio.play();
                console.log(e.key);
                break;

                case 's':
                //Se crea un nuevo audio, con la ruta especificada.
                if(teclas_rand[num_audio]==1){
                    audio = new Audio(audios[num_audio]);
                    teclas_rand[num_audio]=0.1;
                    num_audio++;
                    vel+=0.05;
                }
                else{
                    fallo = true;
                    audio = new Audio("../statics/media/piano_songs/fallo.mp3");
                    cancelAnimationFrame(animacion);
                }
                //audio.play();
                console.log(e.key);
                break;

                case 'd':
                //Se crea un nuevo audio, con la ruta especificada.
                if(teclas_rand[num_audio]==2){
                    audio = new Audio(audios[num_audio]);
                    teclas_rand[num_audio]=0.2;
                    num_audio++;
                    vel+=0.05;
                }
                else{
                    fallo = true;
                    audio = new Audio("../statics/media/piano_songs/fallo.mp3");
                    cancelAnimationFrame(animacion);
                }
                //audio.play();
                console.log(e.key);
                break;

                case 'f':
                //Se crea un nuevo audio, con la ruta especificada.
                if(teclas_rand[num_audio]==3){
                    audio = new Audio(audios[num_audio]);
                    teclas_rand[num_audio]=0.3;
                    num_audio++;
                    vel+=0.05;
                }
                else{
                    fallo = true;
                    audio = new Audio("../statics/media/piano_songs/fallo.mp3");
                    cancelAnimationFrame(animacion);
                }
                //audio.play();
                console.log(e.key);
                break;
            }
            audio.play();
        }
    });
});