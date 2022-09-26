async function cuentaCorriente(){
    var clienteId = localStorage.getItem('clienteId')
    idServicio = {
        "id_servicio":1
    }
    const respuesta = await request('Get','cc/cuenta_corriente/'+clienteId,idServicio)
    return respuesta
}

async function mostrarCuentaCorriente(){
    $("#listaCuentaCorriente>tbody").html('<td name="loading" colspan="8" style="text-align: center"><img src="assets/img/loading-table.gif" width="10%" height="10%"></td>')
    $('#null').hide()
    const respuesta = await cuentaCorriente()
    const obj = await respuesta.data;
    if(obj.length == 0)
    {
        $('#cuentaCorriente').hide()
        $('#null').show()
        return
    }

    $("#listaCuentaCorriente>tbody").html('')
    let container = $('#pagination');
    container.pagination({
        dataSource: obj,
        pageSize: 5,
        callback: function (data, pagination) {
                var content = "";
                $.each(data, function (index, item) {
                    content += `<tr id=${item.id_operacion}>`
                    content += `<td>${item.id_operacion}</td>`
                    content += `<td>${item.fecha}</td>`;
                    content += `<td>${item.hora}</td>`
                    content += `<td>${item.tipo}</td>`
                    content += `<td>${item.detalle}</td>`;
                    content += `<td>${item.peso}</td>`;
                    content += `<td>${item.importe}</td>`;
                    content += `<td>${item.saldo}</td>`;
                    if(item.tipo == "Adelanto"){
                        content += `<td><button type="button" class="btn btn-primary btn-sm" onclick='location.href="ver_adelanto.html?id=${item.id_operacion}"'><span class="bi bi-arrow-right-circle"></span></button> `;
                    }else if(item.tipo == "Conciliacion"){
                    content += `<td><button type="button" class="btn btn-primary btn-sm" onclick='location.href="ver_conciliacion.html?id=${item.id_operacion}"'><span class="bi bi-bank"></span></button> `;
                    }else{
                    content += `<td><button type="button" class="btn btn-primary btn-sm" onclick='location.href="ver_operacion.html?id=${item.id_operacion}"'><span class="bi bi-zoom-in"></span></button> `;
                    }
                   content +=`</td></tr>`
                });
                $("#listaCuentaCorriente>tbody").html(content)                
        }
    })


}