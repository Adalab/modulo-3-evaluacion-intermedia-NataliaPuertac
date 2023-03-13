import '../styles/App.scss';
import phrases from '../data/phrases.json';
import { useState } from 'react';

function App() {

//variables de estado

const [data, setdata] = useState (phrases)
const [search, setSearch] = useState ('')
const [select, setSelect] = useState ('')
const [newPhrase, setNewPhrase] = useState ({
  quote:"",
  character:"",
})

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
  setdata([...data, newPhrase])
  setNewPhrase ({ quote:"",character:""})
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
   <li key={index}>
      <p>Quote: {eachPhrase.quote}</p>
      <p>Character: {eachPhrase.character}</p>
    </li>
  )
  );
};

const newPhrases = (ev) =>{
  setNewPhrase ({...newPhrase, [ev.target.id]: ev.target.value})
}

//devuelve el HTML

  return <div className="App">
    <header>
      <h1>Frases de Friends</h1>
      <form>

        <label> Filtrar por Frases
          <input
          type="search"
          name="search"
          className="input"
          placeholder='Escribe la frase'
          onInput={handleFilter}
          value={search}
          />
        </label>

        <label htmlFor="person"> Filtrar por personaje </label>
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
      <ul>{renderList()}</ul>
    </main>

    <footer>
      <h2>Añadir una nueva frase</h2>

      <label className="label" htmlFor='quote'> Frase:
            <input
            className="new-phrase__input"
            type="text"
            name="quote"
            id="quote"
            placeholder="Escribe la frase"
            onInput={newPhrases}
            value={newPhrase.quote}
            />
          </label>

          <label className="label" htmlFor='characterName'> Personaje:
            <input
            className="new-phrase__input"
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

    </footer>
</div>;
}

export default App;
