//Accesses the API for to obtain the weekly 5 day forecast
function getWeeklyForecast(coordinates) {
  let apiKey = "750434103a834cc2e7cdf102e6bafd91";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

//Displays the current weather conditions of the searched city
function updateWeather(response) {
  console.log(response);
  //updating current conditions
  let conditions = response.data.weather[0].description;
  let updatedConditions = document.querySelector("#currentcondition");
  updatedConditions.innerHTML = conditions;

  //updating weather icon
  let icon = document.querySelector("#currentIcon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  //updating temperature
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#tempNow");
  currentTemperature.innerHTML = temperature;

  //updating feels like temp
  let feelsLikeTemp = Math.round(response.data.main.feels_like);
  let updatedFeelsLikeTemp = document.querySelector("#feels-like-temp");
  updatedFeelsLikeTemp.innerHTML = feelsLikeTemp;

  //updating humidity
  let humidity = Math.round(response.data.main.humidity);
  let updatedHumidity = document.querySelector("#current-humidity");
  updatedHumidity.innerHTML = ` ${humidity}%`;

  //updating wind speed
  let windSpeed = Math.round(response.data.wind.speed);
  let updatedWindSpeed = document.querySelector("#current-wind-speed");
  updatedWindSpeed.innerHTML = ` ${windSpeed} mph`;

  fahrenheitTemp = Math.round(response.data.main.temp);
  feelsLike = Math.round(response.data.main.feels_like);

  getWeeklyForecast(response.data.coord);
}

//Displays the current date and time
function updateDateTime(response) {
  //updating current date
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayOfWeek = document.querySelector("#now-date-time");
  dayOfWeek.innerHTML = `${days[now.getDay()]},`;

  //updating current time
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = `Current time: ${hours}:${minutes}`;

  //updating current month
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentMonth = document.querySelector("#current-month");
  currentMonth.innerHTML = `${months[now.getMonth()]}`;

  //updating current date
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = `${now.getDate()},`;

  //updating current year
  let currentYear = document.querySelector("#current-year");
  currentYear.innerHTML = now.getFullYear();
}

//Obtaining the days for the weekly 5 day forecast
function displayDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Display the weekly 5 days forecast and updating HTML
function displayForecast(response) {
  let weeklyForecast = response.data.daily;

  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  weeklyForecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-2 day">
            <span class="weekday"><strong>${displayDay(
              forecastDay.dt
            )}</strong></span>
            <img src= "http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="Weekly Weather Icon" class="icon" width=60px">
            <span class="weektemp"><strong id="max-temp">${Math.round(
              forecastDay.temp.max
            )}˚F</strong>|<span id="min-temp">${Math.round(
          forecastDay.temp.min
        )}˚F</span></span>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

//Display updated city name when searching for a city
function searchCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#floatingInput");
  let updatedCity = document.querySelector("#currentcity");
  updatedCity.innerHTML = inputCity.value;
  let apiKey = "750434103a834cc2e7cdf102e6bafd91";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeather);

  updateDateTime();
}

let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", searchCity);

//Displays inital city upon opening app
function initialCity() {
  let updatedCity = document.querySelector("#currentcity");
  updatedCity.innerHTML = "San Francisco";
  let apiKey = "750434103a834cc2e7cdf102e6bafd91";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=San Francisco&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeather);

  updateDateTime();
}
initialCity();
