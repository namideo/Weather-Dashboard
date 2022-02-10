var API = ebba861ab242756d28cc03436e29409c;

var searchFormEl = $('#search-form');
var city = $("#City"); 
var date = $('#Date');
var temp = $('#Temp');
var wind = $('#Wind');
var humid = $('#Humidity');
var uvIndex = $('#UVindex');


var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API;


  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    



