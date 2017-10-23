var formBusqueda = document.querySelector('#buscArt');
var artista = document.querySelector('#artista');

formBusqueda.addEventListener('submit', function (e) {
	e.preventDefault();
	let xhr = new XMLHttpRequest();
	xhr.open('GET','https://api.spotify.com/v1/search?q=' + artista.value + '&type=artist',false);
	xhr.setRequestHeader("Authorization",'Bearer BQDZPZxFXJLmAn8ZYRpiaqncXOqibGIbjBx2C9ZoDgTpOP58c_BPuRcoCPF3IT3gged5JrhxdQc-_4PeeZf3Lc6bVL6Ip8VT6JYjKkgeDA4bBoVIH_YtOwuJSZK85gBcaa18TqlEhpstarZElUTjZx0544xIZrE')
	xhr.onload = () =>{
		let json = JSON.parse(xhr.responseText).artists.items;
		var artResult = document.querySelector('#artistasResult');
		artResult.innerHTML = "";
		artista.value = "";
		json.map(function (value) {
			artResult.innerHTML += `
			<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 text-center">
			<img class="img-responsive center-block imag" src="${typeof(value.images[1]) != "undefined" ? value.images[1].url : '../img/not-found.png'}"/>
			<h3>${value.name}</h3>
			</div>
			`;
		});
	//console.log(xhr.responseText);
	}

	xhr.send();

})


