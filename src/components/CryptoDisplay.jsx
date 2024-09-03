export const CryptoDisplay = ({ crypto, showCrypto }) => {
  return (
    <div>
        {crypto.length < 3 &&
              <h2 className='symbolName'> Put the symbol of the crypto </h2>}
        {showCrypto  ? (
              <div>
                <h2 className='rate'>The exchange rate for {crypto} is: {showCrypto} </h2>
              </div>)
              : (
                <h2 className='rateNoData'>No data available</h2>
              )
            }
    </div>
  )
}
