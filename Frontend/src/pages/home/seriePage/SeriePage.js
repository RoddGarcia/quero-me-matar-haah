import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../moviePages/MoviePage.css";
import "../moviePages/MoviePageDesktop.css";
import useFetch from "use-http";
import { FaStar } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { series } from "../../../mocks/dummyData";

const SeriePage = () => {
  const { serieId } = useParams();
  const [serieInfo, setSerieInfo] = useState(null);
  const [hoveredStarIndex, setHoveredStarIndex] = useState(-1);
  const [rating, setRating] = useState(0);
  const [cookies] = useCookies(["user"]);
  const [userAval, setUserAval] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    const serie = series.find((serie) => serie.id === parseInt(serieId));
    if (serie) {
      setSerieInfo(serie);
    }
  }, [serieId]);

  const handleStarHover = (index) => {
    setHoveredStarIndex(index);
  };

  const baseURLPost = "http://localhost:8080/avaliacoes";
  const { post, response } = useFetch(baseURLPost);
  const HandleEvaluate = async () => {
    if (rating === 0 || comment === "") {
      alert("Você não deu uma nota à obra.");
    } else {
      setUserAval({
        obra: serieInfo.titulo,
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

  const handleStarClick = (index) => {
    const newRating = index + 1;
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      HandleEvaluate();
    }
  };

  return (
    <div>
      {serieInfo ? (
        <>
          <main>
            <div className="single-movie-content">
              <div className="movie-container">
                <div className="moviePoster">
                  <img src={serieInfo.imagem} alt="Serie Poster" />
                </div>
                <div className="movieDesc">
                  <h1>{serieInfo.titulo}</h1>
                  <p className="text">{serieInfo.descricao}</p>
                  <p className="text">{serieInfo.diretor}</p>
                  <p className="text">{serieInfo.genero}</p>
                  <p className="text">
                    {serieInfo.pais}, {serieInfo.ano_lancamento}
                  </p>
                </div>
              </div>

              <div className="rating-container">
                <div className="movieRating">
                  <div className="r1">
                    <div className="rr2">
                      <div className="Stars">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            size={40}
                            onMouseEnter={() => handleStarHover(index)}
                            onMouseLeave={() => handleStarHover(-1)}
                            onClick={() => handleStarClick(index)}
                            color={
                              index <= hoveredStarIndex ? "#ffc107" : "#e4e5e9"
                            }
                            style={{ cursor: "pointer" }}
                          />
                        ))}
                        <p>Nota: {rating}</p>
                      </div>
                      <textarea
                        name="postContent"
                        rows={4}
                        cols={40}
                        value={comment}
                        onChange={handleCommentChange}
                        onKeyPress={handleKeyPress}
                        style={{ resize: "none" }}
                        maxLength={128}
                      />
                      <button onClick={() => HandleEvaluate()}>Avaliar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <h1 className="elenco">Elenco</h1>
          <p>
            {serieInfo.elenco &&
              serieInfo.elenco.map((ator, index) => (
                <span key={index}>
                  {ator}
                  {index === serieInfo.elenco.length - 1 ? "." : ", "}
                </span>
              ))}
          </p>
          <hr />
        </>
      ) : (
        <p style={{ color: "white" }}>Carregando...</p>
      )}
    </div>
  );
};

export default SeriePage;
