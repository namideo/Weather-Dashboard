var API = ebba861ab242756d28cc03436e29409c;

var cityEl = document.getElementById("#City"); 
var dateEl = document.querySelector('#Date');
var tempEl = document.querySelector('#Temp');
var windEl = document.querySelector('#Wind');
var humidEl = document.querySelector('#Humidity');
var uvIndexEl = document.querySelector('#UVindex');


var searchFormEl = document.querySelector('#search-form');


function getApi() {

  var requestUrl = "https://openweathermap.org/current#name";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    
}





function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('click', getApi);
