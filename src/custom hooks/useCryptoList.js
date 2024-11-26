import { useState } from "react"
import { useEffect } from "react"

export const useCryptoList = () => {

  const [cryptoList, setCryptoList] = useState([])

    useEffect (() => {
  
        fetch("https://api.coincap.io/v2/assets")
        .then(res => res.json())
        .then(data => {
 
  setCryptoList(data.data)
        }
        )
      
    }, [])

    

  return cryptoList;
}
