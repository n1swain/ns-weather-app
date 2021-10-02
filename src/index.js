function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#day-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//week 5
function displayWeatherCondition(response) {
  //name
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  //temperature
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  //humidity
  let humidity = document.querySelector("#humidity-percentage");
  humidity.innerHTML = response.data.main.humidity;
  //wind
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  //weather condition
  let weatherCondition = document.querySelector("#weather-condition");
  weatherCondition.innerHTML = response.data.weather[0].main;
}

function findCityInfo(city) {
  let apiKey = "103359604fb606c94ffec4337a6179f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function cityInputData(event) {
  event.preventDefault();
  let city = document.querySelector("#location").value;
  findCityInfo(city);
}
function searchLocation(position) {
  var apiKey = "103359604fb606c94ffec4337a6179f3";
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat="
    .concat(position.coords.latitude, "&lon=")
    .concat(position.coords.longitude, "&appid=")
    .concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-box");
form.addEventListener("submit", cityInputData);

var currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);
