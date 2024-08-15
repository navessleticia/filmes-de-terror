import React, { useEffect, useState } from 'react';
import './FilmesLista.css';

function FilmeLista() {
  const [filmes, setFilmes] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const filmesPorPagina = 12;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchFilmes() {
      try {
        const response = await fetch('/filmes.json');
        if (!response.ok) {
          throw new Error('Erro ao carregar os filmes');
        }
        const data = await response.json();
        setFilmes(data.filmes);
        setTotalPages(Math.ceil(data.filmes.length / filmesPorPagina));
      } catch (error) {
        console.error('Erro ao carregar os filmes:', error);
      }
    }

    fetchFilmes();
  }, [filmesPorPagina]);

  const filmesDaPagina = filmes.slice(
    (paginaAtual - 1) * filmesPorPagina,
    paginaAtual * filmesPorPagina
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
      <div className="filme-lista">
        {filmesDaPagina.map((filme, index) => (
          <div className="filme-item" key={index}>
            <img src={filme.imagemUrl} alt={filme.titulo} className="filme-imagem" onError={(e) => { e.target.onerror = null; e.target.src = '/default-image.jpg'; }} />
            <div className="filme-detalhes">
              <h2>{filme.titulo}</h2>
              <p>Ano: {filme.ano}</p>
              <p>Diretor: {filme.diretor}</p>
              <a href={filme.trailerUrl} target="_blank" rel="noopener noreferrer" className="trailer-link">Assistir Trailer</a>
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

export default FilmeLista;
