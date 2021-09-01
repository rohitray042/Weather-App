//Detect location data
let token = "e23b5f58c595afee83873aa6a2e19bee";
if (navigator.geolocation) 
{
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        currentLocation(lat, lon);
    });
} 
else 
{ 
    console.log("Geolocation is not supported by this browser.");
}

async function currentLocation(lat, lon)
{ 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}`;
    const res = await fetch(url);
    const data = await res.json();
    putData(data);
}
function putData(data)
{
    var num = data.main.temp - 273.15;
    if(Number(num) === num && num % 1 !== 0)
    {
        var num = num.toFixed(2);
    }

    icon = data.weather[0].icon;
    iconurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    document.querySelector(".city").innerText = "Weather in " + data.name;
    document.querySelector(".icon").src = iconurl;
    document.querySelector(".description").innerText = data.weather[0].main;  
    document.querySelector(".temp").innerText = num + "°C";
    document.querySelector(".humidity").innerText =  "Humidity: " + data.main.humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + data.wind.speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
}

//Searched Location Data
let weather = {
    apikey :"e23b5f58c595afee83873aa6a2e19bee",
    fetchWeather:function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        +   this.apikey
        )
        .then((response) => {
            if (!response.ok) {
              alert("No weather found.");
              throw new Error("No weather found.");
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));

    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp,humidity } = data.main;
        const { speed } = data.wind;
        
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +".png";
        document.querySelector(".description").innerText = description;  
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =  "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },

};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("");
