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
   ${hour}:${minutes} <div>(current location) </div>`;
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
  celsiusTemp = response.data.main.temp;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemp);
  document.querySelector("#current-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#current-humidity"
  ).innerHTML = `humidity: ${response.data.main.humidity}%`;
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon-main")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon-main")
    .setAttribute("alt", response.data.weather[0].description);

  displayForecast();
}

function changeTempToFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemp);
}
function changeTempToCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  currentTemperature.innerHTML = Math.round(celsiusTemp);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday"];
  let forcastHTML = `<div class="row"><div class="col-12"><div class="card-group">`;
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `  
                <div class="card bg-transparent">
                  <div class="card-body">
                    <h5 class="card-title">
                      ${day},
                      <div>15 June</div>
                    </h5>
                    <p class="card-text tempertemperatureture-bottom">
                      <strong>29℃</strong> | 20℃
                      <br />
                      sunny
                      <br />
                      <br />
                      <i class="fa-solid fa-sun sun-icon-bottom"></i>
                    </p>
                  </div>
                </div>`;
  });

  forcastHTML = forcastHTML + `</div> </div> </div></div>`;
  forecastElement.innerHTML = forcastHTML;
}

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = formatDate(new Date());

let celsiusTemp = null;

let searchForm = document.querySelector("#search-form");
let chosenCity = searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-temp");
fahrenheitLink.addEventListener("click", changeTempToFahrenheit);

let celsiusLink = document.querySelector("#celsius-temp");
celsiusLink.addEventListener("click", changeTempToCelsius);

let buttonBackToCurrent = document.querySelector("#back-to-current");
let currentLocation = buttonBackToCurrent.addEventListener(
  "click",
  retriveLocation
);

searchCity("tel aviv");
