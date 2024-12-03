// helpers/FetchCrypto.js
export const FetchCrypto = (crypto) => {
    const apiURL = "https://api.coinbase.com/v2/exchange-rates?currency="
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
