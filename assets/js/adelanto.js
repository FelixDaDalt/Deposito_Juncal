async function cargarAdelanto(){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var operacionParam = urlParams.get('id');
    idServicio = {
        "id_servicio":1
    }
    const respuesta = await request('Get','cc/ver_adelanto/'+operacionParam,idServicio)
    return respuesta
    
}

async function verAdelanto(){
        $('.pageTitle').html('Detalle de Adelanto')
        $("#listaAdelanto>tbody").html('<td name="loading" colspan="8" style="text-align: center"><img src="assets/img/loading-table.gif" width="10%" height="10%"></td>')
        const cliente = await me()
        $("#clienteNombre").html(cliente.real_name)
        $("#clienteId").html(cliente.id_cliente)

        const respuesta = await cargarAdelanto()
        var data = respuesta.data
        $("#listaAdelanto>tbody").html('')
        
        // Relleno Cabecera -->
        $("#idAdelanto").html(data[0].ID_Operacion)
        $("#fecha").html(data[0].Fecha)
        $("#hora").html(data[0].Hora)
        $("#operador").html(data[0].Operador)

        // Datos Tabla -->
        $("#listaAdelanto>tbody").html(`<tr id=${data[0].ID_Operacion}><td style="text-align:left"><li>${data[0].Observaciones}</li></td><tr>`) 
        $("#totalAdelanto").html(data[0].Monto)
}