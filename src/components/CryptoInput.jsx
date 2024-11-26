export const CryptoInput = ({setCrypto, handleShowInfo}) => {
    
    return (
    <div className="inputContainer">
        
        <h2 className='symbolName'> Enter the cryptocurrency symbol </h2>
        <input type='text' onChange={(e)=> setCrypto(e.target.value)} placeholder='Cryptocurrency Name'/>
        <button className="showInfoBtn" onClick={handleShowInfo}>Show info</button>
    </div>
  )
}
