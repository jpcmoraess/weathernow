import './style.css'
import { fetchWeatherByCity } from './weather.js'

document.querySelector('#app').innerHTML = /*HTML*/ `
<main class="page">
  <section class="card">
    <header class="card-header">
      <h1>WeatherNow</h1>
      <p>Digite uma cidade e veja a temperatura agora.</p>
    </header>

    <form id="search-form" class="search" novalidate>
      <label class="sr-only" for="city-input">Cidade</label>
      <input
        id="city-input"
        type="text"
        placeholder="Ex.: Fortaleza"
        autocomplete="off"
      />
      <button id="search-button" type="submit">Buscar</button>
    </form>

    <div id="result" class="result" aria-live="polite"></div>
  </section>
</main>
`

const form = document.querySelector('#search-form')
const input = document.querySelector('#city-input')
const button = document.querySelector('#search-button')
const result = document.querySelector('#result')

const renderMessage = (text, type) => {
  const paragraph = document.createElement('p')
  paragraph.className = `message ${type}`
  paragraph.textContent = text
  result.replaceChildren(paragraph)
}

const renderWeather = (data) => {
  const temperature = Math.round(data.main.temp)
  const feelsLike = Math.round(data.main.feels_like)
  const humidity = data.main.humidity
  const windKmh = Math.round(data.wind.speed * 3.6)
  const description = data.weather[0].description

  result.innerHTML = /*HTML*/ `
    <div class="weather">
      <p class="weather-place">${data.name}, ${data.sys.country}</p>
      <p class="weather-temp">${temperature}<span>°C</span></p>
      <p class="weather-desc">${description}</p>
      <dl class="weather-details">
        <div><dt>Sensação</dt><dd>${feelsLike}°C</dd></div>
        <div><dt>Umidade</dt><dd>${humidity}%</dd></div>
        <div><dt>Vento</dt><dd>${windKmh} km/h</dd></div>
      </dl>
    </div>
  `
}

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  const city = input.value.trim()

  if (!city) {
    renderMessage('Digite o nome de uma cidade.', 'error')
    return
  }

  button.disabled = true
  button.textContent = 'Buscando...'
  renderMessage('Consultando o clima...', 'info')

  try {
    const weatherData = await fetchWeatherByCity(city)
    renderWeather(weatherData)
  } catch (error) {
    renderMessage(error.message, 'error')
  } finally {
    button.disabled = false
    button.textContent = 'Buscar'
  }
})