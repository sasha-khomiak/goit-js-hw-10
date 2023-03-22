//-------ПІДКЛЮЧЕННЯ-------//
// бібліотека виведення вспливаючих повідомлень
import Notiflix from 'notiflix';
// таблиця стилів
import './css/styles.css';
// імпорт функції запиту країни з API Rest Countries v2
import fetchCountries from './fetchCountries';
// бібліотека debounce затримка виконання коду
import debounce from 'lodash.debounce';
// затримка 300 мс
const DEBOUNCE_DELAY = 300;

//-------ЕЛЕМЕНИТ ІНПУТА-------//
const searchBoxInput = document.querySelector('#search-box');
const countryCard = document.querySelector('.country-info');
const listOfCountries = document.querySelector('.country-list');

//-------СЛУХАЧ ВВЕДЕНОГО ТЕКСТУ НА ПОДІЮ ІНПУТ-------//
// обробник викликається завдяки debounce через 300 мс
searchBoxInput.addEventListener(
  'input',
  debounce(onInputCountry, DEBOUNCE_DELAY)
);

//-------ФУНКЦІЯ ОБРОБНИК ОТРИМАНОГО ЗНАЧЕННЯ З ІНПУТ-------//
function onInputCountry(event) {
  // введений текст в інпут трімимо (відкидаємо пробіли)
  let inputText = event.target.value.trim();

  // якщо запит порожній рядок, то виходимо
  if (inputText === '') {
    return;
  }

  // вибираємо масив об"єктів країн які підходять критерію пошуку
  fetchCountries(inputText).then(countries => {
    // очищаємо поле переліку країн і картки окремої країни
    hideCountryInfo();
    hideCountryList();

    //Якщо збігів не виявлено ?????????????
    if (countries.length === 0) {
      showErrorMessage();
    }

    //якщо країна одна показуємо про неї дані
    if (countries.length === 1) {
      showCountryInfo(countries[0]);
    }

    //якщо країн від 2 до 10, то виводимо їх список
    if (countries.length <= 10 && countries.length > 1) {
      showCountryList(countries);
    }

    //якщо країн більше 10 - виводимо повідомлення звузити пошук
    if (countries.length > 10) {
      showInformMessage();
    }
  });
}

//-------ФУНКЦІЯ ВИВОДУ ПОВІДОМЛЕННЯ, ЩО ЗАБАГАТО КРАЇН -------//
function showInformMessage() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.',
    {
      timeout: 700,
    }
  );
}

//-------ФУНКЦІЯ ВИВОДУ ПОВІДОМЛЕННЯ, ЩО НЕМАЄ КРАЇН ЗІ ЗБІГОМ -------//
function showErrorMessage() {
  Notiflix.Notify.failure('Oops, there is no country with that name', {
    timeout: 700,
  });
}

//-------ФУНКЦІЯ ВИВОДУ ПЕРЕЛІКУ КРАЇН ДЛЯ КОРИСТУВАЧА -------//
function showCountryList(countries) {
  console.log(countries);

  // формуємо верстку
  let message = countries
    .map(country => {
      return `<li class="list">
    <div class="country-card-all country-card">
    <img class="country-flag" src="${country.flags.svg}" 
        alt="${country.name.official} flag"> 
        <p2>${country.name.official}</p2>
        </div>
        </li>`;
    })
    .join('');

  // вставляємо верстку в макет
  listOfCountries.innerHTML = message;
}

//-------ФУНКЦІЯ ВИВОДУ ДАНИХ ПРО ОДНУ КРАЇНУ ДЛЯ КОРИСТУВАЧА-------//
function showCountryInfo(country) {
  console.log(country);

  // витягаємо з обʼєкту значення офіційних мов країни
  let languages = Object.values(country.languages);

  // формуємо верстку
  let countryInfo = `<div class="country-card-all">
      <div class="country-card">
        <img class="country-flag" src="${country.flags.svg}" 
        alt="${country.name.official} flag">
        <h2 class="country-official-name">${country.name.official}</h2>
      </div>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Population:</strong> ${country.population}</p>
      <p><strong>Languages:</strong> ${languages}</p>
    </div>`;

  // вставляємо верстку в макет
  countryCard.innerHTML = countryInfo;
}

//-------ФУНКЦІЯ ОЧИЩЕННЯ ПЕРЕЛІКУ КРАЇН ДЛЯ КОРИСТУВАЧА-------//
function hideCountryList() {
  listOfCountries.innerHTML = '';
}

//-------ФУНКЦІЯ ОЧИЩЕННЯ ДАНИХ ПРО ОДНУ КРАЇНУ ДЛЯ КОРИСТУВАЧА-------//
function hideCountryInfo() {
  countryCard.innerHTML = '';
}
