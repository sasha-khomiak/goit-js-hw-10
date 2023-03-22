//-------ФУНКЦІЯ ОТРИМАННЯ МАСИВУ КРАЇН -------//

export default function fetchCountries(name) {
  // лінк запиту
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;

  // робимо чечез fetch get-запит на сервер, перетворюємо у формат json
  // і повертаємо масив країн, які задовольняють запиту
  // Якщо отримуємо  404, то повертаємо порожній масив
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        return [];
      }
      return response.json();
    })
    .then(countryArray => {
      return countryArray;
    })
    .catch(error => {
      console.log(error);
    });
}

// чомусь в консолі вибиває 404 помилку, якщо немає збігу. Так і має бути?
