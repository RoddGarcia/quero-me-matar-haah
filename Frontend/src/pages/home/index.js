import { useState, useEffect } from "react";
// import { movies } from "../../mocks/dummyData"; // dummydata para filmes
import { books } from "../../mocks/dummyData";
import { series } from "../../mocks/dummyData";
import { MainCarousel } from "./components/homes/MainCarousel";
import { PopularFilmes } from "./popular/PopularFilmes";
import { PopularBooks } from "./popular/PopularBooks";
import { PopularSeries } from "./popular/PopularSeries";
import useFetch from "use-http";
import Modal from "../../components/modal/Modal";
import GetMovieData from "../GetMovieData";

export const HomePage = () => {
  const baseURLLivros =
    "http://ec2-15-229-232-244.sa-east-1.compute.amazonaws.com:25000/livros";
  const { get, response } = useFetch(baseURLLivros);
  // const [movies, setMovies] = useState([]);
  const [livros, setLivros] = useState([]);

  const buscarLivros = async () => {
    const resp = await get();
    if (response.ok) {
      setLivros(resp);
    } else {
      setLivros([]);
    }
  };
  useEffect(() => {
    buscarLivros();
  }, []);

  console.log(livros);

  //  API É CHAMADA AQUI APENAS PARA TESTE EM console.LOG
  // const baseURL = "http://localhost:8080/filmes";

  // const { get, response } = useFetch(baseURL);
  // const [filmes, setFilmes] = useState([]);

  // const buscar = async () => {
  //   const resp = await get();
  //   console.log(resp);
  //   if (response.ok) {
  //     setFilmes(resp);
  //   } else {
  //     setFilmes([]);
  //   }
  // };
  // useEffect(() => {
  //   buscar();
  //   console.log(filmes);
  // }, []);

  const movies = GetMovieData("filmes");
  const series = GetMovieData("series");

  return (
    <>
      <MainCarousel />
      <PopularFilmes items={movies} title="Filmes Populares" />
      <PopularSeries items={series} title="Séries Populares" />
      <PopularBooks items={livros} title="Livros Populares" />
      <Modal />
    </>
  );
};
