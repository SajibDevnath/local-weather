if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(function (position) {
		loadWeather(position.coords.latitude + ' ' + position.coords.longitude);
	});
} else {
	loadWeather("Dhaka, BD", "");
}

$(document).load ( function () {
	$('#title').fadeIn();
});

$('body').toggleClass('loaded');

$(document).ready(function() {
 
    setTimeout(function(){
        $('body').addClass('loaded');
        $('h1').css('color','#222222');
    }, 3000);
 
});



function loadWeather(location, woeid) {
	$.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function(weather) {
    	title			= weather.title;
    	city			= weather.city;
    	temp			= weather.temp ;
    	tempUnit	= '<input type="button" id="unit" value="'+ weather.units.temp + '" />' ;
    	currently	= weather.currently;
    	wcode			= '<i class="icon-' + weather.code + '"></i> ';
    	wind			= '<p>' + weather.wind.direction + ' ' +  weather.wind.speed + ' ' + weather.units.speed + '</p>';
    	humidity 	=  weather.humidity + '%';
    	image =  '<img src="' + weather.thumbnail + '" alt="" />';
      console.log(weather.wind.speed);
    	$('.title').text(title);
    	$('.location').text(city);
    	$('.temp').html('<span id="tmp">' + temp + '</span>'+ '&deg;' + ' ' + tempUnit);
    	// $('#unit').val`(tempUnit);
    	$('.climate_bg').html(wcode);
    	$('.currently').html(currently);
    	$('.image').html(image);
    	$('.windspeed').html(wind);
    	$('.humidity').text(humidity);

    	var doc = document.body

    	if (temp < 30 && temp > 10) {
    		doc.style.backgroundImage = 'url(http://i.imgur.com/vcPEMUD.jpg)';
    	} else if ( temp < 10) {
    		doc.style.backgroundImage = 'url(http://s14.postimg.org/qf7iewun5/1338506.jpg)';
    	} else if (temp > 30) {
    		doc.style.backgroundImage = 'url(http://s14.postimg.org/6jbizddlt/hot_desert_sun_1280x800.jpg)';
    	}

    function toCelsius(fahrenheit) {
      return (5/9) * (fahrenheit-32);
    }

    function toFahrenheit(Celsius) {
      return (Celsius/5)*9 + 32;
    }


    $('#unit').click( function() {
      var unit = $('#unit').val();
      var temp = $('#tmp').text();

      if (unit === 'C' ) {

        $('#unit').val("F");
        var far = Math.round(toFahrenheit(temp));
        $('#tmp').text(far);

      } else {

        $('#unit').val("C");
        var cel = Math.round(toCelsius(temp));
        $('#tmp').text(cel);

      }

    });


    },

    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}
	
