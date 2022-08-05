// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonErrorBoundary} from '../pokemon'
import Spinner from "../suspense-list/spinner";

let pokemon, error;

const pokemonPromise = fetchPokemon("pikacha")
    .then(data => pokemon = data)
    .catch(err => error = err);

function PokemonInfo() {
    if (error) throw error;
    if (!pokemon) throw pokemonPromise;
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
          <PokemonErrorBoundary>
              <React.Suspense fallback={<Spinner />}>
                  <PokemonInfo />
              </React.Suspense>
          </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
