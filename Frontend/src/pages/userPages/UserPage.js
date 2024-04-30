import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./userPage.css";
import { useCookies } from "react-cookie";
import { usuarios } from "../../mocks/dummyData";
import { useFetch } from "use-http";

const UserPage = () => {
  const { userId } = useParams();
  const [cookies] = useCookies(["user"]);

  console.log(userId);

  const userVer = cookies.user;
  const user = usuarios.find((user) => user.username === userId);
  const profileLog = userVer && userVer.username === userId;

  const [popupVisible, setPopupVisible] = useState(false);
  const [editing, setEditing] = useState(false); // State for tracking edit mode
  const [newAvatar, setNewAvatar] = useState(null); // State to hold new avatar image

  const userData = {
    followers: 100,
    reviews: 50,
    favorites: 20,
  };

  const baseURL = "http://localhost:8080/avaliacoes";
  const { get, response } = useFetch(baseURL);
  const [aval, setAval] = useState([]);

  const buscar = async () => {
    try {
      const resp = await get();
      console.log("Response:", resp);
      if (response.ok) {
        const filteredData = resp.filter(
          (item) => item.user_id.nome === userId
        );
        setAval(filteredData);
      } else {
        console.error("Response OK:", response);
        setAval([]);
      }
    } catch (error) {
      console.error("Error:", error);
      setAval([]);
    }
  };
  useEffect(() => {
    buscar();
  }, []);

  // userAval.preventDefault();
  // const body = {};
  //   axios
  //     .post(baseURL, body)
  //     .then(() => alert("Usuário adicionado com sucesso."))
  //     .catch((error) => console.log(error.response.data));
  // };

  // Function to handle editing mode toggle
  const toggleEditing = () => {
    setEditing(!editing);
  };

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setNewAvatar(file);
  };

  // JSX for user info
  const userInfo = editing ? (
    <form>
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      <input type="username" placeholder="Novo usuário" />
      <input type="password" placeholder="Nova Senha" />
    </form>
  ) : (
    <>
      <img src={user.avatar} alt="User Avatar" className="user-avatar" />
      <h1>{userId}</h1>
    </>
  );

  const profileButtons = profileLog ? (
    editing ? (
      <div className="edit-profile-button">
        <button onClick={toggleEditing}>Cancelar</button>
        <button>Salvar</button>
      </div>
    ) : (
      <div className="edit-profile-button">
        <button onClick={toggleEditing}>Editar Perfil</button>
      </div>
    )
  ) : null;

  return (
    <>
      <div className="user-info-container">{userInfo}</div>
      <div className="user-data-container">
        <div className="user-data">
          <h2 className="above-followers">{userData.followers}</h2>
          <p>Seguidores</p>
        </div>
        <div className="user-data">
          <h2 className="above-reviews">{userData.reviews}</h2>
          <p>Avaliações</p>
        </div>
        <div className="user-data">
          <h2 className="above-favorites">{userData.favorites}</h2>
          <p>Favoritos</p>
        </div>
      </div>
      {profileButtons}
      {/* Seção de Filmes Avaliados */}
      <div className="section">
        <h2>Filmes Avaliados</h2>
        <div className="cards-container">
          {/*
          {moviesReviewed.map((movie, index) => (
            <div className="card" key={index}>
              <div className="placeholder"></div>
              <div className="comment">{movie.comment}</div>{" "}
            </div>
          ))} */}
          {/* <button onClick={GetAvaliacao}> clique </button> */}
        </div>
        <div className="movies-info">
          <div className="mudar_variavel_pf">
            {aval.map((movie, index) => (
              <div className="socorro" key={index}>
                <h3>{movie.obra}</h3> {/* Nome do filme */}
                <p>Nota: {movie.nota}</p> {/* Nota do filme */}
                <p>Avaliação: {movie.texto}</p> {/* Nota do filme */}
                <p>Likes: {movie.numero_likes}</p> {/* Nota do filme */}
                {movie.user_id.nome === userId ? "" : <p>dar like</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Seção de Séries Avaliadas */}
      {/* Seção de Livros Avaliados */}
    </>
  );
};

export default UserPage;
