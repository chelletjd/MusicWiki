var formBusqueda = document.querySelector('#buscArt');
var artista = document.querySelector('#artista');
var tipo = document.querySelector('#selector');
var artName;
var token = 'BQAqTEOybuleL00ghJqSFZPP38GzF7lCno4qUcCQ2baOtJ5D_r4kk-jr3wNFZqCnXpBqakB37gVU4htAyWw5MBiX2pnfOFOG633CCJX6hGrXVKcYSRjCu2eWzNvyU9woTeO9xilNf0xsLK-yzYvCfMTfyqddhuk'
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
				<a data-toggle="modal" data-target="#myModal"><img id="${value.id}" class="img-responsive center-block imag" src="${typeof(value.images[1]) != "undefined" ? value.images[1].url : '../img/not-found.png'}"/></a>
				<h3>${value.name}</h3>
				</div>
				`;

				artName = value.name;


				setTimeout(function(){
					document.getElementById(value.id).parentElement.addEventListener('click', function (arg) {
						let xh = new XMLHttpRequest();
						xh.open('GET',`https://api.spotify.com/v1/artists/${arg.target.id}/albums` ,true);
						xh.setRequestHeader("Authorization",'Bearer '+ token);
						xh.onload = () => {
							let jso = JSON.parse(xh.responseText).items;
							console.log(jso);
							var modalHeader = document.querySelector('#modalTitle');

							modalHeader.innerHTML = artName;
							// jso.map(function (ar) {
							// 	if (ar.album_type = 'album') {
							// 		modalHeader.innerHTML = ar.artists[0].name;
							// 	}
								

							// });
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