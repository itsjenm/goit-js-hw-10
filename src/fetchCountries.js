import Notiflix from "notiflix";

const countriesList = document.querySelector(".country-list");
const countriesInfo = document.querySelector(".country-info");


//write a function to return an array of countries 
// Reduce the amount of data transferred by filtering and getting only (name, capital, population, flag svg, languages)
export default function fetchCountries(name) {
    fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
        // console.log(response)
        // If the user clears the search box completely, the HTTP request is not executed, and the country list markup or country information disappears.
        if(name === '' || !name) {
            countriesList.innerHTML = ""; 
            countriesInfo.innerHTML = "";
            throw new Error(response.status)
        }
        // As the user clears their input, clear the dom elements
        if (name.length - 1) {
            countriesInfo.innerHTML = "";
            countriesList.innerHTML = "";
        } 

        // parse data into json
        return response.json()
    })
    .then(countries => {
        console.log(countries)

        const totalCountries = countries.length;

        //if countries > 10 show error using Notflix
        if (totalCountries > 10) {
            // console.error('too many countries!')
           Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        } 
        
        if (!totalCountries) {
            Notiflix.Notify.failure('Oops, there is no country with that name')
            countriesList.innerHTML = "";
        }

        

        if (totalCountries > 1 && totalCountries < 11) {
           showCountryWithFlag(countries)
        }
        else if (totalCountries == 1) {
            showCountryWithFlag(countries)
            showCountryInfo(countries)
        }

    })
    .catch(error => console.log(error))

    // render country name and image separately 
    //function that renders country with flag
 const showCountryWithFlag = (countries) => {
    const countriesList = document.querySelector(".country-list");
    const markup = countries.map((country) => {
        const {
            name,
            flags: { svg },
        } = country;

        return (countriesList.innerHTML =  `
            <li class="country-list_item">
                <img class="country-list_flag" src="${svg}" alt="Flag of ${name}">
                <h2 class="country-list_name">${name}</h2>
            </li>
            `);
        })
        .join('');
        // console.log(markup);
        countriesList.innerHTML = markup;
    }

// render the rest of the data 
    function showCountryInfo (countries) {
        const markup = countries.map((country) => {
            countriesInfo.innerHTML = `
            <ul>
                <li><p>Capital: ${country.capital}</p></li>
                <li><p>Population: ${country.population}</p></li>
                <li><p>Languages: ${country.languages.map(languages => " " + languages.name)}</p></li>
            </ul>
            `
        })
        .join('')
        return markup
    }
 
}