export const CryptoDisplay = ({ showCrypto, crypto }) => {
  return (
    
    <div className="displayText">
        
        {showCrypto  ? (
              <div className="boxResult">
                <h2 className='rate'>The price of {crypto} is: {showCrypto} $ </h2>
              </div>)
              : (
                <h2 className='rateNoData'>""</h2>
              )
            }
    </div>
  )
}
