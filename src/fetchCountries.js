//-------ФУНКЦІЯ ОТРИМАННЯ МАСИВУ КРАЇН -------//

export default function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}`;

  return fetch(url)
    .then(r => r.json())
    .then(countryArray => {
      return countryArray;
    })
    .catch(error => {
      console.log(error);
    });
}

//-------ФУНКЦІЯ ОТРИМАННЯ МАСИВУ КРАЇН -------//

// export default function fetchCountries(name) {
//     const url = `https://restcountries.com/v3.1/name/${name}`;
// //   const url = `https://restcountries.com/v3.1/name/${name}?fullText=true`;

//   fetch(url)
//     .then(r => r.json())
//     .then(countryArray => {
//       return countryArray.forEach(country => {
//         // if (country.name.common.toUpperCase().includes(name.toUpperCase())) {
//         //   console.log(country.name.common);
//         // }
//           console.log(countryArray);
//           //   showMessage(countryArray.length);

//       });
//     });
// }
