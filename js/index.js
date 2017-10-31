//Obtener un nuevo token
var active = document.querySelector('#activar');
var clickEvent = false;

active.addEventListener('click', function (even) {
	even.preventDefault();
	//Variables para la api
	var client_id = '509dbc14e3454368ab55705e72429a68'; // Tu Client ID
	var redirect_uri = 'http://localhost:3000/artistas.html'; // Tu Redirect URI (Direccion URL a donde quieres que redireccione luego de iniciar Sesion Con tu cuenta de Spotify.)
	var state = generateRandomString(16);
	localStorage.setItem('spotify', state);
	var scope = 'user-read-private user-read-email';
	var url = 'https://accounts.spotify.com/authorize';
	url += '?response_type=token';
	url += '&client_id=' + encodeURIComponent(client_id);
	url += '&scope=' + encodeURIComponent(scope);
	url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
	url += '&state=' + encodeURIComponent(state);
	window.location = (url);
	//Funcion para generar codigo 
	function generateRandomString(length) {
	  var text = '';
	  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	  for (var i = 0; i < length; i++) {
	    text += possible.charAt(Math.floor(Math.random() * possible.length));
	  }
	  return text;
	};
});
//Evento del Carrusel
document.addEventListener('DOMContentLoaded', function() {
    $('#myCarousel').carousel({
		interval:   4000
	});
	$('#myCarousel').on('slid.bs.carousel',eventSlideCarousel);
	
	var carousel = document.querySelector("#myCarousel");
	carousel.addEventListener('slid',eventSlideCarousel,false);
	carousel.querySelectorAll('.nav a').forEach(function(e){
		e.addEventListener("click",function(){
			clickEvent = true;
			document.querySelectorAll('.nav.nav-pills.nav-justified li').forEach(function(el){
				el.classList.remove('active');
			})
			e.parentElement.classList.add('active');
		});
	});
});

//Funcion del carrusel

function eventSlideCarousel(){
	if(!clickEvent) {
			var count = document.querySelector('.nav.nav-pills.nav-justified').children.length -1;
			var current = document.querySelector('.nav.nav-pills.nav-justified li.active');
			current.classList.remove('active');
			if(current.nextSibling.nextElementSibling) {
				current.nextSibling.nextElementSibling.classList.add('active');
				
			}else{
				document.querySelector('.nav.nav-pills.nav-justified').firstChild.nextElementSibling.classList.add('active');	
			}
		}
		clickEvent = false;
}


