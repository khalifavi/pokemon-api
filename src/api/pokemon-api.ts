import axios from "axios";

const fetchPokemon = axios("https://pokeapi.co/api/v2/pokemon");
const fetchPokemonNext = (nextUrl: string) => {
  console.debug({ nextUrl });
  return axios(nextUrl);
};
const fetchPokemonDetails = (name: string) =>
  axios(`https://pokeapi.co/api/v2/pokemon/${name}`);

const batchPokemonDetail = (names: string[]) =>
  Promise.all(
    names.map((name) => axios(`https://pokeapi.co/api/v2/pokemon/${name}`))
  );

export {
  fetchPokemon,
  fetchPokemonNext,
  fetchPokemonDetails,
  batchPokemonDetail,
};
