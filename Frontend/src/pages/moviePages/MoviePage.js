import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "use-http";
import "./MoviePage.css";
import "./MoviePageDesktop.css";
import { IoShareSocialSharp } from "react-icons/io5";
import { useCookies } from "react-cookie";
import { BsPencilFill } from "react-icons/bs";
import {
  FaRegStar,
  FaCheck,
  FaRegHeart,
  FaRegBookmark,
  FaStar,
} from "react-icons/fa";
import { movies } from "../../mocks/dummyData";
import GetData from "../GetMovieData";

const MoviePage = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const [hoveredStarIndex, setHoveredStarIndex] = useState(-1);
  const [rating, setRating] = useState(0);
  // const [notes, setNotes] = useState(Array(5).fill(""));
  const [comment, setComment] = useState("");
  const [cookies] = useCookies(["user"]);
  const [rated, setRated] = useState(false);

  const [userAval, setUserAval] = useState({});

  // console.log(movieId);
  const movies = GetData("filmes");

  const findMovieById = (movies, id) => {
    return movies.find((movie) => movie.id === parseInt(id));
  };

  useEffect(() => {
    if (movies) {
      const movie = findMovieById(movies, movieId);
      if (movie) {
        setMovieInfo(movie);
      }
    }
  }, [movieId, movies]);

  const handleStarHover = (index) => {
    setHoveredStarIndex(index);
  };

  const handleStarClick = (index) => {
    if (!cookies.user) {
      window.location.href = "/login";
    } else {
      const newRating = index + 1;
      setRating(newRating);
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  // useEffect(() => {
  //   console.log(userAval);
  //   if (userAval) {
  //     PostAvaliacao();
  //   }
  // }, [userAval]);

  const baseURLPost = "http://localhost:8080/avaliacoes";
  const { post, response } = useFetch(baseURLPost);
  const HandleEvaluate = async () => {
    if (rating === 0 || comment === "") {
      alert("Você não deu uma nota à obra.");
    } else {
      setUserAval({
        obra: movieInfo.titulo,
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      HandleEvaluate();
    }
  };

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div>
      {movieInfo ? (
        <>
          <main>
            <div className="single-movie-content">
              <div className="movie-container">
                <div className="moviePoster">
                  {/* <img src={movieInfo.imagem} alt="Movie Poster" /> */}
                </div>
                <div className="movieDesc">
                  <h1>{movieInfo.titulo}</h1>
                  {/* <p className="text">{movieInfo.descricao}</p> */}
                  <p className="text">{movieInfo.diretor}</p>
                  {/* <p className="text">{movieInfo.genero}</p> */}
                  <p className="text">
                    {movieInfo.pais}, {movieInfo.anoLancamento}
                  </p>
                </div>
              </div>

              <div className="rating-container">
                <div className="movieRating">
                  <div className="r1">
                    <div className="rr1">
                      {/* <div>
                        <div id="icons">
                          <FaCheck />
                        </div>
                        <div>Já assisti</div>
                      </div>
                      <div>
                        <div id="icons">
                          <FaRegHeart />
                        </div>
                        <div>Curtir</div>
                      </div>

                      ASSISTIR DEPOIS PODE SE TORNAR UMA FEATURE FUTURA

                      <div>
                        <div id="icons">
                          <FaRegBookmark />
                        </div>
                        <div>Assistir Depois</div>
                      </div> 
                    <hr />*/}
                    </div>
                    <div className="rr2">
                      <div>Deixe um comentário</div>
                      {/* <div>Avalie</div> */}
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
                      {/* <hr /> */}
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
                      {/* <div>
                        <BsPencilFill size={40} />
                      </div> */}
                    </div>
                    {/* <hr />
                    <div className="rr3">
                      <div>Compartilhe</div>
                      <div>
                        <IoShareSocialSharp size={40} />
                      </div>
                    </div> */}
                  </div>
                </div>
                {/* <div className="button-container">
                  <button className="custom-btn">Botão 1</button>
                  <button className="custom-btn">Botão 2</button>
                  <button className="custom-btn">Botão 3</button>
                </div> */}
              </div>
            </div>
          </main>
          <h1 className="elenco">Elenco</h1>
          <p>{movieInfo.elenco}</p>
          <hr />
        </>
      ) : (
        <p style={{ color: "white" }}>Carregando...</p>
      )}
    </div>
  );
};

export default MoviePage;
