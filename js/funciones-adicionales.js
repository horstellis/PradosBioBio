// Load the IFrame Player API code asynchronously.
// establecido como funcion
function reproductor(id) {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Replace the 'ytplayer' element with an <iframe> and
    // YouTube player after the API code downloads.
    var player;
    function onYouTubePlayerAPIReady() {
        player = new YT.Player('ytplayer', {
            //height: '390',
            //width: '640',
            videoId: id
        });
    }
}

//Cargar Video
function cargarVideo(video) {
    var frame = "<iframe src='https://www.youtube.com/embed/" + video + "' frameborder='0' allowfullscreen></iframe>";
    $('#ytplayer').html(frame);
}

//Eliminar registro de Asignación
function eliminarRegistroAsignado(rut) {
    alertify.confirm('Eliminar registro', '¿Desea eliminar el registro?',
        function () {
            $('.tooltipped').tooltip('remove');
            var asignacion = JSON.parse(localStorage.getItem("asignacion"));
            if (asignacion != null) {
                tam = asignacion.data.length;
                for (var i = 0; i < tam; i++) {
                    var rutEncontrado = asignacion.data[i].rut;
                    if (rutEncontrado == rut) {
                        asignacion['data'].splice(i, 1);
                        i = tam;
                    }
                }
                localStorage.setItem("asignacion", JSON.stringify(asignacion))
                var tr = $('#cuerpoListado tr');
                var tam = tr.length;
                for (var i = 0; i < tam; i++) {
                    tr[i].remove();
                }
                try{
                    if (asignacion.data.length < 1) {
                        localStorage.removeItem("asignacion");
                    }
                }catch(e){}
                if (asignacion != null) {
                    tr = "";
                    tam = asignacion.data.length;
                    for (var i = 0; i < tam; i++) {
                        var id = "'" + asignacion.data[i].video + "'";
                        rut = "'" + asignacion.data[i].rut + "'";
                        var eliminar = "<button class='red btn btn-floating tooltipped waves-effect waves-circle' data-position='left' data-tooltip='eliminar alumno' onclick=\"eliminarRegistroAsignado(" + rut + ")\"><i class='material-icons'>delete</i></button>";
                        var verMas = "<button class='red btn btn-floating tooltipped waves-effect waves-circle' data-position='right' data-tooltip='ver video' onclick=\"cargarVideo(" + id + ")\"><i class='material-icons'>movie</i></button>";
                        tr += "<tr id='" + asignacion.data[i].rut + "'>";
                        tr += "<td>" + asignacion.data[i].rut + "</td>";
                        tr += "<td>" + asignacion.data[i].nombre + "</td>";
                        tr += "<td>" + asignacion.data[i].carrera + "</td>";
                        tr += "<td>" + asignacion.data[i].fecha + "</td>";
                        tr += "<td>" + eliminar + "</td>";
                        tr += "<td>" + verMas + "</td>";
                        tr += "</tr>";
                    }
                } else {
                    tr = "<td colspan='6' class='center'>No hay datos</td>";
                }
                $('#cuerpoListado').append(tr);
                $('.tooltipped').tooltip({ delay: 50 });
                cargarVideo('gsbmgVQE5oM');
            }
        },
        function () {
            alertify.alert('Eliminar registro', 'Operación cancelada')
        });
    
}