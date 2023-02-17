//Date and Time//
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//search engine//
let cityElement = document.querySelector("span#maincityname");
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}&q=${city}&units=metric&appid=${apiKey}`)
    .then(showCityData);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("input.searchbar");
  cityElement.innerHTML = cityInputElement.value;
  search(cityInputElement.value);
}

function showCityData(response) {
  let temp = document.querySelector("span#maincitytempnum");
  let desc = document.querySelector("span#description");
  let humidity = document.querySelector("span#humidity");
  let wind = document.querySelector("span#wind");
  let dateElement = document.querySelector("span#date");
  let mainIconElement = document.querySelector("img#mainicon");
  temp.innerHTML = Math.round(response.data.main.temp);
  desc.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  mainIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  mainIconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
search("Tehran");

//forecast//
function getForecast(coordinates) {
  console.log(coordinates);
  apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row d-flex">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` <div class="col futuredays">
            <div class="day">${formatDay(forecastDay.dt)}</div>
            <div class="icon"><img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" width="60"/></div>
            <div class="temp"><span>${Math.round(
              forecastDay.temp.min
            )}</span>°/<span>${Math.round(forecastDay.temp.max)}</span>°</div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
