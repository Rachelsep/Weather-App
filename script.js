//Search Engine Begins
//Linking API & Getting City Temperature

function updateWeather(response) {
  //updating temperature
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#tempNow");
  currentTemperature.innerHTML = temperature;

  //updated humidity
  let humidity = Math.round(response.data.main.humidity);
  let updatedHumidity = document.querySelector("#current-humidity");
  updatedHumidity.innerHTML = ` ${humidity}%`;

  //updating wind speed
  let windSpeed = Math.round(response.data.main.wind.speed);
  let updatedWindSpeed = document.querySelector("#current-wind-speed");
  updatedWindSpeed.innerHTML = ` ${windSpeed} mph`;
}

//Display updated city name when searching for a city
function clickSearch(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#floatingInput");
  let updatedCity = document.querySelector(".currentcity");
  updatedCity.innerHTML = inputCity.value;
  let apiKey = "750434103a834cc2e7cdf102e6bafd91";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeather);
}
let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", clickSearch);

//Injecting current day of the week
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

//Injecting current time
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${now.getHours()}:${now.getMinutes()}`;

//Injecting current month
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

//Injecting current date
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${now.getDate()},`;
//Injecting current year
let currentYear = document.querySelector("#current-year");
currentYear.innerHTML = now.getFullYear();
