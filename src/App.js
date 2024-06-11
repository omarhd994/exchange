import { createChart } from 'lightweight-charts';
import './App.css';
import imageCrypto from "./crypto.jpg"
import { useEffect, useState, useCallback } from 'react';

function App() {
  const [crypto, setCrypto] = useState("");
  const [showCrypto, setShowCrypto] = useState("");
  const [loading, setLoading] = useState(false);
  const [lineSeries, setLineSeries] = useState(null)
  const [cambio, setCambio] = useState("")
  const [show, setShow] = useState(false)
  const [cronometro, setCronometro] = useState(0)
  const [activo,setActivo] = useState(false)
  const [cryptoList, setCryptoList] = useState([])

  // Función para manejar el cambio en el input de la criptomoneda
  const handleCrypto = (e) => {
    setCrypto(e.target.value);
  }

  // Función para manejar la llamada a la API y el estado de carga
  const handleShowInfo = useCallback(() => {
    setLoading(true);
    fetch(`https://api.coinbase.com/v2/exchange-rates?currency=${crypto}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.data.rates.USD);
        setShowCrypto(data.data.rates.USD);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setShowCrypto(null);
        setLoading(false);
      });
  }, [ crypto ]);

  // Función para manejar el clic en el botón
  const handleClick = () => {
    handleShowInfo();
  }

  const handleChart = () => {
    setLoading(true)
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
    .then(response => response.json())
    .then(data => { 
      const bitCoinData = data[0]
      const prices = [{ time: new Date(bitCoinData.last_updated).getTime(), value: parseFloat(bitCoinData.current_price)  }]
      prices.sort((a, b) => a.time - b.time);
      lineSeries.setData(prices)
     })
     .catch(error => {
        console.error("Error fetching chart data:", error)
        setLoading(false)
     })
  }

  useEffect(()=> {
    const chart = createChart(document.getElementById("chart"), {
      width: 600,
      height: 300,
    })

    const series = chart.addLineSeries()    // Se aniade las lineas del grafico
    setLineSeries(series)         // Se aniade la info en el estado chartData al grafico

    return () => {
      chart.remove()
    }
  }, [])

  useEffect(() => {
    // Si la longitud de la cadena es mayor o igual a 3, llamamos a handleShowInfo
    if (crypto.length >= 3)
      handleShowInfo();

    // Establecemos un temporizador para actualizar los datos cada 40 segundos
    const timer = setInterval(() => {
      handleShowInfo();
    }, 40000)

    // Limpiamos el temporizador cuando el componente se desmonta o cuando crypto cambia
    return () => {
      clearInterval(timer);
    }
  }, [crypto, handleShowInfo]); // Crypto = al escribir y handleShowInfo = click son las dependencias
 

  /////////////////////////

  useEffect(()=> {
    let interval;
    
    activo ? 
      interval = setInterval(() => {      /// Condicion si activo = true, incremente, si no, que se borre el interval.
        setCronometro((prevCronometro) => prevCronometro + 1);
      }, 1000)
     : 
      clearInterval(interval)
    
    return () => clearInterval(interval)    // useEffect tiene siempre un return, en este caso limpia interval

  }, [activo])
    
  useEffect (() => {
  
      fetch("https://api.coincap.io/v2/assets")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCryptoList(data.data)
      }
      )
    
  }, [])
  

  
  return (
    <>
      <img src={imageCrypto} alt='crypto' width="220" height="220" className='imageCrypto'/>
      <br/>

      <input type='text' onChange={handleCrypto} />
      <button onClick={handleClick}>Show info</button>

      {loading === true ? (
        <div>
          <p>Loading...</p>
        </div>)
        :
        (
          <>

            {crypto.length < 3 &&
              <h2> Put the symbol of the crypto </h2>}

            {showCrypto  ? (
              <div>
                <h2>The exchange rate for {crypto} is: {showCrypto} </h2>
              </div>)
              : (
                <h2>No data available</h2>
              )
            }

            <input type={show ? "text" : "password"}                //// show y tipo = mostrar password con valor y tipo = cambio
            onChange= {(e) => {setCambio(e.target.value)}} 
            value={cambio} />
            <button onClick={() => {setShow(!show)}}> 
            {show ? "Hide Password" : "Show Password"}</button>

            <br/>
            <button onClick={ () => {setActivo(!activo)}}> {activo ? "Detener Cronometro" : "Activar Cronometro"} </button>
            <br/>
            {cronometro}

          
  <button onClick={handleChart}>Show Chart</button>
   <div id='chart'/>
  
  <>

   {cryptoList.map((crypto) => (
    <div key={crypto.id}>
              <h2>{crypto.name}</h2>
              <p>{crypto.priceUsd}</p>
              <p>{crypto.marketCapUsd}</p>
           
            </div>
   )

   )
   
   }

   </>
          </>
        )}
    </>
  );
}

export default App;



