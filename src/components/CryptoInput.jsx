export const CryptoInput = ({setCrypto, handleShowInfo}) => {
    
    return (
    <div>
        <input type='text' onChange={(e)=> setCrypto(e.target.value)} placeholder='Cryptocurrency Name'/>
        <button className="showInfo" onClick={handleShowInfo}>Show info</button>
    </div>
  )
}
