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
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let time = hours + ":" + minutes;
let date = document.querySelector("div#date");
date.innerHTML = day + " " + time;

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
  temp.innerHTML = Math.round(response.data.main.temp);
  console.log(response);
}
