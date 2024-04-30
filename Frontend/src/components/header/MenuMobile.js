import React, { useState } from "react";
import "./MenuMobile.css";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const MenuMobile = ({ options, onClose, cookies }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    // Lógica para lidar com a seleção da opção
    console.log(`Você selecionou: ${option}`);
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-btn" onClick={handleToggleMenu}>
        ☰
      </button>
      {isOpen && (
        <div className="menu-options">
          <IoMdClose className="close-btn" onClick={handleToggleMenu} />

          {options.map(
            (option, index) =>
              (option !== "Gerenciar" ||
                (cookies.user &&
                  cookies.user.username.toUpperCase() === "ADMIN")) && (
                <Link
                  to={`/pages/${option}`}
                  key={index}
                  className="menu-option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </Link>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default MenuMobile;
