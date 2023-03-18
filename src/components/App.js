import '../styles/App.scss';
import { useState, useEffect } from 'react';
import getApi from '../services/api';

function App() {

//variables de estado

const [data, setData] = useState ([])
const [search, setSearch] = useState ('')
const [select, setSelect] = useState ('')
const [newPhrase, setNewPhrase] = useState ({
  quote:"",
  character:"",
})

useEffect(() => {
    getApi().then((response) => {
      setData(response);
    });
  }, []);

//funciones handler

const handleFilter = (ev) => {
ev.preventDefault();
setSearch(ev.target.value)
};

const handleSelect = (ev) => {
  ev.preventDefault();
  const election = ev.currentTarget.value;
  setSelect(election)
};

const handleClick = (ev) => {
  ev.preventDefault();
  if (newPhrase.quote !== '' && newPhrase.character !== ''){
  setData([...data, newPhrase])
  setNewPhrase ({ quote:"",character:""})}
};

// funciones para pintar el HTML

const renderList = () => {
  return data
  .filter ((eachPhrase) => 
  eachPhrase.quote.toLowerCase().includes(search.toLowerCase())
  )
  .filter ((eachPhrase) => 
  eachPhrase.character.toLowerCase().includes(select.toLowerCase())
  )
  .map ((eachPhrase, index) => (
   <li className="onePhrase" key={index}>
      <p className="quote">{eachPhrase.quote}</p>
      <p className="character">{eachPhrase.character}</p>
    </li>
  )
  );
};

const newPhrases = (ev) =>{
  setNewPhrase ({...newPhrase, [ev.target.id]: ev.target.value})
}

//devuelve el HTML

  return <div className="App">
    <header className="header">
      <h1 className="tittle">Frases de Friends</h1>
      <form className='form'>

        <label className="label"> Filtrar por frases
          <input
          type="search"
          name="search"
          className="input"
          placeholder='Escribe la frase'
          onInput={handleFilter}
          value={search}
          />
        </label>

        <label className="label" htmlFor="person"> Filtrar por personaje </label>
        <select id="person" name="select" onChange={handleSelect}>
          <option value="">Todos</option>
          <option value="Ross">Ross</option>
          <option value="Mónica">Mónica</option>
          <option value="Joey">Joey</option>
          <option value="Phoebe">Phoebe</option>
          <option value="Chandler">Chandler</option>
          <option value="Rachel">Rachel</option>
        </select> 

      </form>
    </header>

    <main>
      <ul className="list">{renderList()}</ul>
    </main>

    <footer className="footer">
      <h2 className="p">Añadir una nueva frase</h2>

      <form className="form2">
  
        <label className="p2" htmlFor='quote'> Frase:
            <input
            required
            className="input"
            type="text"
            name="quote"
            id="quote"
            placeholder="Escribe la frase"
            onInput={newPhrases}
            value={newPhrase.quote}
            />
        </label>

        <label className="p2" htmlFor='characterName'> Personaje:
            <input
            required
            className="input"
            type="text"
            name="character"
            id="character"
            placeholder="Escribe el nombre del personaje"
            onInput={newPhrases}
            value={newPhrase.character}
            />
        </label>

        <input
          className= "input_Submit"
          type="submit"
          value= "Crea una nueva frase"
          onClick={handleClick}
        />
  
      </form>

    </footer>
</div>;
}

export default App;
