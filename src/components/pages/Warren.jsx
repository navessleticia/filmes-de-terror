import React, { useEffect, useState } from 'react';
import './Warren.css';

function Warren() {
  const [warren, setWarren] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const warrenPorPagina = 12;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchWarren() {
      try {
        const response = await fetch('/warren.json');
        if (!response.ok) {
          throw new Error('Erro ao carregar os filmes');
        }
        const data = await response.json();
        setWarren(data.warren);
        setTotalPages(Math.ceil(data.warren.length / warrenPorPagina));
      } catch (error) {
        console.error('Erro ao carregar os filmes:', error);
      }
    }

    fetchWarren();
  }, [warrenPorPagina]);

  const warrenDaPagina = warren.slice(
    (paginaAtual - 1) * warrenPorPagina,
    paginaAtual * warrenPorPagina
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
      <div className="warren-lista">
        {warrenDaPagina.map((warren, index) => (
          <div className="warren-item" key={index}>
            <img src={warren.imagemUrl} alt={warren.titulo} className="warren-imagem" onError={(e) => { e.target.onerror = null; e.target.src = '/default-image.jpg'; }} />
            <div className="warren-detalhes">
              <h2>{warren.titulo}</h2>
              <p>Ano: {warren.ano}</p>
              <p>Diretor: {warren.diretor}</p>
              <a href={warren.trailerUrl} target="_blank" rel="noopener noreferrer" className="trailer-link">Assistir Trailer</a>
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

export default Warren;
