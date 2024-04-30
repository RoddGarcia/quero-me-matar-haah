// PopularCard.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const PopularCard = ({ item: { id, imagem, titulo }, tipo: tipo }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  console.log(tipo);
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <Link
        to={`/${tipo.toLowerCase()}/` + id}
        className="MovieBox"
        style={{ background: "transparent" }}
      >
        <div className="img">
          <img src={imagem} alt="" />
        </div>
        <div className="text">
          <h3>{titulo}</h3>
        </div>
      </Link>
      {/* 
      <Popup trigger={isPopupOpen} onClose={togglePopup}>
        <h1>asd</h1>
      </Popup> */}
    </>
  );
};
