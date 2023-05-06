import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import SearchAppBar from "./SearchAppBar"
import { Container } from "@mui/system";
import { Grid } from "@mui/material";
import axios from 'axios';
import pokemon_loading from '../Img/pokemon_loading.gif';


function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getPokemons();

    return () => {
    };
  }, []);

  
  const getPokemons = () => {
    setLoading(true);
    const promises = [];
    //there's 386 pokemons is the sum of all pokemons in the first 3 generations
    //721 I-VI gen 
    for (let i = 1; i <= 721; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
      promises.push(url);
    }

    axios.all(promises.map(promisse => axios.get(promisse))).then((res) => {
      setLoading(false)
      setPokemons(res)
    }
    );

  }

  return (
    <div className='Home'>
      {/* Loading our API shows this (loading circle) */}
      {loading === true && <div> <SearchAppBar />
        <div className="loading"><img src={pokemon_loading} alt="" /></div>
      </div>}

      {/* When it's done loading our API it shows this */}
      {loading === false && <div> <SearchAppBar setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        <Container maxWidth="false" className="Container">
          <Grid container spacing={3}>
            {pokemons.filter(val => {
              return val.data.name.includes(searchTerm)
            }).map((pokemon, i) => (
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
