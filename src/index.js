function formatDate(currentDay) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wedensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDay.getDay()];
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
  let month = months[currentDay.getMonth()];
  let date = currentDay.getDate();
  let fullYear = currentDay.getFullYear();
  let hour = currentDay.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentDay.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${date} ${month} ${fullYear},
   ${hour}:${minutes}`;
}
function retriveLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLatLon);
}
function getLatLon(position) {
  let apiKey = "3550819127d6d02a73908aef66beef82";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateData);
}
function searchCity(city) {
  let apiKey = "3550819127d6d02a73908aef66beef82";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateData);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  searchCity(city);
}
function updateData(response) {
  document.querySelector(
    "#chosen-city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#current-humidity"
  ).innerHTML = `humidity:${response.data.main.humidity}%`;
}

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = formatDate(new Date());

let searchForm = document.querySelector("#search-form");
let chosenCity = searchForm.addEventListener("submit", handleSubmit);

let buttonBackToCurrent = document.querySelector("#back-to-current");
let currentLocation = buttonBackToCurrent.addEventListener(
  "click",
  retriveLocation
);

searchCity("tel aviv");

//function changeTempToFahrenheit(event) {
//event.preventDefault();
//let currentTemperature = document.querySelector("#current-temperature");
//currentTemperature.innerHTML = 82;
//}

//function changeTempToCelsius(event) {
//event.preventDefault();
// let currentTemperature = document.querySelector("#current-temperature");
// currentTemperature.innerHTML = 28;
//}

//let fahrenheitTemp = document.querySelector("#fahrenheit-temp");
//fahrenheitTemp.addEventListener("click", changeTempToFahrenheit);

//let celsiusTemp = document.querySelector("#celsius-temp");
//celsiusTemp.addEventListener("click", changeTempToCelsius);
