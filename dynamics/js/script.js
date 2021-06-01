$(document).ready(()=>{

    let inputUser = $("#nomUsuario");
    let submitBtn = $("#submitPalUser");
    let btnAjust = $("#bntAjust");
    let iconAjust = $("#iconAjust");
    let paleta = $("#paleta");
    let estadoPal = 0;

    /*btnAjust.click(()=>{
        inputUser.removeAttr("required");
    });

    iconAjust.click(()=>{
        inputUser.removeAttr("required");
    });*/

    

    //COMPROVAR SI YA EXISTE LA COOKIE PARA DETERMINAR SI ES NECESARIO DESPLEGAR EL MODAL.
    if(inputUser.val() == "" || inputUser.val() == null)
    {
        console.log(inputUser.val()+"No hay nada, debe de salir la modal.");
        $("#staticBackdrop").modal("show");

    }
    else
    {
        console.log("Se reinicio la pagina, pero ya existe el usuario, por lo tanto, no se despliega nada.");
    }

    
    paleta.on("click",()=>{
        if(estadoPal%2 == 0)
        {
            $("body").css("backgroundColor", "white");
            estadoPal++;
        }
        else
        {
            $("body").css("backgroundColor", "#242222");
            estadoPal++;
        }
    });

    submitBtn.click(()=>{
        console.log("checar y validar.")
        if(inputUser.val() == "" || inputUser.val() == null || inputUser.val() == undefined)
        {
            inputUser.css("borderColor", "red");
            inputUser.attr("placeholder", "Usuario inválido");
        }
        else{
            submitBtn.text("Confirmar"):
            inputUser.css("borderColor", "black");
            inputUser.attr("disabled","true");
            submitBtn.attr("data-bs-dismiss","modal");
        }
    });
        
    
});

