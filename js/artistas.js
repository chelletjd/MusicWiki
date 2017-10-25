var formBusqueda = document.querySelector('#buscArt');
var artista = document.querySelector('#artista');

formBusqueda.addEventListener('submit', function (e) {
	e.preventDefault();
	let xhr = new XMLHttpRequest();
	xhr.open('GET','https://api.spotify.com/v1/search?q=' + artista.value + '&type=artist',false);
	xhr.setRequestHeader("Authorization",'Bearer BQAQXgngnjqiN7V12OYG29707gLYjtNKE1qknYe4qbfKB7CgYkAN2ulRmPuYIe5RG93ZkCgiBYMsPwNCk1OQO5I6KMa0fMsjzm-FdfJK5GCGkWiPtMsoX11EhC6kRUuQKXYc_F3Tr1hg1Pc3APCcNTKIct5SX48')
	xhr.onload = () =>{
		let json = JSON.parse(xhr.responseText).artists.items;
		var artResult = document.querySelector('#artistasResult');
		artResult.innerHTML = "";
		artista.value = "";
		json.map(function (value) {
			artResult.innerHTML += `
			<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center">
			<a data-toggle="modal" data-target="#myModal"><img cursor="pointer" class="img-responsive center-block imag" src="${typeof(value.images[1]) != "undefined" ? value.images[1].url : '../img/not-found.png'}"/></a>
			<h3>${value.name}</h3>
			</div>
			`;
		});
	//console.log(xhr.responseText);
	}

	xhr.send();

})


