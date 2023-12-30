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
        localStore(location);
    }
    else {
        document.getElementById('showDaily').innerHTML=' ';
        var display = document.createElement('div');
        display.classList.add('dayForecast');
        display.innerHTML= "<h1> Please Enter A City Name </h1>"
    }
}
// function to display city names from local storage 

function localStore(city){
    
    localStorage.setItem("city", JSON.stringify(city));
    let cityname = localStorage.getItem("city")
    if (cityname){
        cityname = JSON.parse(cityName)
    } else {
        cityname = [];
    }
    
    let newCity = city;
    cityname.push(newCity);
    window.localStorage.setItem("city", JSON.stringify(cityname));
    
    displayLocalStore();
}

function displayLocalStore(){
    var displayCell = document.getElementById('showLocalStore');

    var citydisplay = document.createElement('div')
    citydisplay.className.add('localStore')

    var city = localStorage.getItem("city")
    citydisplay.innerHTML=`<p> ${city} </p>`

    displayCell.appendChild(citydisplay)
}; 
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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=1bd37a4c5340a8132a06dfe2bcb52a94"
    console.log(apiUrl)
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            //get temp humidity and wind 
            console.log(data)
            if (!data){
                
                console.log('error')
               
            } else{
             showDailyForecast(data.main.temp, data.main.humidity, data.wind.speed, data.weather[0].main);
            }
            
        })
    })
}

function getWeeklyForecast(lat, lon){
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=1bd37a4c5340a8132a06dfe2bcb52a94"
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

// function to display forecast
function showDailyForecast(temp, humidity, wind, desc){
    // console.log(temp, humidity, wind)
    
    document.getElementById('showDaily').innerHTML=' ';
    var display = document.createElement('div');
    display.classList.add('dayForecast');
    display.innerHTML=`
    <h1>Today's Forecast: </h1> <br> 
    <h3> ${desc} </h3> <br> 
    <h2>Temperature: ${temp}°F <br> 
    Humidity: ${humidity}% <br>  
    Wind: ${wind}mph </h2>`;

    document.getElementById('showDaily').appendChild(display)
}

function showWeeklyForecast(list){
    var weeklyContainer = document.getElementById('showWeekly');
    weeklyContainer.innerHTML = " "
    // console.log(list[0].main.temp, list[0].dt_txt, list[0].wind.speed, list[0].main.humidity, list[3].weather[0].main)
    for (let i=8; i<70; i+= 8){
        var div = document.createElement('div')
        var article = document.createElement('article');
        article.classList.add('weekForecast');
       
        var date = list[i].dt_txt;
        var slice = date.slice(0, 10)

        article.innerHTML = 
        `<h1> ${slice} </h1> <br>
        <h3> ${list[i].weather[0].main} </h3> <br>
        <h2> Temp:  ${list[i].main.temp}°F <br>
        Wind:  ${list[i].wind.speed}mph <br>
        Humidity:  ${list[i].main.humidity}% <br> </h2>`
        
        weeklyContainer.appendChild(div);
        div.appendChild(article)
    }
}


document.querySelector('#location').addEventListener("submit", formSubmitHandler);
