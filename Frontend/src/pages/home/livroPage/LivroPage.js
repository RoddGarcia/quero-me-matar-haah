import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import "../moviePages/MoviePage.css";
// import "../moviePages/MoviePageDesktop.css";
import { FaStar } from "react-icons/fa";
import useFetch from "use-http";
import { books } from "../../../mocks/dummyData";
import GetData from "../../GetMovieData";
import { useCookies } from "react-cookie";

const LivroPage = () => {
  const { livroId } = useParams();
  const [livroInfo, setLivroInfo] = useState(null);
  const [rating, setRating] = useState(0);
  const [cookies] = useCookies(["user"]);
  const [userAval, setUserAval] = useState({});
  const [comment, setComment] = useState("");

  const livros = GetData("livros");

  useEffect(() => {
    const serie = livros.find((livro) => serie.id === parseInt(livroId));
    if (serie) {
      setLivroInfo(serie);
    }
  }, [livroId]);

  useEffect(() => {
    const livro = books.find((livro) => livro.id === livroId);
    if (livro) {
      setLivroInfo(livro);
      console.log(livroInfo);
    }
  }, [livroId]);

  const baseURLPost =
    "http://ec2-15-229-232-244.sa-east-1.compute.amazonaws.com:25000/avaliacoes";
  const { post, response } = useFetch(baseURLPost);
  const HandleEvaluate = async () => {
    if (rating === 0 || comment === "") {
      alert("Você não deu uma nota à obra.");
    } else {
      setUserAval({
        obra: livroInfo.titulo,
        nota: rating,
        texto: comment,
        user_id: { id: cookies.user.id },
      });

      // console.log("ID do user:", cookies.user.id);
      // console.log("Nome da obra:" + movieInfo.titulo);
      // console.log("Nota:", rating);
      // console.log("Comentário:", comment);

      console.log(userAval);
      try {
        const result = await post("", userAval);
        if (response.ok) {
          console.log("Avaliação enviada com sucesso:", result);
          window.location.reload();
        } else {
          console.error("Erro ao enviar avaliação:", response.data);
        }
      } catch (error) {
        console.error("Erro ao enviar avaliação:", error);
      }
    }
  };

  return (
    <div>
      {livroInfo ? (
        <>
          <main>
            <div className="single-movie-content">
              <div className="movie-container">
                <div className="moviePoster">
                  <img src={livroInfo.imagem} alt="Capa do Livro" />
                </div>
                <div className="movieDesc">
                  <h1>{livroInfo.titulo}</h1>
                  <p className="text">Autor: {livroInfo.autor}</p>
                  <p className="text">Gênero: {livroInfo.genero}</p>
                  <p className="text">Editora: {livroInfo.editora}</p>
                  <p className="text">País: {livroInfo.pais}</p>
                  <p className="text">
                    Ano de Lançamento: {livroInfo.anoLancamento}
                  </p>
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default LivroPage;
