let canvas = document.getElementById("piano");
let ctx = canvas.getContext("2d");

function tabla(){

    let primera = canvas.width/4;
    let segunda = canvas.width/2;
    let tercera = primera + segunda;

    //linea a 1/4.
    ctx.moveTo(primera, 0);
    ctx.lineTo(primera, canvas.height);
    ctx.strokeStyle = "black";
    ctx.stroke();
    //linea a 1/5.
    ctx.moveTo(segunda, 0);
    ctx.lineTo(segunda, canvas.height);
    ctx.strokeStyle = "black";
    ctx.stroke();
    //linea a 1/4.
    ctx.moveTo(tercera, 0);
    ctx.lineTo(tercera, canvas.height);
    ctx.strokeStyle = "black";
    ctx.stroke();
}

tabla();

//Constantes de los audios.
const CANCION = ["rondo", "rondo", "rondo"]; //Almacena el nombre de las canciones.
const TECLAS = [56, 56, 56] //Almacena la canctidad de teclas (archivos) que tiene cada cancion.
let song_rand = Math.floor(Math.random()*10) % 3; //Variable que elije una cancion al azar.

let audios =  new Array(); //Arreglo que va a almacenar las rutas de los distintos audios de cada cancion.

for(let i=1; i<=TECLAS[song_rand]; i++)
{   
    //console.log(i);
    //Se guarda en el arreglo las rutas completas con cada audio.
    audios.push('../statics/media/piano_songs/'+CANCION[song_rand]+'/'+CANCION[song_rand]+'('+i+').mp3');
}

//Evento de prueva, que va cambiando al audio, conforme presionas el boton.
let num_audio = 0;
$("#duracion").click(()=>{

    let audio = new Audio(audios[num_audio]); //Se crea un nuevo audio, con la ruta especificada.
    audio.play();
    //console.log(audios[num_audio]);
    
    //Se suma para cambiar el archivo de audio.
    num_audio++;
});
