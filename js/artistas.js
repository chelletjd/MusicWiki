var formBusqueda = document.querySelector('#buscArt');
var artista = document.querySelector('#artista');
var tipo = document.querySelector('#selector');
var token = 'BQD2MTOlR1chHxx0WV8sl31DBqNOLdi8FvzH9MNP2NA0UkBqrVWqVRrokuwViv5YQ-tnlVWAoGfEX8ZTwoqV8JB7Qn8ep5UqIoilgu8LqVCqDsHnj3BtHmStAwcgpEMxCf6oIYcK0-gnb0rX4Hohev4PynOMxfE'
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
			var modalHeader = document.querySelector('#modalTitle');
			artResult.innerHTML = "";
			artista.value = "";
			json.map(function (value) {
				console.log("value  " + value.id);
				artResult.innerHTML += `
				<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center">
				<a data-toggle="modal" data-target="#myModal"><img id="${value.id}" class="img-responsive center-block imag" src="${typeof(value.images[1]) != "undefined" ? value.images[1].url : '../img/not-found.png'}"/></a>
				<h3>${value.name}</h3>
				</div>
				`;
				var idImg = document.querySelector("#" + value.id);

				idImg.addEventListener('click', function (arg) {
					let xh = new XMLHttpRequest();
					xh.open('GET','https://api.spotify.com/v1/search?q=' + artista.value + '&type=' + tipo.value ,false);
					xh.setRequestHeader("Authorization",'Bearer '+ token);
					xh.onload = () => {
						
					}


				});


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
				<a data-toggle="modal" data-target="#myModal"><img class="img-responsive center-block imag" src="${typeof(value.images[1]) != "undefined" ? value.images[1].url : '../img/not-found.png'}"/></a>
				<h3>${value.name}</h3>
				</div>
				`;
			});

		}else if (tipo.value == 'track') {
			let json = JSON.parse(xhr.responseText).tracks.items;
			console.log(json);
			var artResult = document.querySelector('#artistasResult');
			artResult.innerHTML = "";
			artista.value = "";
			json.map(function (value) {
				console.log("value   " + value.images[1]);

				artResult.innerHTML += `
				<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center">
				<a data-toggle="modal" data-target="#myModal"><img class="img-responsive center-block imag" src="${typeof(value.images[1]) != "undefined" ? value.images[1].url : '../img/not-found.png'}"/></a>
				<h3>${value.name}</h3>
				</div>
				`;
			});

		}else{
			alert("Debe seleccionar una categoria de busqueda");
		}
	}
	xhr.send();
});