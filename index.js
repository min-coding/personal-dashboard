const quote = document.querySelector('.quote');
const crypto = document.querySelector('.crypto');
const time = document.querySelector('.time');
const date = new Date().toLocaleTimeString();
const sth = document.querySelector('.sth');
const weather = document.querySelector('.weather');

getBackground();
getQuote();
getPrice();
findLocation();
time.textContent = date;

async function getBackground() {
  const response = await fetch(
    'https://api.unsplash.com/photos/random?client_id=dttOfJ8-sQ7ahX9C_3TyXC6Limj0vU9urPUo_7wRiy4&query=nature&orientation=landscape'
  );
  const data = await response.json();
  const backgroundImg = data.urls.raw;
  const photographer = data.user.name;
  console.log(data.user.name);
  sth.textContent = `By ${photographer}`;
  document.body.style.backgroundImage = `url(${backgroundImg})`;
}

async function getQuote() {
  const res = await fetch('https://animechan.vercel.app/api/random');
  const data = await res.json();
  quote.textContent = `"${data.quote}" - ${data.anime}`;
}

async function getPrice() {
  const res = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin');
  const data = await res.json();
  const currentPrice = data.market_data.current_price.usd.toLocaleString();
  const highestPrice24hr = data.market_data.high_24h.usd.toLocaleString();
  const lowestPrice24hr = data.market_data.low_24h.usd.toLocaleString();
  console.log(data);

  crypto.innerHTML = `
    <img src="${data.image.thumb}" alt='BTC'>
    <span class='btc-price'> Bitcoin </span>
    <p class='btc-price'> 📍 $ ${currentPrice}</p>
    <p class='btc-high-24h'> ⬆️ $ ${highestPrice24hr}</p>
    <p class='btc-low-24h'>  ⬇️ $ ${lowestPrice24hr}</p>
  `;
}

async function getWeather(lat, long) {
  const res = await fetch(
    `https://cors-anywhere.herokuapp.com/http://api.weatherapi.com/v1/current.json?key=e582161ab21a49dd8eb32214231104&q=${lat},${long}`
  );
  const data = await res.json();
  weather.innerHTML = `
  <p> ${data.location.name}</p>
  <p> ${data.current.temp_c} °C</p>
  `;
}

function findLocation() {
  if ('geolocation' in navigator) {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(function (position) {
      // Retrieve the latitude and longitude
      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      getWeather(lat, long);
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}
