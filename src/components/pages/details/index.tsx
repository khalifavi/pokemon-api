import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useStore } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPokemonDetails } from "../../../api/pokemon-api";
import { pokemonSlice } from "../../../store/pokemonSlice";
import "./index.css";

function PokemonDetails() {
  const { name } = useParams();
  const store = useStore();

  const pokemonInitialState = pokemonSlice.getInitialState();
  const { pokemons } = store.getState() as typeof pokemonInitialState;

  const [pokemon, setPokemon] = useState<any>();

  const {
    isLoading: detailsLoading,
    error: detailsError,
    data: detailsData,
    refetch: detailsRefetch,
  } = useQuery("details-pokemon", () => fetchPokemonDetails(name || ""), {
    onSuccess(data) {
      console.debug({ name, data });
      setPokemon(data.data);
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  useEffect(() => {
    if (pokemons.length > 0) {
      setPokemon(pokemons.find((item) => item.name == name));
    } else {
      // fetch manually, then assign
      detailsRefetch();
    }
  }, []);

  return (
    <>
      <div className="details-container">
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-center">
                <figure className="image is-128x128">
                  {pokemon?.sprites && (
                    <img src={pokemon?.sprites.front_default} />
                  )}
                  {!pokemon?.sprites && (
                    <img src="https://bulma.io/images/placeholders/128x128.png" />
                  )}
                </figure>
              </div>
            </div>
            <div className="media-content">
              <p className="pokemon-name">{pokemon?.name}</p>
              <hr />
              <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <td>Attribute</td>
                    <td>Value</td>
                  </tr>
                </thead>
                <tbody>
                  {pokemon?.stats.map(
                    (stat: { base_stat: number; stat: { name: string } }) => {
                      return (
                        <tr>
                          <td>{stat.stat.name}</td>
                          <td>{stat.base_stat}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bottom-buttons field is-grouped">
          <button className="button is-danger is-fullwidth">Catch</button>
        </div>
      </div>
    </>
  );
}

export default PokemonDetails;
