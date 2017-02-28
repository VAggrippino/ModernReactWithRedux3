const ROOT_URL = 'http://api.openweathermap.org/data/2.5/forecast?appid=';
const deleteKey = document.querySelector('.deleteKey input');
let appid = '';

import axios from 'axios';
export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city) {
  const url = `${ROOT_URL}${appid}&q=${city},us`;
  const request = axios.get(url);

  return {
    type: FETCH_WEATHER,
    payload: request,
  };
}

function handleKeySubmit(e) {
  e.preventDefault();
  if (!e.target.apiKeyField.value) return;
  appid = encodeURIComponent(e.target.apiKeyField.value);
  
  const now = new Date();
  const expiry = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  
  document.cookie = `OpenWeatherMapAPIKey=${appid}; expiry=${expiry}; path=/;`;
  
  document.body.classList.remove('nokey');
}
  
const cookies = document.cookie.split(';').reduce((cookies, cookie) => {
  let [key, value] = cookie.split('=');
  key = key.replace(/\s+/g, '');
  cookies[key] = value;
  return cookies;
}, {});
  
// If the OpenWeatherMapAPIKey cookie is set, store it as the appid.
// Otherwise show the key request form.
if (cookies.OpenWeatherMapAPIKey) {
  appid = cookies.OpenWeatherMapAPIKey;
} else {
  document.body.classList.add('nokey');
}

apiKeyForm.addEventListener('submit', handleKeySubmit);

deleteKey.addEventListener('click', () => {
  document.cookie = 'OpenWeatherMapAPIKey=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
  location.href = location.href;
});
