// helpers/FetchCrypto.js
export const FetchCrypto = (crypto) => {
  return fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${crypto}`)
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
