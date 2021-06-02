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
    //declaración de la variables
    var fecha = new Date();
    fecha.setTime(fecha.getTime()+1000*60*60*24*7);
    var hoy = new Date();
    hoy.setTime(hoy.getTime() - 1);

    let inputUser = $("#nomUsuario");
    let submitBtn = $("#submitPalUser");
    let cambiarBtn = $("#cambiarUser");
    let btnAjust = $("#bntAjust");
    let iconAjust = $("#iconAjust");
    let paleta = $("#paleta");
    let estadoPal = 0;
    let cookiePal='n';
    let stringCookie;

    //COMPROBAR SI YA EXISTE LA COOKIE PARA DETERMINAR SI ES NECESARIO DESPLEGAR EL MODAL.
    if(valCookie("activo", 1) == "activo" &&  valCookie("activo", 1) != "")
    {
        console.log("Se reinicio la pagina, pero ya existe el usuario, por lo tanto, no sedespliega nada.");
        //console.log(valCookie(inputUser.val(), 1))
        inputUser.val(valCookie("activo", 2));
        inputUser.attr("disabled","true");
        cambiarBtn.show();
        cambiarColor();
    }
    else
    {
        console.log(inputUser.val()+"No hay nada, debe de salir la modal.");
        $("#staticBackdrop").modal("show");
        cambiarBtn.hide();
    }

    //cambia el color a modo oscuro o modo claro en la cookie
    paleta.on("click",()=>{
        let activa = valCookie("activo", 2);
        
        if(estadoPal%2 == 0)
        {
            $("body").css("backgroundColor", "#d6d6d6");
            estadoPal++;
            cookiePal="b";
            if(valCookie(activa, 1)!= null || valCookie(activa, 1)!= "")
            {
                stringCookie = valCookie(activa, 2);
                stringCookie=stringCookie.replace(stringCookie.charAt(0), cookiePal);
                console.log(cookiePal);
                document.cookie=activa+"="+stringCookie+";expires="+fecha.toGMTString();
                console.log(stringCookie);
            }    
        }
        else
        {
            $("body").css("backgroundColor", "#242222");
            estadoPal++;
            cookiePal="n";
            if(valCookie(activa, 1)!= null || valCookie(activa, 1)!= "")
            {
                stringCookie = valCookie(activa, 2);
                stringCookie=stringCookie.replace(stringCookie.charAt(0), cookiePal);
                console.log(cookiePal);
                document.cookie=activa+"="+stringCookie+";expires="+fecha.toGMTString();
                console.log(stringCookie);
            }
        }
        
    });

    submitBtn.click(()=>{
        //console.log("checar y validar.")
        if(inputUser.val() == "" || inputUser.val() == null || inputUser.val() == undefined)
        {
            inputUser.css("borderColor", "red");
            inputUser.attr("placeholder", "Usuario inválido");
        }
        else{
            document.cookie = "activo=" +inputUser.val();
            let nueva= valCookie("activo", 2);
            if(valCookie(nueva,1)== null || valCookie(nueva,1)== ""){
                document.cookie=valCookie("activo", 2)+"="+cookiePal+";expires="+fecha.toGMTString();
            }
            else{
                cambiarColor();
                stringCookie = valCookie(nueva, 2);
                stringCookie = stringCookie.replace(stringCookie.charAt(0), cookiePal);
                document.cookie=nueva+"="+stringCookie+";expires="+fecha.toGMTString();
            }
            paleta.show();
            $("#modo").show();
            console.log(document.cookie);
            submitBtn.text("Confirmar");
            inputUser.css("borderColor", "black");
            inputUser.attr("disabled","true");
            submitBtn.attr("data-bs-dismiss","modal");
        }
    });

    cambiarBtn.click(()=>{
        inputUser.removeAttr("disabled");
        paleta.hide();
        $("#modo").hide();
        if(inputUser.val() == "" || inputUser.val() == null || inputUser.val() == undefined)
        {
            inputUser.css("borderColor", "red");
            inputUser.attr("placeholder", "Usuario inválido");
        }
        else{
            inputUser.css("borderColor", "black");
        }
        //document.cookie='activo=""; expires=Thu, 01 Jan 1970 00:00:00';
        //cambiarColor();
    });     

    btnAjust.click(()=>{
        cambiarBtn.show();
    });

    iconAjust.click(()=>{
        cambiarBtn.show();
    });
});