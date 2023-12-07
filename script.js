var cityInputEl = document.getElementById('cityName')
var stateInputEl = document.getElementById('stateName')

//if check box delete state and add country code

var formSubmitHandler = function(event){
    event.preventDefault();

    location= cityInputEl.value.trim() + "," + stateInputEl

    if(location){
        // start fetch for cityname.lon and cityname.lat
        // add city to local storage
        getLongLat(cityName);
    }
    else {
        //error message
    }
}
// function to display city names from local storage 
//fetch for city long and lat 
function getLongLat(name){
    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + name + "&limit={limit}&appid=1bd37a4c5340a8132a06dfe2bcb52a94"

    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            lat = response.lat
            lon = response.lon
            getDailyForecast(data);
            getWeeklyForecast (data)
          });
        } else {
          alert('Error: ');
        }
      })
    }
// fetch for weather forecase for long and lat input call function to display infor
function getDailyForecast(town){
    var apiUrl = 
}

function getWeeklyForecast(town){

}

// function to display forecast


document.querySelector('button').addEventListener("click", formSubmitHandler());
