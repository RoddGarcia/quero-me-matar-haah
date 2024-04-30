import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { usuarios } from "../../mocks/dummyData";
import { useCookies } from "react-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const [countdown, setCountdown] = useState(2 * 1000); // 2 seconds

  const handleLogin = () => {
    const user = usuarios.find((user) => user.username === username);
    if (user) {
      if (user.senha === password) {
        console.log("User logged in");
        setCookie("user", user, { path: "/" });
        window.location.href = "/";
      } else {
        alert("Senha está incorreta.");
      }
    } else {
      alert("Usuário não encontrado.");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <main className="login-container">
        <div className="login-header">
          <div className="header-background">
            <img
              src="./images/b0af5c7c-306f-4649-9f7a-cf72193ddedb.jpg"
              alt=""
              className="header-image"
            />
          </div>
          <section className="login-content">
            <div className="welcome-title">
              <h1 className="titleh1">Bem-vindo ao</h1>
              <h1 className="titleh2">Funwall</h1>
            </div>
            <div>
              <h1 className="login-title">Login</h1>
              <p className="login-description">Logue-se para continuar.</p>
              <form className="login-form">
                <div className="input-container">
                  <label htmlFor="username" className="visually-hidden">
                    Username
                  </label>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c31b1cb827ec0ad7347b7fa14fe88b9a9f7701caa0dc9d2f8047d91edd2d621b?apiKey=ddbbf2c8811841b7a7bdae69483fc81d&"
                    alt=""
                    className="input-icon"
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="password" className="visually-hidden">
                    Senha
                  </label>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7730f7bfcf8a555d95d1971cd358943fd2555464061a715e0632c0afb139b11?apiKey=ddbbf2c8811841b7a7bdae69483fc81d&"
                    alt=""
                    className="input-icon"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <a href="#" className="forgot-password">
                    Esqueceu sua senha?
                  </a>
                </div>
                <div className="act-buttons">
                  <Link to="/cadastro" className="login-button">
                    Cadastrar
                  </Link>

                  <a className="login-button" onClick={handleLogin}>
                    Login
                  </a>
                </div>
              </form>
              <p className="signup-text">
                Não tem conta? Por favor,{" "}
                <Link to="/cadastro" className="signup-link">
                  cadastre-se
                </Link>{" "}
                primeiro.
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Login;
