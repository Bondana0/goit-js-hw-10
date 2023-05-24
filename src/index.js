import Notiflix from 'notiflix';
import debounce from 'lodash.debounce'; 
import './css/styles.css';
import API  from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;
// API.fetchCountries('ukraine').then(result => console.log(result));
const refs = { 
    inputEl : document.getElementById('country-box'),
    ulEl: document. querySelector('.country-roster'),
    divEl: document.querySelector('.country-info'),
}
document.body.style.background = 'rgba(260,60,0, 0.2)';


refs.inputEl.addEventListener('input', debounce(onSubmit, DEBOUNCE_DELAY));
function onSubmit() {
  const inputEvent = refs.inputEl.value.trim();

  if (inputEvent === '') {
    fineInter();
    return;
  }
  API.fetchCountries(inputEvent).then(data => {
    if (data.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );}
      countryResult(data);
  }).catch(err => {
    fineInter();
    Notiflix.Notify.failure('Oops, there is no country with that name');
  });
}

function countryInfo(countries) {
  return countries.reduce((acc, { name: { official }, capital, population, flags, languages }) => {
    languages = Object.values(languages).join(', ');
    return (acc + `
      <img src="${flags.svg}" width="50" alt="name"/>
      <h1>${official}</h1>
      <h2>Capital: ${capital}</h2>
      <p>Population: ${population}</p>
      <p>Languages: ${languages}</p>
    `);
  }, '');
}

function countryRoster(country){
  return country.reduce((acc, { name: { official }, flags }) => {
    return (acc + `
      <li class="image"><img src="${flags.svg}" width="50" alt="name"/>
      <p class="title">${official}</p></li>
    `);
  }, '');
}

function countryResult(result){
  if (result.length === 1) {
    fineInter()
    refs.ulEl.style.visibility = 'hidden';
    refs.divEl.style.visibility = 'visible';
    refs.divEl.innerHTML = countryInfo(result);
  }
  if (result.length >= 2 && result.length <= 10) {
    fineInter()
    refs.divEl.style.visibility = 'hidden';
    refs.ulEl.style.visibility = 'visible';
    refs.ulEl.innerHTML = countryRoster(result);
  }
}
function fineInter() {
  refs.ulEl.innerHTML = '';
  refs.divEl.innerHTML = '';
}

