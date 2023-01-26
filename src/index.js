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
}
search("Tehran");

//forecast//
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col futuredays">
            <div class="day">${day}</div>
            <div class="icon"><i class="fa-solid fa-cloud-sun"></i></div>
            <div class="temp">6°/13°</div>
          </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
