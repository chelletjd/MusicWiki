if (getHashParams().access_token) {
    localStorage.setItem("token", getHashParams().access_token);
    window.location = "artistas.html";
}
var token = localStorage.getItem("token");

if (token != 'undifined') {
    var bar = document.querySelector('#barra');
    bar.innerHTML += `
		<ul class="nav navbar-nav navbar-right">
          <li id="activar"><a><span class="glyphicon glyphicon-ok-circle verde"></span>  Disponible</a></li>
        </ul>
        `;
}

var load = '<div style="width:100%; text-align:center;"><i class="fa fa-spinner fa-spin" style="font-size:48px"></i></div>';
var formBusqueda = document.querySelector('#buscArt');
var artista = document.querySelector('#artista');
var tipo = document.querySelector('#selector');
var artName;
// var token = getHashParams().access_token;
console.log(token);
formBusqueda.addEventListener('submit', function(e) {
    e.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.spotify.com/v1/search?q=' + artista.value + '&type=' + tipo.value, false);
    xhr.setRequestHeader("Authorization", 'Bearer ' + token);
    if (artista.value === "") {
        formBusqueda.innerHTML += `
			<div class="alert alert-dismissible alert-danger">
			  <button type="button" class="close" data-dismiss="alert">&times;</button>
			  <strong>Debe colocar el nombre del Artista o Album a consultar.</strong>
			</div>`;
    }
    xhr.onload = () => {
        if (tipo.value == 'artist') {
            let json = JSON.parse(xhr.responseText).artists.items;
            console.log(json);
            var artResult = document.querySelector('#artistasResult');
            artResult.innerHTML = "";
            artista.value = "";
            if (json.length == 0) {
                artResult.innerHTML += `
					<div class="alert alert-dismissible alert-danger">
					  <button type="button" class="close" data-dismiss="alert">&times;</button>
					  <strong>Artista no encontrado.</strong> Verifique la busqueda.
					</div>`;
                //alert("Artista no encontrado. Verifique la busqueda.")
            }
            json.map(function(value) {
                console.log("value  " + value.id);
                artResult.innerHTML += `
				<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center modal-div-lg">
					<a data-toggle="modal" data-target="#myModal"><img name="${value.name}" id="${value.id}" class="img-responsive center-block imag" src="${typeof(value.images[1]) != "undefined" ? value.images[1].url : '../img/not-found.png'}"/></a>
					<h3>${cut(value.name)}</h3>
				</div>
				`;
                setTimeout(function() {
                    document.getElementById(value.id).parentElement.addEventListener('click', function(arg) {
                        var modalHeader = document.querySelector('#modalTitle');
                        var modalBody = document.querySelector('#modalBody');
                        modalBody.innerHTML = load;
                        modalHeader.innerHTML = "";
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
                                if (a.album_type == 'album') {
                                    console.log('album')
                                    console.log("aaa  " + a.id);
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
            let json = JSON.parse(xhr.responseText).albums.items;
            console.log(json);
            var artResult = document.querySelector('#artistasResult');
            artResult.innerHTML = "";
            artista.value = "";
            if (json.length == 0) {
                artResult.innerHTML += `
					<div class="alert alert-dismissible alert-danger">
					  <button type="button" class="close" data-dismiss="alert">&times;</button>
					  <strong>Album no encontrado.</strong> Verifique la busqueda.
					</div>`;
                //alert("Artista no encontrado. Verifique la busqueda.")
            }
            json.map(function(value) {
                artResult.innerHTML += `
					<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center modal-div-lg">
					<a data-toggle="modal" data-target="#myModal"><img name="${value.name}" id="${value.id}" class="img-responsive center-block imag" src="${typeof(value.images[1]) != "undefined" ? value.images[1].url : '../img/not-found.png'}"/></a>
					<h3>${value.name}</h3>
					</div>
					`;
                setTimeout(function() {
                    document.getElementById(value.id).parentElement.addEventListener('click', function(arg) {
                        let xh = new XMLHttpRequest();
                        var name = arg.target.name;
                        var modalBody = document.querySelector('#modalBody');
                        modalBody.innerHTML = load;
                        console.log(name);
                        xh.open('GET', `https://api.spotify.com/v1/albums/${arg.target.id}/tracks`, true);
                        xh.setRequestHeader("Authorization", 'Bearer ' + token);
                        xh.onload = () => {
                            let jso = JSON.parse(xh.responseText).items;
                            console.log(jso);
                            var modalHeader = document.querySelector('#modalTitle');
                            modalHeader.innerHTML = "";
                            modalHeader.innerHTML = name + " - Canciones";
                            jso.map(function(a) {
                                modalBody.innerHTML = "";
                                console.log("aaa  " + a.id);
                                var dispo;
                                if (a.preview_url != null) {
                                    dispo = '<span class="label label-success">Disponible</span> <br>';
                                    console.log('cancion disponible');
                                } else {
                                    dispo = '<span class="label label-danger">No Disponible</span> <br>';
                                    console.log('cancion no disponible');
                                }
                                modalBody.innerHTML += `
								<div class="row">
									<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
										<a href="${a.preview_url}" target="_blank"><span>${a.name}</span></a>
									</div>
									<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
										${dispo}
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
            formBusqueda.innerHTML += `
			<div class="alert alert-dismissible alert-danger">
			  <button type="button" class="close" data-dismiss="alert">&times;</button>
			  <strong>Debe seleccionar una categoria de busqueda.</strong>
			</div>`;

        }
    }
    xhr.send();
});
    

function cut(texto) {
    var newText = texto.slice(0,50) + "...";
    return newText;
}

function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}