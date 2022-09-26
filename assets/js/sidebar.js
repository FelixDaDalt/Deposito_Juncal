async function me(){
        const data = await request('Post','me')
        if(localStorage.getItem('clienteId') == null)
        {
            localStorage.setItem('clienteId',data.id_cliente)
        }
        return data
}

async function loadData(){
    me().then(data =>{
        if (window.location.href.indexOf("home.html") > -1){
        document.getElementById("welcome").innerHTML = data.real_name+" ("+data.email+")"
        }
        document.getElementById("userName").innerHTML = data.real_name
        document.getElementById("userEmail").innerHTML = data.email
    })
}

async function logout(){
    $('#loader').show()
    const respuesta = await request('Post','logout')
    if(respuesta)
    {
        sessionStorage.clear()
        window.localStorage.clear()
        window.location.assign("./home.html")
    }else{
        alert(respuesta)
    }
}