import { useCallback } from "react";
import logo from "../../logo.svg";
import { useHistory } from "react-router-dom";
import "../../App.css";
import { Button } from "antd";

function Home() {
  const history = useHistory();
  const handleOnClick = useCallback(() => {
    history.push("/pokedex");
  }, [history]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Search your Pokemon</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button type="primary" onClick={handleOnClick}>
          Pokedex
        </Button>
      </header>
    </div>
  );
}

export default Home;
