export const FetchCrypto = ( {crypto} ) => {

    return fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${crypto}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.data.rates.USD);
    
})
}