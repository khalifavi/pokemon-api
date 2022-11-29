import { useEffect, useState } from "react";

import "./index.css";
import PokemonCard from "./pokemon-card";

function MyPokemons() {
    const [pokemons, setPokemons] = useState<any[]>([]);
    useEffect(() => {
        const myPokemons = JSON.parse(localStorage.getItem("my-pokemons") || "{}");
        setPokemons(Object.values(myPokemons));
        console.debug({ pokemons });
        return () => {
        };
    }, []);

    return (
        <>
            <div className="list-container">
                {pokemons && pokemons.length > 0 && (
                    <div className="columns">
                        {pokemons.map((pokemon: any) => {
                            return (
                                <PokemonCard
                                    pokemon={pokemon}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default MyPokemons;
