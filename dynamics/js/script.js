$(document).ready(()=>{
    $("#staticBackdrop").modal("show");
    
    let usuario = $("#floatingEmail");
    let boton = $("#submitPalUser");

    console.log(usuario.val()+"No valgo ndadadadada");
    
    boton.click(()=>{
        if(usuario.val() == "" || usuario.val() == null)
        {
            console.log(usuario.val()+"No escribio nada");

        }
        else
        {
            $("#nombreUsuario").hide();
            console.log(usuario.val()+"Se supone que si no escribio nada, no salgo");
        }
    });
});

