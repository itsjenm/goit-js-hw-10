import './css/styles.css';
import fetchCountries from './fetchCountries';
const debounce = require('lodash.debounce');
import debounce from 'lodash.debounce';



const search = document.querySelector('#search-box'); //search input 
const DEBOUNCE_DELAY = 300;

//write a function to return an array of countries 
// Reduce the amount of data transferred by filtering and getting only (name, capital, population, flag svg, languages)

search.addEventListener('input', (event => {
    // console.log(search.value)
    let input = event.target.value.trim();
    const debounceThis = debounce(fetchCountries, DEBOUNCE_DELAY, {
        'leading': false,
        'trailing': true
    }, console.log('Function debounced after 300ms!'))
    debounceThis(input)
}))





