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
  const [nickname, setNickname] = useState<string | undefined>();

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

  const catchButtonClick = () => {
    if (!pokemon) return;
    showNickDialog();
  };

  const onChangedNickname = (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
    setNickname(event?.target.value);
  };

  const showNickDialog = () => {
    const dialog = document.getElementById("nickname-modal");
    dialog?.classList.add("is-active");
  }

  const closeNickDialog = () => {
    const dialog = document.getElementById("nickname-modal");
    dialog?.classList.remove("is-active");
  }

  const catchPokemon = (nickname?: string) => {
    const dialog = document.getElementById("nickname-modal");
    dialog?.classList.remove("is-active");

    const uuid = crypto.randomUUID();

    const thePokemon = {
      uuid,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      nick: nickname,
    };
    const myPokemons = JSON.parse(localStorage.getItem("my-pokemons") || "{}");
    myPokemons[uuid] = thePokemon;
    localStorage.setItem("my-pokemons", JSON.stringify(myPokemons));
  }

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
          <button
            className="button is-danger is-fullwidth"
            onClick={catchButtonClick}
          >
            Catch
          </button>
        </div>
      </div>
      <div id="nickname-modal" className="modal">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Nickname</p>
            <button className="delete" aria-label="close" onClick={closeNickDialog}></button>
          </header>
          <section className="modal-card-body">
            Give nickname to the{" "}
            <span className="pokemon-name">{pokemon?.name || "Pokemon"}</span>?
            <input
              className="input is-info"
              type="text"
              placeholder="Nickname"
              name="nickname"
              value={nickname}
              onChange={onChangedNickname}
            />
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={()=>{catchPokemon(nickname)}}>Save Nickname</button>
            <button className="button is-success" onClick={()=>{catchPokemon()}}>Just Catch</button>
          </footer>
        </div>
      </div>
    </>
  );
}

export default PokemonDetails;
