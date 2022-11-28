import axios from "axios";

const fetchPokemon = axios("https://pokeapi.co/api/v2/pokemon");
const fetchPokemonNext = (nextUrl: string) => axios(nextUrl);

export {
    fetchPokemon,
    fetchPokemonNext,
}