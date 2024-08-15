import React, { useEffect, useState } from 'react';
import './Slasher.css';

function Slasher() {
  const [Slasher, setSlasher] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const slasherPorPagina = 12;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchSlasher() {
      try {
        const response = await fetch('/slasher.json');
        if (!response.ok) {
          throw new Error('Erro ao carregar os filmes');
        }
        const data = await response.json();
        setSlasher(data.slasher);
        setTotalPages(Math.ceil(data.slasher.length / slasherPorPagina));
      } catch (error) {
        console.error('Erro ao carregar os filmes:', error);
      }
    }

    fetchSlasher();
  }, [slasherPorPagina]);

  const slasherDaPagina = Slasher.slice(
    (paginaAtual - 1) * slasherPorPagina,
    paginaAtual * slasherPorPagina
  );

  const nextPage = () => {
    if (paginaAtual < totalPages) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const prevPage = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  return (
    <div>
      <div className="slasher-lista">
        {slasherDaPagina.map((slasher, index) => (
          <div className="slasher-item" key={index}>
            <img src={slasher.imagemUrl} alt={slasher.titulo} className="slasher-imagem" onError={(e) => { e.target.onerror = null; e.target.src = '/default-image.jpg'; }} />
            <div className="slasher-detalhes">
              <h2>{slasher.titulo}</h2>
              <p>Ano: {slasher.ano}</p>
              <p>Diretor: {slasher.diretor}</p>
              <a href={slasher.trailerUrl} target="_blank" rel="noopener noreferrer" className="trailer-link">Assistir Trailer</a>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={paginaAtual === 1}>Anterior</button>
        <span>Página {paginaAtual} de {totalPages}</span>
        <button onClick={nextPage} disabled={paginaAtual === totalPages}>Próxima</button>
      </div>
    </div>
  );
}

export default Slasher;
