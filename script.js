var cityInputEl = document.getElementById('cityName')
var stateInputEl = document.getElementById('stateName')
var countryInputEl= document.getElementById('countryName')

//if check box delete state and add country code

var formSubmitHandler = function(event){
    event.preventDefault();

    location= cityInputEl.value.trim() + "," + stateInputEl.value.trim() + "," + countryInputEl.value.trim()

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
    console.log(apiUrl)
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            getDailyForecast(data.lat, data.lon);
            getWeeklyForecast (data.lat, data.lon)
          });
        } else {
          alert('Error: ');
        }
      })
    }
// fetch for weather forecase for long and lat input call function to display infor
function getDailyForecast(lat, lon){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=1bd37a4c5340a8132a06dfe2bcb52a94"

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            //get temp humidity and wind 
            console.log(data)
            showDailyForecast(data.main.temp, data.main.humidity, data.wind.speed);
        })
    })
}

function getWeeklyForecast(lat, lon){
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=1bd37a4c5340a8132a06dfe2bcb52a94"

    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            showWeeklyForecast(data);
        })
    })
}
// weekly forecast will require a forloop for 5 days
// function to display forecast
function showDailyForecast(temp, humidity, wind){
    if (temp=== null){
      //error message
    }
    
    for(i=0; i<5; i++){

    }
}


document.querySelector('button').addEventListener("click", formSubmitHandler);
