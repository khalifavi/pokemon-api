import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchPokemon,
    fetchPokemonDetails,
    fetchPokemonNext,
    batchPokemonDetail,
} from "../../../api/pokemon-api";

import "./index.css";
import PokemonCard from "./pokemon-card";
import { replacePokemons, selectCount, replacePokemonAsync, pokemonSlice } from "../../../store/pokemonSlice";

function Home() {
    let nextRequestUrl = "";
    let totalPokemons = -1;
    const [nextRequestUrlS, setNextRequestUrl] = useState<string>("");

    // const [pokemons, setPokemons] = useState<any[]>([]);
    const [pokemonsQueue, setPokemonsQueue] = useState<any[]>([]);

    const store = useStore();
    const dispatch = useDispatch();
    const pokemonsCount = useSelector(selectCount);
    const pokemonInitialState = pokemonSlice.getInitialState();
    const { pokemons } = store.getState() as typeof pokemonInitialState;

    const navigate = useNavigate();

    const infiniteScroll = (containerDom: any) => {
        const scrollY = containerDom.scrollHeight - containerDom.scrollTop;
        const height = containerDom.offsetHeight;
        const offset = height - scrollY;
        if (offset == 1 || offset == 0) {
            nextRefetch();
        }
    };

    useEffect(() => {
        const listContainer = document.querySelector("div.list-container");
        console.debug({ listContainer });
        const scrollListener = () => infiniteScroll(listContainer);
        listContainer?.addEventListener("scroll", scrollListener);
        listRefetch();

        console.debug({ pokemons });
        return () => {
            listContainer?.removeEventListener("scroll", scrollListener);
        };
    }, []);

    const {
        isLoading: listLoading,
        error: listError,
        data: listData,
        refetch: listRefetch,
    } = useQuery("pokemons", () => fetchPokemon, {
        onSuccess(data) {
            if (data && data.data && data.data.next) {
                const { next, count, results } = data.data;
                nextRequestUrl = next;
                totalPokemons = count;
                // setPokemons(results);
                dispatch(replacePokemons(results));

                setNextRequestUrl(next);

                const names = results.map((result: any) => result.name);
                setPokemonsQueue(names);
            }
        },
    });

    const {
        isLoading: nextLoading,
        error: nextError,
        data: nextData,
        refetch: nextRefetch,
    } = useQuery("next-pokemons", () => fetchPokemonNext(nextRequestUrlS), {
        onSuccess(data) {
            if (data && data.data && data.data.next) {
                const { next, results } = data.data;
                nextRequestUrl = next;
                // setPokemons([...pokemons, ...results]);
                dispatch(replacePokemons([...pokemons, ...results]));
                setNextRequestUrl(next);

                const names = results.map((result: any) => result.name);
                setPokemonsQueue(names);
            }
        },
        refetchOnWindowFocus: false,
        enabled: false,
    });

    const {
        isLoading: detailsLoading,
        error: detailsError,
        data: detailsData,
        refetch: detailsRefetch,
    } = useQuery(
        "batch-details-pokemon",
        () => batchPokemonDetail(pokemonsQueue),
        {
            onSuccess(data) {
                console.debug({ pokemonsQueue, data });
                // find and loop pokemon state
                const newPokemons = [...pokemons];
                data.forEach((detail: any) => {
                    const pokemonIdx = newPokemons.findIndex(
                        (p) => p.name == detail.data.name
                    );
                    newPokemons[pokemonIdx] = detail.data;
                    console.debug({ pokemonUpdated: newPokemons[pokemonIdx], detail });
                });
                // setPokemons(newPokemons);
                dispatch(replacePokemons(newPokemons));
            },
            refetchOnWindowFocus: false,
            enabled: false,
        }
    );

    useEffect(() => {
        console.debug({ pokemons });
    }, [pokemons]);

    useEffect(() => {
        detailsRefetch();
    }, [pokemonsQueue]);

    function goToDetails(name: any) {
        navigate(`/pokemon/${name}`);
    }

    return (
        <>
            <div className="list-container">
                {listLoading && <img src="/loading.gif" />}
                {/* {listError && <h3>Sorry, we cannot show you any Pokemon</h3>} */}
                {pokemons && pokemons.length > 0 && (
                    <div className="columns">
                        {pokemons.map((pokemon: any) => {
                            return (
                                <PokemonCard
                                    pokemon={pokemon}
                                    onClick={() => goToDetails(pokemon.name)}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default Home;
