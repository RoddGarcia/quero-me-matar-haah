import React, { useState, useEffect } from "react";
import "./Modal.css";
import { FiUsers } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { useCookies } from "react-cookie";

function Modal() {
  const [modal, setModal] = useState(false);
  const [cookies] = useCookies(["user"]);
  const [inputText, setInputText] = useState("");
  const [friendsList, setFriendsList] = useState([]);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    // Carrega a lista de amigos
    const fetchFriends = async () => {
      try {
        const response = await fetch("url");
        const data = await response.json();
        setFriendsList(data);
      } catch (error) {
        console.error("Erro ao carregar lista de amigos:", error);
      }
    };

    fetchFriends();
  }, []); // o array vazio é executado uma só vez.

  const inputHandler = (e) => {
    setInputText(e.target.value);
  };

  const filteredFriends = friendsList.filter((friend) =>
    friend.name.toLowerCase().includes(inputText.toLowerCase())
  );

  return (
    <>
      {/* Serve pra ver se está logado*/}
      {cookies.user && (
        <div className="btn-modal">
          <button className="btn-modal" onClick={toggleModal}>
            <FiUsers />
          </button>
        </div>
      )}

      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            <div className="search-header">
              <div className="heading">Procurar</div>
              <div className="search">
                <BsSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Nome do amigo"
                  value={inputText}
                  onChange={inputHandler}
                />
              </div>
            </div>
            <div className="friends-main">
              {filteredFriends.map((friend) => (
                <div className="friends-row" key={friend.id}>
                  <div className="friends-info">
                    <img src="#" alt="user" />
                    <span>{friend.name}</span>
                  </div>
                  <button className="follow">Follow</button>
                </div>
              ))}
            </div>
            <hr />
            <button className="close-modal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
