const BASE_URL = 'https://restcountries.com/v3.1/name/';


 function fetchCountries (name){
    const url = `${BASE_URL}${name}?fields=name,capital,population,flags,languages`;
    return fetch(url).then(response => {
        if (response.status === 404) {
            throw new Error(response.status);
        }
        return response.json();
    });
};
export default { fetchCountries }

  