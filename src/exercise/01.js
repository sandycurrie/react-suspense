// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonErrorBoundary} from '../pokemon'
import Spinner from "../suspense-list/spinner";

const createResource = (promise) => {
    let status = 'pending';
    let result = promise
        .then(data => { status = 'resolved'; result = data; })
        .catch(err => { status = 'rejected'; result = err });

    return {
        read: () => {
            if (status === 'pending') throw result;
            if (status === 'rejected') throw result;
            if (status === 'resolved') return result;
        }
    }
}

const pokemonResource = createResource(fetchPokemon("pikachu"));

function PokemonInfo() {
   const pokemon =  pokemonResource.read();

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
