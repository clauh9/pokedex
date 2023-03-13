import React, { useEffect, useState } from 'react';
import PokemonCard from '../Components/PokemonCard';
import SearchAppBar from "../Components/SearchAppBar"
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import axios from 'axios';
import pokemon_loading from '../Img/pokemon_loading.gif';


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemons();

    return () => {
    };
  }, []);

  const getPokemons = () => {
    setLoading(true);
    const promises = [];
    //there's 386 pokemons is the sum of all pokemons in the first 3 generations
    for (let i = 1; i <= 386; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
      promises.push(url);
    }

    axios.all(promises.map(promisse => axios.get(promisse))).then((res) => {
      setLoading(false)
      setPokemons(res)
    }
    );

  }

  const pokemonFilter = (name) => {
    let filteredPokemons = [];

    if (name === "") {
      getPokemons();
    }

    for (let i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i]);
      }
    }

    setPokemons(filteredPokemons);
  };

  return (
    <div className='Home'>
      {/* Loading our API shows this (loading circle) */}
      {loading === true && <div> <SearchAppBar pokemonFilter={pokemonFilter} />
        <div className="loading"><img src={pokemon_loading} alt="" /></div>
      </div>}

      {/* When it's done loading our API it shows this */}
      {loading === false && <div> <SearchAppBar pokemonFilter={pokemonFilter} />
        <Container maxWidth="false" className="Container">
          <Grid container spacing={3}>
            {pokemons.map((pokemon, i) => (
              <Grid item xs={2} key={i} sm={6} md={4} lg={2}>
                <PokemonCard name={pokemon.data.name} img={pokemon.data.sprites.front_default} typesArr={pokemon.data.types.map((type) => type.type.name)} />
              </Grid>
            ))}
          </Grid>
        </Container></div>}

    </div>
  );
}

export default App;
