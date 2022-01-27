window.onload= main;

function main(){
    comprobarToken();
    
}

function comprobarToken() {
    if (JSON.parse(localStorage.getItem("Token")) == null) {
    
    } else {

        let token;
        if (JSON.parse(localStorage.getItem("Token")) != null) {
            token = JSON.parse(localStorage.getItem("Token"));
        }
        console.log(token);

        fetch("https://userprofile.serverred.es/api/areapersonal", {
            method: "GET",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                "auth-token": token
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data.data.user)
                mostrarUsuario(data.data.user);
            });

    }
}


function mostrarUsuario(usuari) {
    console.log(usuari.name);
    let contenido = document.createTextNode(usuari.name);
    document.getElementById("user").replaceChildren(contenido);
    document.getElementById("avatar").setAttribute("src","https://userprofile.serverred.es/public/img/"+ usuari.avatar);
}

