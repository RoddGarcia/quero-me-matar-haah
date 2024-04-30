import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { series, books } from "../../mocks/dummyData";
import { Link } from "react-router-dom";
import "./filmes.css";
import GetMovieData from "../GetMovieData";

const Obras = ({ tipo }) => {
  const [lookUp, setLookUp] = useState([]);

  const movies = GetMovieData();
  useEffect(() => {
    if (tipo === "filmes") {
      setLookUp(movies);
    } else if (tipo === "series") {
      setLookUp(series);
    } else if (tipo === "livros") {
      setLookUp(books);
    }
  }, [tipo]);

  return (
    <>
      <h1 className="viewall-page-title">
        {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
      </h1>
      <div className="movie-grid">
        {lookUp.map((e) => (
          <Link
            to={`/${tipo.toLowerCase()}/${e.id}`}
            className="MovieBox"
            key={e.id}
            style={{ background: "transparent" }}
          >
            <div className="img">
              {/* <img src={e.imagem} alt={e.titulo} /> */}
            </div>
            <div className="text">
              <h3>{e.titulo}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Obras;
