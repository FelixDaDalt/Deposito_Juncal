async function listaPrecios(){
    var clienteId = localStorage.getItem('clienteId')
    idServicio = {
        "id_servicio":1
    }
    const respuesta = await request('Get','lista_precios/'+clienteId,idServicio)
    return respuesta
}

async function mostrarListaPrecios(){
    $("#listaPrecios>tbody").html('<td name="loading" colspan="4" style="text-align: center"><img src="assets/img/loading-table.gif" width="10%" height="10%"></td>')
    $('#null').hide()
    var respuesta = null;
    try {
    respuesta = await listaPrecios()
    }catch (e){
        $('#precios').hide();
        $('#null').show();
        $('#null').html('Error al mostrar los datos: '+error.message);
        return
    }
    const obj = await respuesta.data;
    if(obj.length == 0){
        $('#precios').hide()
        $('#null').show()
        return
    }

    $("#listaPrecios>tbody").html('')
    let container = $('#pagination');
    container.pagination({
        dataSource: obj,
        pageSize: 5,
        callback: function (data, pagination) {
            var content = "";
                $.each(data, function (index, item) {
                    content += `<tr id=${item.id}>`
                    content += `<td>${item.id}</td>`;
                    content += `<td>${item.producto}</td>`
                    content += `<td>${item.cotizacion}</td>`
                    content += `<td>${item.ultima_act}</td></tr>`;
                });
                $("#listaPrecios>tbody").html(content)
        }
    })

}