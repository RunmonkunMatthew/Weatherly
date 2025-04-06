//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const body = document.querySelector('body');
const searchInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search-btn');
const weatherCard = document.querySelector('#weather-card');
const cityName = weatherCard.querySelector('h2');
const temprature = weatherCard.querySelector('#temp');
const weatherCondition = weatherCard.querySelector('#weather-condition');
const weatherIcon = document.querySelector('#weather-icon');

function displaySavedTemp() {
  const itemsFromStorage = localStorage.getItem('condition');
  if (itemsFromStorage) {
    const res = JSON.parse(itemsFromStorage);
    const data = res[0];
    const newEl = document.createElement('div');
    newEl.classList.add('details-top');
    newEl.innerHTML = `
            <h2 id="country-name">${data.name}</h2>
            <p id="temp">${data.temp}°c</p>
            <p class="description">${data.descr}</p>
            <p id="weather-condition">
              <img src="${`http://openweathermap.org/img/w/${data.icon}.png`}" alt="Weather Icon" id="weather-icon" />
            </p>
    
    `;

    if (data.main === 'range of thunderstorm') {
      body.classList.add('thunderstorm');
    } else if (data.main === 'Clouds') {
      body.classList.add('cloudy');
    } else if (data.main === 'Clear') {
      body.classList.add('sunny');
    } else if (data.main === 'Rain') {
      body.classList.add('rainy');
    } else if (data.main === 'Drizzle') {
      body.classList.add('rainy');
    } else if (data.main === 'Snow') {
      body.classList.add('snowy');
      body.style.color = '#212121';
    }

    weatherCard.appendChild(newEl);
  }
}

async function renderUi() {
  weatherCard.innerHTML = '';

  if (searchInput.value === '') {
    showAlert('Please enter city name!', 'error');
    return;
  }

  showResults();

  saveToStorage(getForecast(searchInput.value.trim()));

  searchInput.value = '';
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

  if (data.cod === '404') {
    weatherCard.innerHTML = `<h2>City not found!</h2>`;
  }

  const div = document.createElement('div');
  div.classList.add('details-top');
  // div.setAttribute('data-aos', 'fade-up');
  div.innerHTML = `
     <h2 id="country-name">${data.name}</h2>
          <p id="temp">${data.main.temp}°c</p>
          <p class="description">${data.weather[0].description}</p>
          <p id="weather-condition">
            <img src="${`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}" alt="Weather Icon" id="weather-icon" />
          </p>
  `;

  if (data.weather[0].main === 'range of thunderstorm') {
    body.classList.add('thunderstorm');
  } else if (data.weather[0].main === 'Clouds') {
    body.classList.add('cloudy');
  } else if (data.weather[0].main === 'Clear') {
    body.classList.add('sunny');
  } else if (data.weather[0].main === 'Rain') {
    body.classList.add('rainy');
  } else if (data.weather[0].main === 'Drizzle') {
    body.classList.add('rainy');
  } else if (data.weather[0].main === 'Snow') {
    body.classList.add('snowy');
    body.style.color = '#212121';
  }

  weatherCard.appendChild(div);
}

//saveto local storage
async function saveToStorage(response) {
  const data = await response;

  localStorage.clear();

  let temprature = {
    name: data.name,
    temp: data.main.temp,
    descr: data.weather[0].description,
    icon: data.weather[0].icon,
    main: data.weather[0].main,
  };

  const itemsFromStorage = JSON.parse(localStorage.getItem('condition')) || [];

  itemsFromStorage.push(temprature);

  localStorage.setItem('condition', JSON.stringify(itemsFromStorage));
}

//showloader
function showLoader() {
  document.querySelector('.loader').classList.add('show');
}

//hideloader
function hideLoader() {
  document.querySelector('.loader').classList.remove('show');
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
  window.addEventListener('DOMContentLoaded', displaySavedTemp);
}

init();
