var listaTransportes=[]
var listaTipos=[]

async function listaSolicitudes(){
    var clienteId = localStorage.getItem('clienteId')
    idServicio = {
        "id_servicio":1
    }
    const respuesta = await request('Get','solicitudes/lista/'+clienteId,idServicio)
    return respuesta
}

async function mostrarListaSolicitudes(){
    $("#listaSolicitudes>tbody").html('<td name="loading" colspan="8" style="text-align: center"><img src="assets/img/loading-table.gif" width="10%" height="10%"></td>')
    $('#null').hide()
    var respuesta = null;
    try {
    respuesta = await listaSolicitudes();
    } catch(error){
        $('#solicitudes').hide();
        $('#null').show();
        $('#null').html('Error al mostrar los datos: '+error.message);
        return
    }
    const obj = await respuesta.data;
    if(obj.length == 0){
        $('#solicitudes').hide()
        $('#null').show()
        return
    }
    $("#listaSolicitudes>tbody").html('')
    let container = $('#pagination');
    container.pagination({
        dataSource: obj,
        pageSize: 5,
        callback: function (data, pagination) {
                var content = "";
                $.each(data, function (index, item) {
                    content += `<tr id=${item.ID}>`;
                    content += `<td>${item.ID}</td>`;
                    content += `<td>${item.Fecha}</td>`;
                    content += `<td>${item.Hora}</td>`;
                    content += `<td>${item.Tipo}</td>`;
                    content += `<td>${item.Transporte}</td>`;
                    content += `<td>${item.Fecha_Prevista}</td>`;
                    content += `<td>`+(item.Estado == "1" ? '<span class="badge badge-warning">Pendiente</span>' : '<span class="badge badge-primary">Finalizada</span>')+`</td>`;
                    content += `<td>
                    <span id="boot-icon" class="bi bi-trash" style="font-size: 24px;" onclick='eliminarSolicitud(${item.ID})'></span></td></tr>`;
                });
                $("#listaSolicitudes>tbody").html(content)
        }
    })

}

async function cargarListas(){
    const transportes = await request('Get','solicitudes/transportes/1')
    const tipos = await request('Get','solicitudes/tipos/1')
    listaTransportes=transportes.data.map( function (elem) {
        let returnObjeto = {id: elem.ID_Transporte, nombre: elem.Transporte};
        return returnObjeto
      });
      listaTipos=tipos.data.map( function (elem) {
        let returnObjeto = {id: elem.ID_Tipo, nombre: elem.Tipo};
        return returnObjeto
      });
}

function optionValues(){
    listaTransportes.map( function (elem) {
    $('#optionTransporte').prepend(`<option value='${elem.id}' >${elem.nombre}</option>`);
    })
    listaTipos.map( function (elem) {
        $('#optionTipo').prepend(`<option value='${elem.id}' >${elem.nombre}</option>`);
        })
}

async function generarSolicitud(){
    var fecha = new Date(`${document.getElementById("fecha").value}T00:00:00`)
    var id_tipo_transporte = document.getElementById("optionTransporte").value
    var tipo_tipo_solicitud = document.getElementById("optionTipo").value
    var adicional = document.getElementById("adicional").value
    if(fecha != ''&&id_tipo_transporte!=''&&tipo_tipo_solicitud!='')
    {
        var clienteId = localStorage.getItem('clienteId')
        var solicitud =JSON.stringify({
            "id_servicio":1,
            "fecha":fecha.getFullYear() + '-'+ fecha.getMonth() + '-'+fecha.getDate() ,
            "id_tipo_transporte":id_tipo_transporte,
            "id_tipo_solicitud":tipo_tipo_solicitud,
            "adicional":adicional
        })
        const respuesta = await request('Post','solicitudes/nueva_solicitud/'+clienteId,solicitud)
        if(respuesta === 1){
            location.reload();
            return
        }

        alert("No se pudo enviar la solicitud")
    }
}

async function eliminarSolicitud(itemID){
    var clienteId = localStorage.getItem('clienteId')
    solicitud = JSON.stringify({
        "id_servicio":1,
        "id_usuario":clienteId
    })
    const respuesta = await request('Put','solicitudes/eliminar_solicitud/'+itemID,solicitud)
    if(respuesta.success){
        mostrarListaSolicitudes()
        return
    }
    alert("No se pudo eliminar la solicitud")
}