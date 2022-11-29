import { useState } from "react";
import { useQuery } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { fetchPokemon, fetchPokemonNext } from "./api/pokemon-api";
import "./App.css";
import "bulma/css/bulma.css";
import reactLogo from "./assets/react.svg";
import PageNotFound from "./components/pages/not-found";
import Home from "./components/pages/home";
import PokemonDetails from "./components/pages/details";
import MyPokemons from "./components/pages/my-pokemons";
import Header from "./components/pages/header";

function App() {
  return (
    <BrowserRouter>
      <div id="wrapper" className="container has-text-centered-mobile">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
          <Route path="/my-pokemons" element={<MyPokemons />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function ViteReactHome() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vite js.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
