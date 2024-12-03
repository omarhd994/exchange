// helpers/FetchCrypto.js
export const FetchCrypto = (crypto) => {
    const apiURL = process.env.REACT_APP_API_1_URL;
    const url = `${apiURL}${crypto}`
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); //Primero en una respuesta normal, luego .then data.data...
    })
    .then(data => {

      return data.data.rates.USD;
    
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      return null;
    });
};
