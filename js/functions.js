$(document).ready(function () {
    //Funcion para resetar formularios
    jQuery.fn.resetear = function () {
        $(this).each(function () { this.reset(); });
    };
    //Carga de efectos materializecss
    $('.parallax').parallax();
    $('.button-collapse').sideNav({ 'edge': 'right' });
    $('.materialboxed').materialbox();
    $('.slider').slider();
    $('.modal').modal();
    $('.scrollspy').scrollSpy();
    $('#carga').modal({
        dismissible: false,
        opacity: .9
    });
    //Define tamañao de div de contenido
    $('#facebook').height("600");
    $('#producto').height("600");
    //Valida formulario
    var formularioContacto = $('#frm_contacto').validate({
        rules: {
            nombre: {
                required: true,
                minlength: 5,
                maxlength: 50,
                letterandspace: true
            },
            numero: {
                required: true,
                minlength: 6,
                maxlength: 9,
                number: true
            },
            correo: {
                required: true,
                minlength: 5,
                email: true
            },
            mensaje: {
                required: true,
                minlength: 5,
                maxlength: 500,
                sololetras: true
            }
        },
        messages: {
            nombre: {
                required: "debes indicar tu nombre",
                minlength: "nombre debe tener mínimo 5 caracteres",
                maxlength: "nombre debe tener máximo 50 caracteres",
                letterandspace: "sólo se permiten letras y espacios"
            },
            numero: {
                required: "debes indicar tu numero de telefono",
                minlength: "el telefono debe tener minimo 6 numeros",
                maxlength: "el telefono debe tener maximo 9 numeros",
                number: "sólo se permite el uso de numeros"
            },
            correo: {
                required: "debes indicar tu correo",
                minlength: "correo debe tener minimo 5 caracteres",
                email: "debe escribir un email valido (ejemplo@dominio.com)"
            },
            mensaje: {
                required: "debes indicar tu consulta",
                minlength: "el mensaje debe tener minimo 5 caracteres",
                maxlength: "el mensaje debe tener maximo 500 caracteres",
                sololetras: "no se permite el uso de caracteres especiales"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
        }
    });
    var formularioLogin = $("#frmLogin").validate({
        rules: {
            txtUsuario: {
                required: true,
                minlength: 5,
                email: true
            },
            txtPass: {
                required: true
            }
        },
        messages: {
            txtUsuario: {
                required: "debes indicar tu usuario",
                minlength: "el usuario debe tener mínimo 5 caracteres",
                email: "el usuario debe tener formato ejemplo@dominio.com"
            },
            txtPass: {
                required: "debes indicar tu password"
            }
        },
        errorElement: 'div',
        errorPlacement: function (error, element) {
            var placement = $(element).data('error');
            if (placement) {
                $(placement).append(error)
            } else {
                error.insertAfter(element);
            }
        }
    });
    //Envia formulario
    $('#enviarContacto').on('click', function () {
        if (formularioContacto.form()) {
            var datos = {
                "nombre": $('#nombre').val(),
                "numero": $('#numero').val(),
                "correo": $('#correo').val(),
                "mensaje": $('#mensaje').val()
            };
            console.log(datos);
            $.ajax({
                data: datos,
                url: './despachador/enviarCorreo.php',
                type: 'POST',
                beforeSend: function () {
                    console.log("Enviando mensaje...")
                    $('#carga').modal('open');
                },
                success: function (response) {
                    $('#carga').modal('close');
                    console.log("Respuesta despachador: " + response);
                    if (response.indexOf("perfecto") > -1) {
                        swal("Mensaje enviado!", "Pronto nos pondremos en contacto", "success");
                        $('#frm_contacto').resetear();
                    } else {
                        swal("Mensaje no enviado!", "El mensaje no se pudo enviar, intentalo nuevamente", "error");
                    }
                }
            });
        } else {
            console.log("No funciono :(");
        }
    });
    $('#cmdAcceder').click(function () {
        if (formularioLogin.form()) {
            var datos = {
                "user": $('#txtUsuario').val(),
                "pass": $('#txtPass').val()
            };
            $.ajax({
                data: datos,
                url: '../despachador/acceso.php',
                type: 'POST',
                beforeSend: function () {
                    console.log("Accediendo...")
                },
                success: function (response) {
                    console.log(response);
                    if (response == 'ok') {
                        swal("inicio de sesión", "acceso correcto", "success");
                    } else if (response == 'pass') {
                        swal("inicio de sesión", "password incorrecta", "error");
                    } else if (response == 'user') {
                        swal("inicio de sesión", "usuario no existe", "error");
                    } else {
                        swal("inicio de sesión", "error desconocido", "error");
                    }
                }
            });
        } else {
            console.log("No funciono :(");
        }
    });
    $('#abrirGaleria').click(function () {
        $('.button-collapse').sideNav('hide');
        $('#galeria').modal('open');
    });
});
