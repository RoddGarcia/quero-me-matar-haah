import React from "react";
import { useParams } from "react-router-dom";
import { movies, series, books } from "../../mocks/dummyData";
import { Link } from "react-router-dom";

const Pesquisa = () => {
  const { searchVar } = useParams();

  // Filter movies based on the search variable
  const filteredMovies = movies.filter((movie) =>
    movie.titulo.toLowerCase().includes(searchVar.toLowerCase())
  );

  // Filter series based on the search variable
  const filteredSeries = series.filter((serie) =>
    serie.titulo.toLowerCase().includes(searchVar.toLowerCase())
  );

  // Filter books based on the search variable
  const filteredBooks = books.filter((book) =>
    book.titulo.toLowerCase().includes(searchVar.toLowerCase())
  );

  return (
    <>
      <h1>Pesquisa</h1>
      <h2>Filmes</h2>
      <div className="movie-grid">
        {filteredMovies.map((movie) => (
          <Link
            key={movie.id}
            to={`/filmes/${movie.id}`}
            className="MovieBox"
            style={{ background: "transparent" }}
          >
            <div className="img">
              <img src={movie.imagem} alt="" />
            </div>
            <div className="text">
              <h3>{movie.titulo}</h3>
            </div>
          </Link>
        ))}
      </div>
      <h2>Séries</h2>
      <div className="series-grid">
        {filteredSeries.map((serie) => (
          <Link
            key={serie.id}
            to={`/series/${serie.id}`}
            className="SerieBox"
            style={{ background: "transparent" }}
          >
            <div className="img">
              <img src={serie.imagem} alt="" />
            </div>
            <div className="text">
              <h3>{serie.titulo}</h3>
            </div>
          </Link>
        ))}
      </div>
      <h2>Livros</h2>
      <div className="books-grid">
        {filteredBooks.map((book) => (
          <Link
            key={book.id}
            to={`/livros/${book.id}`}
            className="BookBox"
            style={{ background: "transparent" }}
          >
            <div className="img">
              <img src={book.imagem} alt="" />
            </div>
            <div className="text">
              <h3>{book.titulo}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Pesquisa;
