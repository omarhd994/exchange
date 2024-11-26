export const CryptoDisplay = ({ showCrypto }) => {
  return (
    <div className="displayText">
        {showCrypto  ? (
              <div className="boxResult">
                <h2 className='rate'>The exchange rate for the crypto is: {showCrypto} </h2>
              </div>)
              : (
                <h2 className='rateNoData'>No data available</h2>
              )
            }
    </div>
  )
}
