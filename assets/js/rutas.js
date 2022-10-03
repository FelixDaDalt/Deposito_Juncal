const url = 'http://apirest.depositojuncal.com.ar/api/auth/'

async function request(metodo,ruta,data){
        const response = await $.ajax({
        url: url+ruta,
        method: metodo,
        headers: (ruta=='login')?{'Content-Type':'application/json'}
        :{ "Authorization": `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'},
        dataType: 'json',   
        data:data,
        beforeSend: function() {
        },
        success: function(response){
        },
        error: function(jqXHR, textStatus, errorThrown){
            if(jqXHR.status === 401) /// no autorizado
            { 
                sessionStorage.clear()
                window.localStorage.clear()
                window.location.assign("./index.html")
                return
            }else{
                alert('Error: ' + jqXHR.responseText + jqXHR.status)
                return     
            }
        },
        complete: function() {
        },
    })
    return response
}