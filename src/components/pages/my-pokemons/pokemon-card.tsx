import { MouseEventHandler } from "react";

interface PokemonCardProps {
    pokemon: any;
}

function PokemonCard(props: PokemonCardProps) {
  return (
    <div key={props.pokemon.name} className="column">
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-center">
              <figure className="image is-64x64">
                {props.pokemon.image && <img src={props.pokemon.image} />}
                {!props.pokemon.image && (
                  <img src="https://bulma.io/images/placeholders/64x64.png" />
                )}
              </figure>
            </div>
          </div>
          <div className="media-content">
            <p className="pokemon-name">{props.pokemon.nick ? `${props.pokemon.nick}\n(${props.pokemon.name})` : props.pokemon.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PokemonCard;