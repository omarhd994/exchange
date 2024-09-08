export const JuegosForm = () => {
    
    const handleSubmitJuegos = (e) => {
        e.preventDefault();
    
        let juegos = {
          id: new Date().getTime(),
          titulo: e.target.titulo.value,
          descripcion: e.target.descripcion.value,
        }
        console.log(juegos)
      }
    
      return (
        <>
            <h3>TEST test Juegos</h3>
                <form onSubmit={handleSubmitJuegos}>
                <input type='texto' name='titulo' placeholder='Titulo del juego'/>
                <br/>
                <textarea name='descripcion' placeholder='Descripcion'/>
                <br/>
    
                <input type="Submit"/>
                </form>
        </>
    
      )
}

   