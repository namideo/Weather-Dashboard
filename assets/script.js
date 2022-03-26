var API = "f922750de4e54e4676741fdc33c0b0bf";
var dashboardAPI = "ebba861ab242756d28cc03436e29409c";
var fiveDayAPI = "6811ee5add5bf6a1040cd4d6a30282df";
var oneCallAPI = "d745b0bdb8799350c4ebe12112c1aa52";

var searchFormEl = $('#search-form');

var currentCityEl = $('#currentCity');
var city = $('#City');
var iconEl = $('#wicon');
var dateEl = $('#Date');
var tempEl = $('#Temp');
var windEl = $('#Wind');
var humidEl = $('#Humidity');
var uvIndexEl = $('#UVindex');


$('#searchBtn').on("click", function(e) {
  e.preventDefault();
  e.stopPropagation();
  // alert("click")
  const searchedFor = $("#search-input").val()
    let newDiv = $("<div>" + searchedFor + "</div>")
    
    // create a new event handler

    $("#searchResults").append(newDiv)  


  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedFor + "&appid=" + API + "&units=imperial";


  fetch(queryURL)
    .then(function (response) {
        return response.json()
    })
    .then (function (data) {
    //   return response.json();
      console.log(data);
      currentCity(data);
    // .catch(error => {
    //   console.log(error);
    // }) 


  
  })

  let time = moment().format('L');


  function currentCity(data) {

    var icon = data.weather[0].icon;
    var iconurl = "https://openweathermap.org/img/w/" + icon + ".png";

        $(city).text(data.name);
        $(dateEl).text(time);
        $(iconEl).attr('src', iconurl);
        $(tempEl).text(data.main.temp + " F");
        $(windEl).text(data.wind.speed + " MPH");
        $(humidEl).text(data.main.humidity + "%");

    let lat = data.coord.lat;
    let lon = data.coord.lon;

    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=" + oneCallAPI + "&units=imperial";

    fetch(queryURL)
    .then(function (response) {
        return response.json()
    })
    .then (function (data) {
        console.log(data);
        uvIndex(data);
    })

  function uvIndex(data) {
    var uvIndex = $(uvIndexEl).text(data.current.uvi);
    var uvi = data.current.uvi;

    if (uvi < 3) {
      uvIndex.addClass("low");
    } else if (uvi > 2 && uvi < 6) {
      uvIndex.addClass("moderate");
    } else if (uvi > 5 && uvi < 8) {
      uvIndex.addClass("high");
    } else if (uvi > 7 && uvi < 11) {
      uvIndex.addClass("very_high");
    } else if (uvi > 10) {
      uvIndex.addClass("extreme");
    }
  

    
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + fiveDayAPI + "&units=imperial";

    fetch(queryURL)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
      console.log(data);
      fiveDayForecast(data);
    
    function fiveDayForecast(data) {
      
      $('#5DayForecast').html('');

    for (let i = 0; i < 5; i++) {
      let date = data.list[i*8].dt_txt;
      let fivedayicon = data.list[i*8].weather[0].icon;
      let iconlink = "https://openweathermap.org/img/w/" + fivedayicon + ".png";
      let temp = data.list[i*8].main.temp;
      let wind = data.list[i*8].wind.speed;
      let humid = data.list[i*8].main.humidity;

      const fiveDay = 

      `<div class="weather-card card">
        <ul class="list-unstyled">
          <li>${date}</li>
          <li class="weather-icon"><img src="${iconlink}"></li>
          <li>Temp: ${temp} &#8457</li>
          <li>Wind: ${wind} MPH</li>
          <li>Humidity: ${humid} %</li>
        </ul>
      </div>
      `;

      $('#5DayForecast').append(fiveDay);
    
    }
    };
    })
  }
}
});
