//-------ПІДКЛЮЧЕННЯ-------//
// бібліотека виведення повідомлень
import Notiflix from 'notiflix';
// таблиця стилів
import './css/styles.css';
// імпорт запиту країни
import fetchCountries from './fetchCountries';

// import countryCard from './templates/country-card.hbs';

//-------\-------//

const DEBOUNCE_DELAY = 300;

//-------ЕЛЕМЕНИТ ІНПУТА-------//
const searchBoxInput = document.querySelector('#search-box');
const countryCard = document.querySelector('.country-info');

//-------СЛУХАЧ ВВЕДЕНОГО ТЕКСТУ-------//
searchBoxInput.addEventListener('input', onInputCountry);

//-------ФУНКЦІЯ ОБРОБНИК -------//
function onInputCountry(event) {
  // введений текст в інпут
  let inputText = event.currentTarget.value;

  // вибираємо масив об"єктів країн які підходять критерію пошуку
  fetchCountries(inputText).then(countries => {
    // console.log(countries);

    //якщо країн більше 10 - виводимо повідомлення
    if (countries.length > 10) {
      showInformMessage();
    }

    //якщо країн 10 s менше - виводимо їх список
    if (countries.length <= 10 && countries.length > 1) {
      showCountryList(countries);
    }

    //якщо країна одна показуємо про неї дані
    if (countries.length === 1) {
      showCountryInfo(countries[0]);
    }

    //Якщо збігів не виявлено
    if (countries.length === 0) {
      showErrorMessage();
    }
  });
}

//-------ФУНКЦІЯ ВИВОДУ ПОВІДОМЛЕННЯ, ЩО ЗАБАГАТО КРАЇН -------//
function showInformMessage() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

//-------ФУНКЦІЯ ВИВОДУ ПОВІДОМЛЕННЯ, ЩО НЕМАЄ КРАЇН ЗІ ЗБІГОМ -------//
function showErrorMessage() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

//-------ФУНКЦІЯ ВИВОДУ ПЕРЕЛІКУ КРАЇН -------//
function showCountryList(countries) {
  console.log(countries);
}

//-------ФУНКЦІЯ ВИВОДУ ДАНИХ ПРО ОДНУ КРАЇНУ -------//
function showCountryInfo(country) {
  console.log(country.name.official);
  console.log(country.capital);
  console.log(country.population);
  console.log(country.flags.svg);
  console.log(country.languages);

  let countryInfo = `Country: ${country.name.official}`;

  countryCard.insertAdjacentHTML('beforeend', countryInfo);
}
