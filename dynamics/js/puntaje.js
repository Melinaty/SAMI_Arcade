$(document).ready(()=>{
    //Función que nos da el valor de la cookie}
    let arregloUsuarios = new Array(); 
    let arregloPuntajes = new Array();
    function puntajes() 
    {
        let cookies = document.cookie;
        let arrCookies=cookies.split("; ");
        console.log(arrCookies);
        //Ciclo que nos separa cada valor en el nombre, y en el valor de la cookie y lo va asignando a un arreglo.
        let i = 0;
        for(const valor of arrCookies)
        {
            //Separando el valor obtenido en 2, donde el indice 0 es el nombre de la cookie, y el 1 es el valor.
            const cookie = valor.split('=');
            //if que nos permite verificar si el nombre es el que buscamos.
            if (cookie[0] != "activo")
            {
                if(cookie[1] > arregloPuntajes[i])
                {
                    arregloUsuarios.push(cookie[0]);
                    arregloPuntajes.push(cookie[1].substr(1));
                }
                else{
                    arregloUsuarios.unshift(cookie[0]);
                    arregloPuntajes.unshift(cookie[1].substr(1));
                }
            }
            i++;
        }
    }
    
    puntajes();
    console.log(arregloUsuarios);
    console.log(arregloPuntajes);
    let tablau;
    let tablapunt;
    for(let i=0;i<arregloUsuarios.length; i++)
    {
        if(arregloPuntajes[i] == "")
        {
            arregloPuntajes[i] = "0";
        }
        //tablau = $('<p>'+arregloUsuarios[i]+'</p>');
        //tablau.css("color", "black");
        $(".usuarioP").append('<p>'+arregloUsuarios[i]+'</p>');
        //tablapunt = $('<p>'+arregloPuntajes[i]+'</p>');
        //tablapunt.css("color", "black");
        $(".puntajeP").append('<p>'+arregloPuntajes[i]+'</p>');
    }
});