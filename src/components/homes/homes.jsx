import React from 'react';
import { Link } from 'react-router-dom'; // Importa o Link para navegação
import './homes.css';

function Home() {
  return (
    <div className="home">
      <div className="banner">
        <h1 className="landing-heading">THE BEST</h1>
        <h1 className="landing-heading3">HORROR</h1>
        <h1 className="landing-heading2">MOVIES</h1>
        <Link to="/filmes" className="conheca-button">Conheça</Link> {}
      </div>
    </div>
  );
}

export default Home;
