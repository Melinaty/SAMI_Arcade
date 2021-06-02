//Variables de fecha.
var fecha = new Date();
fecha.setTime(fecha.getTime()+1000*60*60*24*7);

//Con esta finción es para las pregunras aleatorias y las respuestas
function aleatorio(num){
    var aleatorio= Math.floor(Math.random()* num);
    return aleatorio;
  }
  
function numRand(num){
  var rand= Math.floor(Math.random()* num)+1;
  return rand;
}

    //Función que nos da el valor de la cookie
function valCookie(nombreCookie,x) 
{
  let cookies = document.cookie;
  let arrCookies=cookies.split("; ");

  //Ciclo que nos separa cada valor en el nombre, y en el valor de la cookie y lo va asignando a un arreglo.
  for(const valor of arrCookies)
  {
    //Separando el valor obtenido en 2, donde el indice 0 es el nombre de la cookie, y el 1 es el valor.
    const cookie = valor.split('=');
    //if que nos permite verificar si el nombre es el que buscamos.
    if (cookie[0] === nombreCookie)
    {
      if(x==1)
        return cookie[0];
      else if(x == 2)
        return cookie[1];
    }
  }
  return null;
}

//Funcion que asigna el valor del puntaje a las cookies sin modificar lo demás.
function cookieAlta(){
  let cookieActiva = valCookie("activo", 2);
  let stringCookie = valCookie(cookieActiva, 2);
  let configPal = stringCookie.charAt(0);
  let puntaje; 
  if(stringCookie.length < 2)
  {
    puntaje = configPal.concat(correcta);
    document.cookie=cookieActiva+"="+puntaje+"; expires="+fecha.toGMTString();
  }
  else{
    puntaje = stringCookie.substr(1);
    if(puntaje > correcta){
      puntaje = configPal.concat(puntaje);
      document.cookie=cookieActiva+"="+puntaje+"; expires="+fecha.toGMTString();
    }
    else{
      puntaje = configPal.concat(correcta);
      document.cookie=cookieActiva+"="+puntaje+"; expires="+fecha.toGMTString();
    }
  }
}

  //Inicializar variables
  let ordResp1 = 0;
  let ordResp2 = 0;
  let ordResp3 = 0;
  let ordResp4 = 0;
  
  let correcta=0;
  let mala=0;
  
  let preguntas;
  let respuestas;
  
  let tiempo;
  let crono;
  
  let cantiPreg =1;
  
  function actualizar(){
    document.getElementById("tiempo").innerHTML=crono;
    crono--;
    if(crono ==0){
      mala++;
      console.log("Mal por tiempo");
      if(cantiPreg<=10)
      {
        preguntap(preguntas, respuestas);
      }
      else{
        clearInterval(tiempo);
        cookieAlta();
  
          document.getElementById("pregunta").style.display="none";
          document.getElementById("respuestas").style.display="none";
  
          document.getElementById("resultsbue").style.display="block";
          document.getElementById("resultsmal").style.display="block";
  
          document.getElementById("buenas").style.display="block";
          document.getElementById("malas").style.display="block";
  
          document.getElementById("buenas").innerHTML=correcta;
          document.getElementById("malas").innerHTML=mala;

          document.getElementById("tiempo").style.display="none";
          document.getElementById("Regreso").style.display="block";
  
      }
      console.log("Elimine el intervalo");
      
    }
  }
  
  function preguntap (preguntas, respuestas){
    clearInterval(tiempo);
    crono = 20;
    var indice= aleatorio(preguntas.length);
    var rp= respuestas[indice];
    
    //Son los div de las respuestas
    const res1=document.getElementById("res1");
    const res2=document.getElementById("res2");
    const res3=document.getElementById("res3");
    const res4=document.getElementById("res4");
    res1.style.display= 'block';
    res2.style.display= 'block';
    res3.style.display= 'block';
    res4.style.display= 'block';
  
    //Imprime la pregunta
    tiempo =setInterval(actualizar,1000);
    console.log(tiempo);
  
  
    document.getElementById("pregunta").innerHTML= preguntas[indice];
  
    //Asignamos una posicion a las respuestas
    do
    {
      ordResp1 = numRand(4);
      ordResp2 = numRand(4);
      ordResp3 = numRand(4);
      ordResp4 = numRand(4);
    }
    while(ordResp1==ordResp2 || ordResp1==ordResp3 || ordResp1 == ordResp4 
    || ordResp2==ordResp3 || ordResp2 == ordResp4 || ordResp3 == ordResp4 );
  
    /*Imprimios una posición a las respuestas
    -----------------------------------------------------------*/
  
    if(ordResp1 == 1){
      document.getElementById("res1").innerHTML= rp[0];
      document.getElementById("res1").dataset.respuesta=1; 
    }
    else if(ordResp1 == 2){
      document.getElementById("res2").innerHTML= rp[0];
      document.getElementById("res2").dataset.respuesta=1;
    }
    else if(ordResp1 == 3){
      document.getElementById("res3").innerHTML= rp[0];
      document.getElementById("res3").dataset.respuesta=1;
    }
    else if(ordResp1 == 4){
      document.getElementById("res4").innerHTML= rp[0];
      document.getElementById("res4").dataset.respuesta=1;
    }
        
    /*-----------------------------------------------------------*/
    if(ordResp2 == 1){
      document.getElementById("res1").innerHTML= rp[1];
      document.getElementById("res1").dataset.respuesta=0;
    }
    else if(ordResp2 == 2){
      document.getElementById("res2").innerHTML= rp[1];
      document.getElementById("res2").dataset.respuesta=0;
    }
    else if(ordResp2 == 3){
      document.getElementById("res3").innerHTML= rp[1];
      document.getElementById("res3").dataset.respuesta=0;
    }
    else if(ordResp2 == 4){
      document.getElementById("res4").innerHTML= rp[1];
      document.getElementById("res4").dataset.respuesta=0;
    }
    /*-----------------------------------------------------------*/
    if(ordResp3 == 1){
      document.getElementById("res1").innerHTML= rp[2];
      document.getElementById("res1").dataset.respuesta=0;
    }
    else if(ordResp3 == 2){
      document.getElementById("res2").innerHTML= rp[2];
      document.getElementById("res2").dataset.respuesta=0;
    }
    else if(ordResp3 == 3){
      document.getElementById("res3").innerHTML= rp[2];
      document.getElementById("res3").dataset.respuesta=0;
    }
    else if(ordResp3 == 4){
      document.getElementById("res4").innerHTML= rp[2];
      document.getElementById("res4").dataset.respuesta=0;
    }
    /*-----------------------------------------------------------*/
    if(ordResp4 == 1){
      document.getElementById("res1").innerHTML= rp[3];
      document.getElementById("res1").dataset.respuesta=0;
    }
    else if(ordResp4 == 2){
      document.getElementById("res2").innerHTML= rp[3];
      document.getElementById("res2").dataset.respuesta=0;
    }
    else if(ordResp4 == 3){
      document.getElementById("res3").innerHTML= rp[3];
      document.getElementById("res3").dataset.respuesta=0;
    }
    else if(ordResp4 == 4){
      document.getElementById("res4").innerHTML= rp[3];
      document.getElementById("res4").dataset.respuesta=0;
    }
  
    console.log("Preguntas correctas: "+ correcta);
    console.log("Preguntas incorrectas: "+ mala);
  
    preguntas.splice(indice, 1);
    respuestas.splice(indice,1);
    cantiPreg++;
  }
  
     //Primer cuadro
      let op1 = document.getElementById("res1");
      op1.addEventListener("click", () => {
        console.log("Le diste a la primera opción");
        console.log(tiempo);
        
  
        if(document.getElementById("res1").dataset.respuesta==1)
        {
          correcta++;
          console.log("Bien");
        }
        else
        {
          mala++;
          console.log("Mal");
        }
  
        if(cantiPreg<=10)
        {
          preguntap(preguntas, respuestas);
        }
        else{
          clearInterval(tiempo);
          cookieAlta();
         document.getElementById("pregunta").style.display="none";
          document.getElementById("respuestas").style.display="none";
  
          document.getElementById("resultsbue").style.display="block";
          document.getElementById("resultsmal").style.display="block";
  
          document.getElementById("buenas").style.display="block";
          document.getElementById("malas").style.display="block";
  
          document.getElementById("buenas").innerHTML=correcta;
          document.getElementById("malas").innerHTML=mala;

          document.getElementById("tiempo").style.display="none";
          document.getElementById("Regreso").style.display="block";
  
        }
      })
  
      //Segundo Cuadro
      let op2 = document.getElementById("res2");
      op2.addEventListener("click", () => {
        console.log("Le diste a la segunda opción");
        console.log(tiempo);
  
        if(document.getElementById("res2").dataset.respuesta==1){
          correcta++;
          console.log("Bien");
        }
        else
        {
          mala++;
          console.log("Mal");
        }
  
        if(cantiPreg<=10)
        {
          preguntap(preguntas, respuestas);
        }
        else{
          clearInterval(tiempo);
          cookieAlta();
          document.getElementById("pregunta").style.display="none";
          document.getElementById("respuestas").style.display="none";
  
          document.getElementById("resultsbue").style.display="block";
          document.getElementById("resultsmal").style.display="block";
  
          document.getElementById("buenas").style.display="block";
          document.getElementById("malas").style.display="block";
  
          document.getElementById("buenas").innerHTML=correcta;
          document.getElementById("malas").innerHTML=mala;
          
          document.getElementById("tiempo").style.display="none";
          document.getElementById("Regreso").style.display="block";
        }
      })
  
      //Tercer Cuadro
      let op3 = document.getElementById("res3");
      op3.addEventListener("click", () => {
        console.log("Le diste a la tercera opción");
        console.log(tiempo);
  
  
        if(document.getElementById("res3").dataset.respuesta==1){
          correcta++;
          console.log("Bien");
        }
        else
        {
          mala++;
          console.log("Mal");
        }
  
        if(cantiPreg<=10)
        {
          preguntap(preguntas, respuestas);
        }
        else{
          clearInterval(tiempo);
          cookieAlta();
          document.getElementById("pregunta").style.display="none";
          document.getElementById("respuestas").style.display="none";
  
          document.getElementById("resultsbue").style.display="block";
          document.getElementById("resultsmal").style.display="block";
  
          document.getElementById("buenas").style.display="block";
          document.getElementById("malas").style.display="block";
  
          document.getElementById("buenas").innerHTML=correcta;
          document.getElementById("malas").innerHTML=mala;
          
          document.getElementById("tiempo").style.display="none";
          document.getElementById("Regreso").style.display="block";
        }
      })
  
      //Cuarto Cuadro
      let op4 = document.getElementById("res4");
      op4.addEventListener("click", () => {
        console.log("Le diste a la cuarta opción");
        console.log(tiempo);
        if(document.getElementById("res4").dataset.respuesta==1){
          correcta++;
          console.log("Bien");
        }
        else
        {
          mala++;
          console.log("Mal");
        }
  
        if(cantiPreg<=10)
        {
          preguntap(preguntas, respuestas);
        }
        else{
          clearInterval(tiempo);
          cookieAlta();
          document.getElementById("pregunta").style.display="none";
          document.getElementById("respuestas").style.display="none";
  
          document.getElementById("resultsbue").style.display="block";
          document.getElementById("resultsmal").style.display="block";
  
          document.getElementById("buenas").style.display="block";
          document.getElementById("malas").style.display="block";
  
          document.getElementById("buenas").innerHTML=correcta;
          document.getElementById("malas").innerHTML=mala;

          document.getElementById("tiempo").style.display="none";
          document.getElementById("Regreso").style.display="block";
  
        }
      })
  
  //Las promesas de la elección de tema y de inicio
  window.addEventListener('load',()=>
  {
    const inicio=document.getElementById('inicio');
    new Promise((resolve)=>
    {
      inicio.addEventListener("click",()=>
      {
        const temae=document.getElementById("temae");
        temae.style.display= 'block';
        inicio.style.display="none";
        resolve();
      })
    }).then(()=>{
        return new Promise((resolve)=>
        {
          let tema=document.getElementById("tema");
          tema.addEventListener("click",()=>
          {
            tema.addEventListener("click",()=>
            {
              let temase=document.getElementById("tema").value;//temase es el tema elegido
              temae.style.display="none";
              resolve(temase);
            })
          })
        })
      }).then((temase)=>{
            console.log(temase);
            switch(temase)
            {
              case "ocio":
                  preguntas= [
                  "¿Quién es la esposa de Mr. Fantástico?",
                  "¿Quién creó a Clemente?",
                  "¿Cuál es la identidad secreta del Duende Gris?",
                  "¿En dónde trabajaba Speedball cuando obtuvo sus poderes?",
                  "¿Cuál es la identidad criminal de Obadiah Stane?",
                  "¿A que ciudad los cuatro fantásticos llama hogar?",
                  "¿Quién es conocido como 'El hombre sin miedo'",
                  "¿Cuál es el nombre real de Gambit?",
                  "¿Cuál es el segundo nombre de Nick Fury?",
                  "¿Cómo se llama el mago del señor de los anillos?",
                  "¿Qué es una carrera hípica?",
                  "¿Cuántas casillas tiene un tablero de ajedrez",
                  "¿Cuál de los siguientes premios es el intruso?",
                  "¿Cuál es el otro nombre de la nota musical do?",
                  "¿De qué país es el cantante Justin Biber?",
                  "¿Cómo se les llama a las personas que practican el tiro con arco?",
                  "En el futbol americano, ¿Cuántos puntos vale un Field Goal?",
                  "¿Cuál es el intruso?",
                  "¿Qué es la proa de un barco?",
                  "¿En qué país se encuentra la ciudad de Maratón?",
                  "Una alberca olímpica mide de largo...",
                  "Nombre de la cantante intérprete de la canción Womanizer",
                  "¿Cuál es el título de la sexta película de Harry Potter?"
                ];
  
                //Las primeras respuestas siempre son las correctas
                  respuestas= [
                  ["Mujer invisible", "Tormenta", "Fenix", "Mistique"],
                  ["Caloi", "Quino", "Rep", "Fontanarrosa"],
                  ["Gabriel Stacy", "Phil Urich", "Flash Thompson", "Matt Murdock"],
                  ["Laboratorio de Investigación Hammond", "Oscorp", "Stark     Industries", "Stan Industries"],
                  ["Iron Monger", "Galactus", "War Machine", "Doctor Doom"],
                  ["New York", "Chicago", "Seattle", "Los Ángeles"],
                  ["Daredevil", "Mister Fear", "Punisher", "Iron Man"],
                  ["Remy LeBeau", "Robby Drake", "Bruce Banner", "Matt Murdock"],
                  ["Joseph", "Steven", "Richard", "Franklin"],
                  ["Gandalf", "Saruman", "Sauron", "Aragorn"],
                  ["Una carrera de caballos", "Un sueño", "Una carrera de botargas", "Una carrera de atletismo"],
                  ["64", "44", "56", "60"],
                  ["El Pritzker", "El cervantes", "El planeta", "Alfaguara"],
                  ["ut", "re", "fa", "si"],
                  ["Canadá", "E.U.A.", "Ingalaterra", "Reino Unido"],
                  ["Arquero", "Francotirador", "Saetero", "Portero"],
                  ["3", "6", "2", "1"],
                  ["Arcilla", "Gouache", "Acuarela", "Esmalte"],
                  ["La parte delantera", "La parte trasera", "Los camerinos", "No existe"],
                  ["Grecia", "Holanda", "Australia", "Dinamarca"],
                  ["50m", "25m", "30m", "20m"],
                  ["Britney Spears", "Selena Gómez", "Lady Gaga", "Kesha"],
                  ["Harry Potter y el misterio del príncipe", "Harry Potter y la Orden del Fénix", "Harry Potter y el prisionero de Azkaban", "Harry Potter y la cámara secreta"],
                ];
                  preguntap(preguntas, respuestas);
                
                
                break;
  
              case "historia":
                //Historia
                  preguntas= [
                  "En la antigüedad, ¿Qué ciudad grega venció a Atenas?",
                  "¿Qué sabio polaco descubrió en el siglo XVI que la Tierra no es el centro del universo?",
                  "¿En qué año fue derrotado Tenochtitlán?",
                  "¿Quién inventó el automovil moderno?",
                  "¿En qué religión se venera a Brahma y a Visnú?",
                  "¿Qué evento desencadenó la segunda guerra mundial?",
                  "¿Cómo se llamaba el templo construido en honor a Atenea en la Acrópolis?",
                  "¿Qué militar político mexicano nunca perdió una batalla siendo general?",
                  "¿Cuál de ellos no fue emperador?",
                  "El máximo gobernante de un ducado es el...",
                  "Un apeadero es un lugar donde...",
                  "¿De qué puerto zarpó Cristobal Colón en busca de la ruta a las Indias?",
                  "¿Cómo llamaron a los emperadores rusos hasta 1917?",
                  "¿En qué estado mexicano se encuentra la Pirámide de La Venta?",
                  "¿Qué presidente sucedió a José López Portillo?",
                  "¿En qué año México abandonó su neutralidad en la 2a Guerra Mundial?",
                  "¿Qué pueblo inventó el tonel?",
                  "Durante la época colonial fue el puerto más importante del Pacífico",
                  "En 1865, ¿Qué guerra marcó el fin de la esclavitud en Estados Unidos?",
                  "¿En qué año el ejército de Estados Unidos lanzó la bomba atómica sobre Hiroshima?",
                  "¿Qué escultura egipcia tiene una cabeza humana y un cuerpo de león?",
                  "¿De qué país es la cultura nazca?"
              ];
              
                respuestas= [
                ["Esparta", "Bizancio", "Delfos", "Mileto"],
                ["Copérnico", "Ptolomeo", "Al Sufi", "Galileo"],
                ["1499", "1521", "1541", "1510"],
                ["Karl Benz", "Miller Reese Hutchinson", "Hubert Cecil Booth", "William Einthoven"],
                ["Hinduismo", "Jainismo", "Taoísmo", "Confucianismo"],
                ["Un atentado", "Un secuestro", "Un incendio", "Una traición"],
                ["Partenón", "Peloponeso", "Hera", "Hefestión"],
                ["Álvaro Obregón", "Miguel Alemán González", "Manuel Ávila Camacho", "Pedro María Anaya"],
                ["Julio César", "Nerón", "Adriano", "Augusto"],
                ["Duque", "Presidente", "Alcalde", "Rey"],
                ["Los viajeros suben y bajan de un tren", "Viven los peones", "Hay una fuente de agua potable", "Un lugar de crianza"],
                ["Palos de la frontera", "Barcelona", "Lisboa", "Algeciras"],
                ["Zar", "Maltan", "Alcalde", "Dictador"],
                ["Tabasco", "Michoacán", "Yucatán", "Chiapas"],
                ["Miguel de la Mdrid", "Marcelo Ebrad", "Manuel Ávila Camacho", "Vicente Fox"],
                ["1942", "1943", "1940", "1941"],
                ["Los galos", "Los incas", "Los griegos", "Los sioux"],
                ["Acapulco", "Altamira", "Manzanillo", "Guaymas"],
                ["La guerra de Secesión", "Guerras bananeras", "Tercera Guerra Servil", "Guerra Civil"],
                ["1945", "1946", "1944", "1947"],
                ["Esfinge", "Escriba", "Triada de Micerino", "Set"]
                ["Perú", "Bolivia", "Argentina", "Chile"]
              ];
              preguntap(preguntas,respuestas);
              break;
              case "mate":
              //Matemáticas
                  preguntas= [
                  "¿Cuántas cifras se necesitan para escribir 3,845, 000?",
                  "¿Cuántos decilitros hay en 3 hectolitros?",
                  "Leo pesa 80 kilos. Engorda un 10%, luego adelgaza otro 10% ¿Cuánto pesa ahora?",
                  "¿Cuál es el número más grande de cinco dígitos que tiene dos ceros?",
                  "¿Qué número entero es igual a 4x6/3?",
                  "¿Qué número obtienes cuando multiplicas 51.12x0.01?",
                  "¿Qué cifra no utilizaban los romanos?",
                  "¿Cuántos cm3 ha en 1ml?",
                  "¿Cuál de los número no es divisible entre 3?",
                  "Un avión recorre 230m en 0.4s. ¡Qué distancia recorrere en 1 segundo?",
                  "Una barra mide 1.75m de alto. La suben 500 milímetros ¿Qué altura tiene ahora?",
                  "¿Qué medida se representa con la palabra 'dam'?",
                  "¿Cuánto mide el ángulo de un triángulo equilátero?",
                  "¿Cuál es el MCD de 24 y 36?",
                  "¿Cuál es la cífra de los céntimos en el número 45.137?",
                  "¿Cuántos ejes de simetría tiene un triángulo isósceles?",
                  "¿Cómo se simplifíca (a+b)(a-b)?",
                  "En un circuito de 4km, un coche recorre 388km.¿Cuántas vueltas dió?",
                  "¿Cuántos grados mide un ángulo llano?",
                  "¿cómo se les llama a los números usados para contar y ordenar los elementos de un conjunto?",
                  "Calcula 50-50x4",
                  "¿Qué número es igual a 5,656/101?"
                ];
  
                  respuestas= [
                  ["7", "8", "6", "9"],
                  ["3,000", "300", "30,000", "1000"],
                  ["79.2kg", "80kg", "78.2kg", "77.2kg"],
                  ["99,900", "999,900", "100", "900"],
                  ["8", "10", "8.333", "6"],
                  ["0.5112", "5.112", "51.12", ".05112"],
                  ["El cero", "Utilizaban todas", "El 1000", "El 500"],
                  ["1", "10", "3", "100"],
                  ["821", "777", "342", "519"],
                  ["575m", "600m", "840m", "100m"],
                  ["2.25m", "2m", "1.80m", "1.755m"],
                  ["Decámentro", "Decímetro", "Decalitro", "No existe"],
                  ["60°", "70°", "180°", "80°"],
                  ["12", "6", "26", "8"],
                  ["3", "4", "7", "45"],
                  ["1", "3", "0", "4"],
                  ["El cuadrado de a menos el cuadrado de b", "0", "2a-2b", "2a+2b"],
                  ["97", "123", "86", "47"],
                  ["180°", "123°", "90°", "60°"],
                  ["Números naturales", "Números reales", "Números enteros", "Números imaginários"],
                  ["-150", "0", "200", "250"],
                  ["56", "560", "305", "5"],
                ];
                preguntap(preguntas,respuestas);
                break;
              case "C":
              //Programación estructurada
                  preguntas= [
                  "Nombre de la persona que desarrolló el lenguaje C",
                  "No es un tipo de dato en lenguaje C",
                  "Es una secuencia de escape",
                  "Formato de valor desplegado con la mascara de entrada/salida %e",
                  "Función usada para recibir datos de la entrada estándar (teclado)",
                  "¿De qué otra manera se les llama a los arreglos unidimensionales?",
                  "No es una caracreríastica de los arreglos en lenguaje C",
                  "Uso que se le da al carácter nulo una cadena en lenguaje C",
                  "¿Cuál no es una función de la biblioteca stdlib.h en lenguaje C?",
                  "No es un uso de las funciones en lenguaje C",
                  "No es una función de la biblioteca  string.h en lenguaje C",
                  "¿De cuentas cateorías depende un dato en una matriz?",
                  "¿Qué es el valor de un apuntador?",
                  "No es una característica de una estructura en lenguaje C",
                  "¿En qué memoria se guardan los archivos en lenguaje C?",
                  "Es un tipo de archivo en lenguaje C",
                  "La lectura de un archivo de texto en lenguaje C se hace de forma...",
                  "Esta función realiza la apertura de un archivo. Recibe como    argumentos una cadena con la ruta al archivo y un identificador de modo de apertura",
                  "Es un requerimiento de la función fopen",
                  "Modo de la función fopen utilizado para abrir un archivo existente en modo lectura",
                  "Función que realiza la lectura de los caracteres en el archivo de texto. Convierte el contenido del archivo a los tipos de datos indicados por la máscara de entrada",
                  "¿Qué devuelve la función rename si no hubo ningún error en su procedimiento?"
                ];
  
                  respuestas= [
                  ["Dennis Ritchie", "Bill Gates", "James Gosling", "Bjarne Stroustrup"],
                  ["var", "float", "char", "double"],
                  ["\", \"/g", "\\", "\s"],
                  ["Notación científica", "Formato hexadecimal", "Formato entero", "Carácter"],
                  ["scanf", "printf", "scanr", "printr"],
                  ["Vectores", "Matrices", "filas", "Estáticos"],
                  ["Heterogéneo", "Homogéneo", "Estático", "Volátil"],
                  ["Indicar el fin de la cadena", "Indicar el inicio de una cadena", "Marcar un espacio", "Es un carácter normal"],
                  ["strcpy", "atof", " rand", " ato"],
                  ["Hacer un proceso sincrónico", "Diseño descendente", "Reutilización de código", "Facilidad de detección y solución de errores"],
                  ["atof", "strcmp", "strcpy", "strcat"],
                  ["2", "3", "1", "0"],
                  ["Una dirección de memoria", "No tienen valor", "Una palabra", "Una función"],
                  ["Homogenea", "Heterogénea", "Estática", "Volátil"],
                  ["En la memoria secundaria", "No existen", "En la memoria principal", "ROM"],
                  ["Binario", "JPG", "De lectura", "Aleatorio"],
                  ["Secuencial", "Pausada", "Aleatoria", "Incorrecta"],
                  ["fopen", "strcat", "strcmp", "strcpy"],
                  ["Modo", "double", "Cierre del archivo", "Dirección de memoria."],
                  ["r", "w+", "a", "wb"],
                  ["fscanf", "fclose", "fprintf", "fopen"],
                  ["0", "Una cadena", "Null", "1"]
                ];
                preguntap(preguntas, respuestas);
                break;
              }
            })
    })