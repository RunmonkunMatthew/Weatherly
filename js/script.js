//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//Api Key =

const body = document.querySelector('body');
const searchInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search-btn');
const weatherCard = document.querySelector('#weather-card');
const cityName = weatherCard.querySelector('h2');
const temprature = weatherCard.querySelector('#temp');
const weatherCondition = weatherCard.querySelector('#weather-condition');
const weatherIcon = document.querySelector('#weather-icon');

async function renderUi() {
  if (searchInput.value === '') {
    showAlert('Please enter city name!', 'error');
    return;
  }

  showResults();
}

//getForecast
async function getForecast(country) {
  const Api_key = 'f3f438e3b213c782fc3201bd63360f9d';

  showLoader();

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${Api_key}`
  );

  const data = await res.json();

  hideLoader();

  return data;
}

async function showResults() {
  const data = await getForecast(searchInput.value.trim());
  console.log(data);

  const div = document.createElement('div');
  div.classList.add('details-top');
  div.innerHTML = `
     <h2 id="country-name">${data.name}</h2>
          <p id="temp">${data.main.temp}°c</p>
          <p class="description">${data.weather.description}</p>
          <p id="weather-condition">
            <img src="" alt="Weather Icon" id="weather-icon" />
          </p>
  `;
  weatherCard.appendChild(div);

  // if(data.weather.main === '') {
  //   body.classList.add()
  // }
}

//showloader
function showLoader() {
  document.querySelector('#loader').classList.add('show');
}

//hideloader
function hideLoader() {
  document.querySelector('#loader').classList.remove('show');
}

//Alert
function showAlert(message, className) {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.classList.remove('hide');
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('.alert').appendChild(alertEl);

  setTimeout(() => {
    alertEl.remove();
  }, 1500);
}

function init() {
  //Event listeners
  searchBtn.addEventListener('click', renderUi);
}

init();
