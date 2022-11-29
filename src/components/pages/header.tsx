import { useNavigate } from "react-router-dom";

function Header() {
  const navigator = useNavigate();
  return (
    <div className="is-paddingless">
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              Pokemon API Implementation
            </a>
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary" onClick={() => navigator("/my-pokemons")}>
                <strong>My Pokemons</strong>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
