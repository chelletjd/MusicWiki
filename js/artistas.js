if(getHashParams().access_token){
   localStorage.setItem("token",getHashParams().access_token);
   window.location = "artistas.html";
}

var token = localStorage.getItem("token");
var formBusqueda = document.querySelector('#buscArt');
var artista = document.querySelector('#artista');
var tipo = document.querySelector('#selector');
var artName;
// var token = getHashParams().access_token;
console.log(token);
formBusqueda.addEventListener('submit', function (e) {
	e.preventDefault();
	let xhr = new XMLHttpRequest();
	xhr.open('GET','https://api.spotify.com/v1/search?q=' + artista.value + '&type=' + tipo.value ,false);
	xhr.setRequestHeader("Authorization",'Bearer '+ token);
	xhr.onload = () =>{
		if (tipo.value == 'artist') {
			let json = JSON.parse(xhr.responseText).artists.items;
			console.log(json);
			var artResult = document.querySelector('#artistasResult');
			artResult.innerHTML = "";
			artista.value = "";
			json.map(function (value) {
				console.log("value  " + value.id);
				artResult.innerHTML += `
				<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center">
				<a data-toggle="modal" data-target="#myModal"><img name="${value.name}" id="${value.id}" class="img-responsive center-block imag" src="${typeof(value.images[1]) != "undefined" ? value.images[1].url : '../img/not-found.png'}"/></a>
				<h3>${value.name}</h3>
				</div>
				`; 
				setTimeout(function(){
					document.getElementById(value.id).parentElement.addEventListener('click', function (arg) {
						var modalHeader = document.querySelector('#modalTitle');
						var modalBody = document.querySelector('#modalBody');
						modalBody.innerHTML = "";
						modalHeader.innerHTML = "";
						let xh = new XMLHttpRequest();
						var name = arg.target.name;
						console.log(name);
						xh.open('GET',`https://api.spotify.com/v1/artists/${arg.target.id}/albums` ,true);
						xh.setRequestHeader("Authorization",'Bearer '+ token);
						xh.onload = () => {
							let jso = JSON.parse(xh.responseText).items;
							console.log('jso  '+jso);
							
							modalHeader.innerHTML = name + " - Albums";
							jso.map(function (a) {
									if (a.album_type == 'album') {console.log('album')
									console.log("aaa  " + a.id);
									modalBody.innerHTML += `
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
		}else if (tipo.value == 'album') {
			let json = JSON.parse(xhr.responseText).albums.items;
			console.log(json);
			var artResult = document.querySelector('#artistasResult');
			artResult.innerHTML = "";
			artista.value = "";
			json.map(function (value) {
				artResult.innerHTML += `
				<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center">
				<a data-toggle="modal" data-target="#myModal"><img name="${value.name}" id="${value.id}" class="img-responsive center-block imag" src="${typeof(value.images[1]) != "undefined" ? value.images[1].url : '../img/not-found.png'}"/></a>
				<h3>${value.name}</h3>
				</div>
				`;
				setTimeout(function(){
					document.getElementById(value.id).parentElement.addEventListener('click', function (arg) {
						let xh = new XMLHttpRequest();
						var name = arg.target.name;
						console.log(name);
						xh.open('GET',`https://api.spotify.com/v1/albums/${arg.target.id}/tracks` ,true);
						xh.setRequestHeader("Authorization",'Bearer '+ token);
						xh.onload = () => {
							let jso = JSON.parse(xh.responseText).items;
							console.log(jso);
							var modalHeader = document.querySelector('#modalTitle');
							var modalBody = document.querySelector('#modalBody');
							modalHeader.innerHTML = "";
							modalBody.innerHTML = "";
							modalHeader.innerHTML = name + " - Canciones";
							jso.map(function (a) {
								console.log("aaa  " + a.id);
								modalBody.innerHTML += `
								<a href="${a.preview_url}" target="_blank"><h5>${a.name}</h5></a>
								`; 
							});
											
						}
						xh.send();
					});
				}, 0);
			});

		}else{
			alert("Debe seleccionar una categoria de busqueda");
		}
	}
	xhr.send();
});

function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}
