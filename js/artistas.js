//Verifica si el token esta en localStorage
if (getHashParams().access_token) {
    localStorage.setItem("token", getHashParams().access_token);
    window.location = "artistas.html";
}
//Se crea la variable token en artistas.js
var token = localStorage.getItem("token");

//Se verifica que encuentre el token para colocarlo disponible
if (token != 'undifined') {
    var bar = document.querySelector('#barra');
    bar.innerHTML += `
          <li id="activar"><a><span class="glyphicon glyphicon-ok-circle verde"></span>  Disponible</a></li>
        `;
}
// Variables de Carga, y formulario
var load = '<div style="width:100%; text-align:center;"><i class="fa fa-spinner fa-spin" style="font-size:48px"></i></div>';
var formBusqueda = document.querySelector('#buscArt');
var artista = document.querySelector('#artista');
var tipo = document.querySelector('#selector');
var artName;
// var token = getHashParams().access_token;
// console.log(token);
//Evento del Formulario
formBusqueda.addEventListener('submit', function(e) {
    e.preventDefault();
    if (artista.value === "") {
        // Mensaje de alerta para input vacio
        document.querySelector("#warning").innerHTML = `
            <div class="alert alert-dismissible alert-danger">
              <button type="button" class="close" data-dismiss="alert">&times;</button>
              <strong>Debe colocar el nombre del Artista o Album a consultar.</strong>
            </div>`;
    } else {
        //Peticion a la api de nombre y tipo de busqueda
        document.querySelector("#warning").innerHTML = '';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.spotify.com/v1/search?q=' + artista.value + '&type=' + tipo.value, false);
        xhr.setRequestHeader("Authorization", 'Bearer ' + token);
        
        xhr.onload = () => {
            if (tipo.value == 'artist') {
                let json = JSON.parse(xhr.responseText).artists.items;
                // console.log(json);
                var artResult = document.querySelector('#artistasResult');
                artResult.innerHTML = "";
                artista.value = "";
                //Mensaje de alerta para Artista no encontrado
                if (json.length == 0) {
                    artResult.innerHTML += `
    					<div class="alert alert-dismissible alert-danger">
    					  <button type="button" class="close" data-dismiss="alert">&times;</button>
    					  <strong>Artista no encontrado.</strong> Verifique la busqueda.
    					</div>`;
                    //alert("Artista no encontrado. Verifique la busqueda.")
                }
                json.map(function(value) {
                    //Crea todos los resultados de la busqueda
                    console.log("value  " + value.id);
                    artResult.innerHTML += `
    				<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center modal-div-lg">
    					<a href="#" data-toggle="modal" data-target="#myModal"><img name="${value.name}" id="${value.id}" class="img-responsive center-block imag" src="${typeof(value.images[1]) != "undefined" ? value.images[1].url : '../img/not-found.png'}"/></a>
    					<h3>${cut(value.name)}</h3>
                        <a class="color-boton" href="${value.external_urls.spotify}" target="_blank"> Ver Perfil Completo</a>
    				</div>
    				`;
                    setTimeout(function() {
                        //Evento al hacer click a la imagen
                        document.getElementById(value.id).parentElement.addEventListener('click', function(arg) {
                            var modalHeader = document.querySelector('#modalTitle');
                            var modalBody = document.querySelector('#modalBody');
                            modalBody.innerHTML = load;
                            modalHeader.innerHTML = "";
                            // Peticion a la api de los albumes del artista
                            let xh = new XMLHttpRequest();
                            var name = arg.target.name;
                            console.log(name);
                            xh.open('GET', `https://api.spotify.com/v1/artists/${arg.target.id}/albums`, true);
                            xh.setRequestHeader("Authorization", 'Bearer ' + token);
                            xh.onload = () => {
                                let jso = JSON.parse(xh.responseText).items;
                                console.log('jso  ' + jso);
                                modalHeader.innerHTML = name + " - Albums";
                                modalBody.innerHTML = "";
                                jso.map(function(a) {
                                    //Valida que sean de tipo album
                                    if (a.album_type == 'album') {
                                        console.log('album')
                                        console.log("aaa  " + a.id);
                                        //Agrega los albumes encontrados al Modal
                                        modalBody.innerHTML += `
    									<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 modal-div">
    										<img name="${a.name}" id="${a.id}" class="img-responsive center-block imag-sm" src="${typeof(a.images[1]) != "undefined" ? a.images[1].url : '../img/not-found.png'}"/></a>
    										<h5 class="text-center">${a.name}</h5>
    									</div>
    									`;
                                    }
                                });

                            }
                            xh.send();
                        });
                    }, 0);
                });
            } else if (tipo.value == 'album') {
                //Consulta por albums
                let json = JSON.parse(xhr.responseText).albums.items;
                // console.log(json);
                var artResult = document.querySelector('#artistasResult');
                artResult.innerHTML = "";
                artista.value = "";
                if (json.length == 0) {
                    //Mensaje de error si el album o se encuentra
                    artResult.innerHTML += `
    					<div class="alert alert-dismissible alert-danger">
    					  <button type="button" class="close" data-dismiss="alert">&times;</button>
    					  <strong>Album no encontrado.</strong> Verifique la busqueda.
    					</div>`;
                    //alert("Artista no encontrado. Verifique la busqueda.")
                }
                json.map(function(value) {
                    //Agrega los albumes
                    artResult.innerHTML += `
    					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center modal-div-lg">
    					<a data-toggle="modal" data-target="#myModal"><img name="${value.name}" id="${value.id}" class="img-responsive center-block imag" src="${typeof(value.images[1]) != "undefined" ? value.images[1].url : '../img/not-found.png'}"/></a>
    					<h3>${cut(value.name)}</h3>
    					</div>
    					`;
                    setTimeout(function() {
                        document.getElementById(value.id).parentElement.addEventListener('click', function(arg) {
                            //Al hacer click en la imagen del album
                            let xh = new XMLHttpRequest();
                            var name = arg.target.name;
                            var modalBody = document.querySelector('#modalBody');
                            modalBody.innerHTML = load;
                            console.log(name);
                            //Busca las canciones del album
                            xh.open('GET', `https://api.spotify.com/v1/albums/${arg.target.id}/tracks`, true);
                            xh.setRequestHeader("Authorization", 'Bearer ' + token);
                            xh.onload = () => {
                                let jso = JSON.parse(xh.responseText).items;
                                console.log(jso);
                                var modalHeader = document.querySelector('#modalTitle');
                                modalHeader.innerHTML = "";
                                modalHeader.innerHTML = name + " - Canciones";
                                modalBody.innerHTML = "";
                                jso.map(function(a) {
                                    
                                    console.log("aaa  " + a.id);
                                    var dispo;
                                    //Agrega si el preview de la cancion esta disponible
                                    if (a.preview_url != null) {
                                        dispo = '<span class="label label-success">Disponible</span> <br>';
                                        console.log('cancion disponible');
                                    } else {
                                        dispo = '<span class="label label-danger">No Disponible</span> <br>';
                                        console.log('cancion no disponible');
                                    }
                                    // Agrega las canciones
                                    modalBody.innerHTML += `
    								<div class="row">
    									<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
    										<span>${a.name}</span>
    									</div>
    									<div class="col-xs-12 col-sm-12 col-md-2 col-lg-2">
    										${dispo}
    									</div>

                                        <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 auto-fill">
                                            <audio controls>
                                                <source src="${a.preview_url}" type="audio/mpeg">
                                                Your browser does not support the audio tag.
                                            </audio>
                                        </div>
    								</div>
    								`;
                                });

                            }
                            xh.send();
                        });
                    }, 0);
                });

            } else {
                // Verifica que se halla seleccionado una categoria
                document.querySelector("#warning").innerHTML = `
    			<div class="alert alert-dismissible alert-danger">
    			  <button type="button" class="close" data-dismiss="alert">&times;</button>
    			  <strong>Debe seleccionar una categoria de busqueda.</strong>
    			</div>`;

            }
        }
        xhr.send();
    }
});
    
//Funcion que recorta el Texto en los nombres
function cut(texto) {
    if (texto.length >= 50) {
        var newText = texto.slice(0,50) + "...";
        return newText;
    }else {
        return texto;
    }
    
}

// Funcion que Obtiene el token
function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}