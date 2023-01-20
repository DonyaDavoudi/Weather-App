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
function showCity(event) {
  event.preventDefault();
  let input = document.querySelector("input.searchbar");
  city.innerHTML = input.value;
  let value = input.value;
  getData(value);
}
let city = document.querySelector("span#maincityname");
let form = document.querySelector("form");
form.addEventListener("submit", showCity);

function getData(value) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}&q=${value}&units=metric&appid=${apiKey}`)
    .then(showCityData);
}

function showCityData(response) {
  let temp = document.querySelector("span#maincitytempnum");
  let desc = document.querySelector("span#description");
  let humidity = document.querySelector("span#humidity");
  let wind = document.querySelector("span#wind");
  let dateElement = document.querySelector("div#date");
  temp.innerHTML = Math.round(response.data.main.temp);
  desc.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
