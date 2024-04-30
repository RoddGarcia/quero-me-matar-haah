import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import MenuMobile from "./MenuMobile";
import { FaSearch } from "react-icons/fa";
import { useCookies } from "react-cookie";

const Header = () => {
  const menuOptions = ["Filmes", "Séries", "Livros", "Gerenciar"];
  const [cookies, , removeCookie] = useCookies(["user"]);
  const [sValue, setSValue] = useState();

  const handleLogout = () => {
    removeCookie("user");
    window.location.href = "/";
  };

  const handleCloseMenu = () => {
    console.log("Menu fechado");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      window.location.href = `/pesquisa/${sValue}`;
    }
  };

  return (
    <header>
      <div className="container navbar">
        <nav className="navbar">
          <div className="nav_left">
            <MenuMobile
              options={menuOptions}
              onClose={handleCloseMenu}
              cookies={cookies}
            />

            <Link to="/" className="logo">
              <img src={logo} alt="logo" />
            </Link>
            <ul className="navbar">
              <div className="menuOptions">
                <Link to="/filmes">Filmes</Link>
                <Link to="/series">Séries</Link>
                <Link to="/livros">Livros</Link>
                {cookies.user &&
                  cookies.user.username.toUpperCase() === "ADMIN" && (
                    <Link className="adm_access" to="/pages/Gerenciar">
                      Gerenciar
                    </Link>
                  )}
              </div>
            </ul>
          </div>
          <div className="nav_right">
            <form className="search">
              <input
                id="txtSearch"
                type="text"
                value={sValue}
                onChange={(e) => {
                  setSValue(e.target.value);
                }}
                onKeyPress={handleKeyPress}
                placeholder="Procurar"
              ></input>
            </form>
            <FaSearch className="mobileSearch" size={30} />
            {cookies.user ? (
              <div className="user-info">
                <Link to={"/user/" + cookies.user.username}>
                  <img src={cookies.user.avatar} alt="user" />
                </Link>
                <Link
                  className="user-name"
                  to={"/user/" + cookies.user.username}
                >
                  {cookies.user.username}
                </Link>
                <button className="login" onClick={handleLogout}>
                  Deslogar
                </button>
              </div>
            ) : (
              <div className="login-btn">
                <button className="login">
                  <Link to="/login">Login</Link>
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
