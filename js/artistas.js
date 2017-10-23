var formBusqueda = document.querySelector('#buscArt');
var artista = document.querySelector('#artista');

formBusqueda.addEventListener('submit', function (e) {
	e.preventDefault();
	let xhr = new XMLHttpRequest();
	xhr.open('GET','https://api.spotify.com/v1/search?q=' + artista.value + '&type=artist',false);
	xhr.setRequestHeader("Authorization",'Bearer BQBCYzS5iv5FxoEYkrQgWPelZuFff4Rh9jkZSC5ObtuiIwTi8TL9Z11dMcneBsF6LkByj6ehDLjV-LtUottp7pmkY4JPiSsr5P36kcYWYXEIVHcWCBoDVjUSqB9zmq1Z9PGRM8srAZssZy7nZIWFqpXIINiLiec')
	xhr.onload = () =>{
		let json = JSON.parse(xhr.responseText).artists.items;
		var artResult = document.querySelector('#artistasResult');
		artResult.innerHTML = "";
		artista.value = "";
		json.map(function (value) {
			artResult.innerHTML += `
			<div class="col-xs-12 col-sm-12 col-md-4 col-lg-3 text-center">
			<img class="img-responsive" src="${typeof(value.images[1]) != "undefined" ? value.images[1].url : '../img/notfound.jpg'}"/>
			<p>${value.name}</p>
			</div>
			`;
		});
	//console.log(xhr.responseText);
	}

	xhr.send();

})


