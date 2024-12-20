import './App.css';
import imageCrypto from "./images/CryptoLogo.png"
import { useEffect, useState, useCallback } from 'react';
import { CryptoInput } from './components/CryptoInput';
import { CryptoDisplay } from './components/CryptoDisplay';
import { Loader } from './components/Loader';
// import { JuegosForm } from './components/JuegosForm';
import { FetchCrypto } from './helpers/FetchCrypto';
import { useCryptoList } from './custom hooks/useCryptoList';

function App() {
  const [crypto, setCrypto] = useState("");
  const [showCrypto, setShowCrypto] = useState("");
  const [loading, setLoading] = useState(false);
  // const [cambio, setCambio] = useState("")
  // const [show, setShow] = useState(false)
  // const [cronometro, setCronometro] = useState(0)
  // const [activo,setActivo] = useState(false)
  
  // Función para manejar la llamada a la API y el estado de carga   -   //useCallback => memoriza la funcion para no recrearla again o solo cuando [crypto] cambia
  
  const handleShowInfo = useCallback(() => {  //useCallback evita que se vuelva a crear una instancia en cada renderizado solo cuando la dependencia "crypto" cambia
    setLoading(true);
    FetchCrypto(crypto).then(data => {  //Este .then(data => maneja la respuesta de la promesa devuelta por FetchCrypto
    setShowCrypto(parseFloat(data).toFixed(2));  //parsefloat.. rounds to 2 decimals
      setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setShowCrypto(null);
        setLoading(false);
      });

  }, [ crypto ]);

    

  useEffect(() => {
    // Si la longitud de la cadena es mayor o igual a 3, llamamos a handleShowInfo
    if (crypto.length >= 3)
      handleShowInfo();

    // Establecemos un temporizador para actualizar los datos cada 40 segundos 
    const timer = setInterval(() => {
      handleShowInfo();
    }, 400000)

    // Limpiamos el temporizador cuando el componente se desmonta o cuando crypto cambia
    return () => {
      clearInterval(timer);
    }
  }, [crypto, handleShowInfo]); // Crypto = al escribir y handleShowInfo = click son las dependencias
 

  /////////////////////////

  /* 
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
  
  */



  const cryptoList = useCryptoList();
  


  
  return (



    <div className='exchange'>
      <img src={imageCrypto} alt='crypto' width="220" height="220" className='imageCrypto'/>
      <br/>

      

    
          <>

            

         <CryptoInput setCrypto={setCrypto} handleShowInfo={handleShowInfo}/>
        
        {loading ? <Loader /> : <CryptoDisplay crypto={crypto} showCrypto={showCrypto} />}

            {/*

            <input type={show ? "text" : "password"}                //// show y tipo = mostrar password con valor y tipo = cambio
            onChange= {(e) => {setCambio(e.target.value)}} 
            value={cambio} placeholder='Enter Password'/>
            <button className='showPassword' onClick={() => {setShow(!show)}}> 
            {show ? "Hide Password" : "Show Password"}</button>

            <br/>
            <button onClick={ () => {setActivo(!activo)}}> {activo ? "Detener Cronometro" : "Activar Cronometro"} </button>
            <br/>
            {cronometro}
            
             */}
  
  <>



   {cryptoList.slice(0,6).map((data) => (
    <div key={data.id} className='cryptoItem'>
              <h2 className='cryptoName'>{data.symbol}</h2>
              <p className='cryptoPrice'>{parseFloat(data.priceUsd).toFixed(2)} $</p>
    </div>
))} 
   
   </>
          </>

    </div>
  );
}

export default App;



