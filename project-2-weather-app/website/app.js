/* Global Project Variables */
const appid = '8933de6286e3a8c9568b2d6f248b2c2c'
const baseURL = 'api.openweathermap.org/data/2.5/weather?'
const zpInput = document.getElementById('zip');
const userInput = document.getElementById('feelings')
const dateHolder = document.getElementById('date')
const tempHolder = document.getElementById('temp')
const contentHolder = document.getElementById('content')
const postURL = 'http://localhost:8000'
const getURL = 'http://localhost:8000/all'

// Dynamically create a new JS date instance
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Call function to fetch via OpenWeatherMap
const getWeather = async (baseURL, zip = '94712,us', api) => {
  const url = `http://${baseURL}zip=${zip},us&units=metric&appid=${api}`
  const response = await fetch(url)
  let jsonResponse = await response.json()
  return jsonResponse
}

// User-input post data function
const postData = async (path, data = {}) => {
  const response = await fetch(path, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
}

// Update UI function 
const updateUI = async () => {
  const res = await fetch(getURL)
  const jsonResponse = await res.json()
  dateHolder.innerHTML = `<span class="entry-item">Date: </span>${jsonResponse.date}`
  contentHolder.innerHTML = `<span class="entry-item">You feel: </span>${jsonResponse.userResponse}`
  tempHolder.innerHTML = `<span class="entry-item">Temperature: </span>${jsonResponse.temperature}`
}

// Event handler handleClick
const handleClick = async () => {
  const weatherData = await getWeather(baseURL, zpInput.value, appid)
  const data = {
    temperature: weatherData.main.temp,
    date: newDate,
    userresponse: userInput.value
  }
  await postData(postURL, data)
  updateUI()
}

// Add element event listener with 'generate' id
const el = document.getElementById('generate')
el.addEventListener('click', handleClick)
