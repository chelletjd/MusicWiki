var active = document.querySelector('#activar');


active.addEventListener('click', function (even) {
	even.preventDefault();

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

	function generateRandomString(length) {
	  var text = '';
	  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	  for (var i = 0; i < length; i++) {
	    text += possible.charAt(Math.floor(Math.random() * possible.length));
	  }
	  return text;
	};
});

$(document).ready( function() {
    $('#myCarousel').carousel({
		interval:   4000
	});
	
	var clickEvent = false;
	$('#myCarousel').on('click', '.nav a', function() {
			clickEvent = true;
			$('.nav li').removeClass('active');
			$(this).parent().addClass('active');		
	}).on('slid.bs.carousel', function(e) {
		if(!clickEvent) {
			var count = $('.nav').children().length -1;
			var current = $('.nav li.active');
			current.removeClass('active').next().addClass('active');
			var id = parseInt(current.data('slide-to'));
			if(count == id) {
				$('.nav li').first().addClass('active');	
			}
		}
		clickEvent = false;
	});
});