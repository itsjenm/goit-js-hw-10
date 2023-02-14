const search = document.querySelector('#search-box'); //search input 
const countriesList = document.querySelector(".country-list");
const countriesInfo = document.querySelector(".country-info");



//write a function to return an array of countries 
// Reduce the amount of data transferred by filtering and getting only (name, capital, population, flag svg, languages)
export default function fetchCountries(name) {
    fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        // console.log(response)
        if(name === '') {
            countriesList.innerHTML = ""; 
            countriesInfo.innerHTML = "";
        }

        // parse data into json
        return response.json()
    })
    .then(data => {
        console.log(data)
        if(name.length < 3) {
            initialize(data)
        }
    // display country name and flag image
    // Object.values returns an array of a given object's own property values
        showCountryList(Object.values(data))
        // // display the rest of the country data
        // // Object.values returns an array of a given object's own property values
        showCountryInfo(Object.values(data))
    })
    .catch(error => console.log(error))

    // render country name and image separately 
    function showCountryList (countries) {
        const countriesList = document.querySelector(".country-list");
        const markup = countries.map((country) => {
        countriesList.innerHTML =  `
            <li class="country-list_item">
                <img class="country-list_flag" src="${country.flags.svg}" alt="Flag of ${country.name.official}>
                <h2 class="country-list_name">${country.name}</h2>
            </li>
            `
        })
        .join('')
        return markup
    }

// render the rest of the data 
    function showCountryInfo (countries) {
        const markup = countries.map((country) => {
            countriesInfo.innerHTML = `
            <ul>
                <li><p>Capital: ${country.capital}</p></li>
                <li><p>Population: ${country.population}</p></li>
                <li><p>Languages: ${country.languages[0].name}</p></li>
            </ul>
            `
        })
        .join('')
        return markup
    }

    function initialize(countries) {
        let map = countries
        let options = "";
        map.forEach(country => options += `<option value="${country.alpha3Code}">${country.name}</option>`)
        countriesList.innerHTML = options;
    }
 
}