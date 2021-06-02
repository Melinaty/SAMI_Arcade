$(document).ready(()=>{
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
    //cuando ya existe la cookie le cambia el color  de fondo al que ya tenía antes
    function cambiarColor(){
        let colorAct = valCookie("activo", 2);
        if(valCookie(colorAct, 2).charAt(0) == 'b')
        {
            cookiePal = 'b';
            $("body").css("backgroundColor", "#d6d6d6"); 
        }
        else if(valCookie(colorAct, 2).charAt(0) == 'n')
        {
            cookiePal='n';
        $("body").css("backgroundColor", "#242222");
        }
    }

    cambiarColor();
});