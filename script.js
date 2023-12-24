var cityInputEl = document.getElementById('cityName')
// var stateInputEl = document.getElementById('stateName')
// var countryInputEl= document.getElementById('countryName')
var apiKey = "1bd37a4c5340a8132a06dfe2bcb52a94"

var formSubmitHandler = function(event){
    event.preventDefault();
    console.log('form submit')
    var location= cityInputEl.value.trim()
    // cityInputEl.value.trim() + "," + stateInputEl.value.trim() + "," + countryInputEl.value.trim()

    if(location){
        // start fetch for cityname.lon and cityname.lat
        // add city to local storage
        getLongLat(location);
    }
    else {
        //error message
    }
}
// function to display city names from local storage 
//fetch for city long and lat 


function getLongLat(name){
    // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=1bd37a4c5340a8132a06dfe2bcb52a94"
    var apiUrl= "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=" + apiKey
    console.log(apiUrl)
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            getDailyForecast(data.coord.lat, data.coord.lon);
            getWeeklyForecast (data.coord.lat, data.coord.lon)
          });
        } else {
          alert('Error: ');
        }
      })
    }
// fetch for weather forecase for long and lat input call function to display infor
function getDailyForecast(lat, lon){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=1bd37a4c5340a8132a06dfe2bcb52a94"
    console.log(apiUrl)
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            //get temp humidity and wind 
            console.log(data)
            if (!data){
                //error
                console.log('error')
               
            } else{
             showDailyForecast(data.main.temp, data.main.humidity, data.wind.speed);
            }
            
        })
    })
}

function getWeeklyForecast(lat, lon){
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=1bd37a4c5340a8132a06dfe2bcb52a94"
    console.log(apiUrl)
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            if (!data){
                console.log('error')
            }else{
            showWeeklyForecast(data.list);  
            }
            
            console.log(data.list)
        })
    })
}
// weekly forecast will require a forloop for 5 days
// function to display forecast
function showDailyForecast(temp, humidity, wind){
    // console.log(temp, humidity, wind)
    
    document.getElementById('showDaily').innerHTML=' ';
    var display = document.createElement('div');
    display.classList.add('dayForecast');
    display.innerHTML=`<h1>Today's Forecast: <h1> <br> <h2>Temperature:${temp} <br> Humidity: ${humidity} <br>  Wind: ${wind}</h2>`;
    document.getElementById('showDaily').appendChild(display)
}

function showWeeklyForecast(list){
    var weeklyContainer = document.getElementById('showWeekly');
    weeklyContainer.innerHTML = " "
    console.log(list[0].main.temp, list[0].dt_txt, list[0].wind.speed, list[0].main.humidity)
    for (let i=8; i<70; i+= 8){
        var div = document.createElement('div')
        var article = document.createElement('article');
        article.classList.add('weekForecast');
        var date = list[i].dt_txt;
        var slice = date.slice(0, 10)

        article.innerHTML = 
        `<h2> ${slice} <br>
        Temp: ${list[i].main.temp} <br>
        Wind: ${list[i].wind.speed} <br>
        Humidity: ${list[i].main.humidity} <br>`
        
        weeklyContainer.appendChild(div);
        div.appendChild(article)
    }
}

// //if check box delete state and add country code
// document.querySelector('#foreign').addEventListener('click', function(){
//     stateInputEl.remove();
// })
document.querySelector('#location').addEventListener("submit", formSubmitHandler);
