async function cargarOperacion(){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var operacionParam = urlParams.get('id');
    idServicio = {
        "id_servicio":1
    }
    const respuesta = await request('Get','cc/ver_operacion/'+operacionParam,idServicio)
    return respuesta
    
}

async function verOperacion(){
       
        $('.pageTitle').html('Detalle de Operación')
        $("#listaOperacion>tbody").html('<td name="loading" colspan="8" style="text-align: center"><img src="assets/img/loading-table.gif" width="10%" height="10%"></td>')
        const cliente = await me()
        $("#clienteNombre").html(cliente.real_name)
        $("#clienteId").html(cliente.id_cliente)

        const respuesta = await cargarOperacion()
        var data = respuesta.data
        $("#listaOperacion>tbody").html('')
        
        // Relleno Cabecera -->
        $("#idOperacion").html(data[0].ID_Operacion)
        $("#fecha").html(data[0].Fecha)
        $("#hora").html(data[0].Hora)

        // Datos Tabla -->
        data[0].C == "0" ? $("#Estado").html('<span class="badge badge-warning">Pendiente<span>') : $("#Estado").html('<span class="badge badge-success">Finalizada<span>');
        var content = "";
       $.each(data, function (x, operacion) {
                    $.each(operacion.detalle_operacion, function (i, datalle) {
                        content += `<tr id=${operacion.ID_Operacion}>`
                        content += `<td>${datalle.Producto}</td>`;
                        content += `<td>${datalle.Peso}</td>`;
                        content += `<td>${datalle.Unitario}</td>`;
                        content += `<td>${datalle.Sub_Total}</td></tr>`;
                    })
        }) 
        $("#listaOperacion>tbody").html(content) 
        $("#totalOperacion").html(data[0].Total)
}

