async function Login(data){
        const respuesta = await request('Post','login',data)
        var token = JSON.stringify(respuesta.access_token)
        localStorage.setItem('token', token.replaceAll('"', ''))
        sessionStorage.setItem('status','loggedIn')
        window.location.assign("./home.html")
        
}

async function onClickLogin(){
    $('#loader').show()
    var user = document.getElementById("usuario").value
    var pass = document.getElementById("password").value
    
    if (user != '' && password != '')
    {
        userData = JSON.stringify({
            "name":user,
            "password":pass
        })
        Login(userData)
    }
}

function logueado(){
    if (sessionStorage.getItem('status') != null)
    {
        history.back()
    }
}