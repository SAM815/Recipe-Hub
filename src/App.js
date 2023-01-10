//App.js
import './App.css';
import { useState } from 'react';
import Axios from 'axios';
import RecipeTile from './recipe tile/RecipeTile';

function App() {
  const YOUR_APP_ID = 'a80fd000';
  const YOUR_APP_KEY = 'd09f5099ad81952af551e04e3079b48b';

 
  const [query, setQuery] = useState('');
  const [healthLabel, setHealthLabel] = useState('vegan');
  const [recipes, setRecipes] = useState([]);

  const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabel}`;
//implementing custom search above two new states i.e. query and healthlabel
//and changes in the API endpoints
 
  const getRecipeInfo = async () => {
    var result = await Axios.get(url);
    setRecipes(result.data.hits);
    console.log(result.data.hits);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    getRecipeInfo();
  }

  return (
    <div className="app">
      <h1 onClick={getRecipeInfo}>
        <u>Food Recipe Hub🍲🍲</u>
      </h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input type="text"
          placeholder="Type your ingredient"
          autoComplete='off'
          className="app__input"
          value={query}
          onChange={(e) => { setQuery(e.target.value) }} />{/**Also this for custom search */}
        <select className="app__healthLabels" >
          <option value="vegan" onClick={(e) => { setHealthLabel("vegan") }}>vegan</option>

          <option value="vegan" onClick={(e) => { setHealthLabel("low-sugar") }}>low-sugar</option>


          <option value="vegan" onClick={(e) => { setHealthLabel("dairy-free") }}>dairy-free</option>


          <option value="vegan" onClick={(e) => { setHealthLabel("immune-supportive") }}>immune-supportive</option>


          <option value="vegan" onClick={(e) => { setHealthLabel("wheat-free") }}>wheat-free</option>

        </select>
        <input type="submit" value="Get Recipe" className="app__submit" />
      </form>
      <div className="app__recipes">
        {recipes.map((recipe)=>{
          return <RecipeTile recipe={recipe}/>
        })}
      </div>
    </div>
  );
}

export default App;
