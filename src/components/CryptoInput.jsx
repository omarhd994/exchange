export const CryptoInput = ({setCrypto, handleShowInfo}) => {
    
    return (
    <div className="inputContainer">
        
        <h2 className='symbolName'> Put the symbol of the crypto </h2>
        <input type='text' onChange={(e)=> setCrypto(e.target.value)} placeholder='Cryptocurrency Name'/>
        <button className="showInfoBtn" onClick={handleShowInfo}>Show info</button>
    </div>
  )
}
