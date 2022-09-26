async function cargarConciliacion(){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var operacionParam = urlParams.get('id');
    idServicio = {
        "id_servicio":1
    }
    const respuesta = await request('Get','cc/ver_conciliacion/'+operacionParam,idServicio)
    return respuesta
    
}

async function verConciliacion(){
        $('.pageTitle').html('Detalle de Conciliacion')
        $("#listaConciliacion>tbody").html('<td name="loading" colspan="8" style="text-align: center"><img src="assets/img/loading-table.gif" width="10%" height="10%"></td>')
        const cliente = await me()
        $("#clienteNombre").html(cliente.real_name)
        $("#clienteId").html(cliente.id_cliente)

        const respuesta = await cargarConciliacion()
        var data = respuesta.data
        $("#listaConciliacion>tbody").html('')
        
        // Relleno Cabecera -->
        $("#idOperacion").html(data[0].ID_Operacion)
        $("#fecha").html(data[0].Fecha)
        $("#hora").html(data[0].Hora)
        $('span[name="desde"]').html(data[0].Observaciones)

        // Datos Tabla -->
        $("#listaConciliacion>tbody").html(`
        <tr id=${data[0].ID_Operacion}>
        <td>${data[0].ID_Operacion}</td>
        <td>${data[0].Fecha}</td>
        <td>${data[0].Hora}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td></tr>`) 
        
        $("#textInicial").html(data[0].Texto_Inicial)
        $("#Saldo_Inicial").html(data[0].Saldo_Inicial)

        $("#cheque").html(data[0].Cheque)
        $("#efectivo").html(data[0].Efectivo)
        
        $("#total").html(data[0].Total)
        $("#conciliado").html(data[0].Monto_Conciliado)
        $("#saldo").html(parseFloat(data[0].Total)-parseFloat(data[0].Monto_Conciliado)+parseFloat(data[0].Saldo_Inicial))

}

