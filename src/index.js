import './css/styles.css';
import fetchCountries from './fetchCountries';
const debounce = require('lodash.debounce');
import Notiflix from 'notiflix';



const search = document.querySelector('#search-box'); //search input 
const DEBOUNCE_DELAY = 300;

//write a function to return an array of countries 
// Reduce the amount of data transferred by filtering and getting only (name, capital, population, flag svg, languages)

search.addEventListener('input', debounce((event => {
    // console.log(search.value)
    let input = event.target.value;
    // If the user clears the search box completely, the HTTP request is not executed, and the country list markup or country information disappears.
    fetchCountries(input)


}), DEBOUNCE_DELAY))







