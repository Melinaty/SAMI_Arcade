//Variables de el canvas.
let canvas = document.getElementById("piano");
let ctx = canvas.getContext("2d");

//AUDIO Y ARREGLO DE TECLAS RANDOM --------------------------------------------------------------------------------

//Constantes de los audios.
const CANCION = ["rondo", "rondo", "rondo"]; //Almacena el nombre de las canciones.
const TECLAS = [56, 56, 56] //Almacena la canctidad de teclas (archivos) que tiene cada cancion.
let song_rand = Math.floor(Math.random()*10) % 3; //Variable que elije una cancion al azar.

let audios =  new Array(); //Arreglo que va a almacenar las rutas de los distintos audios de cada cancion.

let teclas_rand = new Array();  //Arreglo que almacena las pociciones random de las teclas.

for(let i=1; i<=TECLAS[song_rand]; i++)
{   
    let rand = Math.round(Math.random()*3);
    //Se guarda en el arreglo las rutas completas con cada audio.
    audios.push('../statics/media/piano_songs/'+CANCION[song_rand]+'/'+CANCION[song_rand]+'('+i+').mp3');

    //Crea las posiciones de las teclas de forma randomizada del 0 al 3.
    teclas_rand.push(rand);
}

//FUNCIONES -------------------------------------------------------------------------------------------------------

let tecla = {
    alto: canvas.height/4,
    ancho: canvas.width/4
}

function dib_teclas(carril, y){
    for(i=0; i<=TECLAS[song_rand]; i++)
    {
        ctx.beginPath();
        ctx.rect(canvas.width/4*carril[i], canvas.height-((i+1)*tecla.alto)+y, canvas.width/4, canvas.height/4);
        ctx.fillStyle="red";
        ctx.fill();
        ctx.closePath();
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

let y = 0;
//ANIMACIONES ----------------------------------------------------------------------------------
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dib_teclas(teclas_rand, y);
    tabla();
    y+=2;
    let animacion = requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

//Evento de prueba, que va cambiando al audio, conforme presionas el boton.
let num_audio = 0;
$("#duracion").click(()=>{

    let audio = new Audio(audios[num_audio]); //Se crea un nuevo audio, con la ruta especificada.
    audio.play();
    //console.log(audios[num_audio]);
    
    //Se suma para cambiar el archivo de audio.
    num_audio++;
});
