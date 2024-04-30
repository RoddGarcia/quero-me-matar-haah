import React, { useState } from "react";
import "./Cadastrouser.css"; // Importe o arquivo de estilo correto
import { Link } from "react-router-dom";

const Cadastro = () => {
  // Defina os estados necessários para o formulário de cadastro
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Função para lidar com o envio do formulário de cadastro
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar lógica para lidar com o envio do formulário, como enviar os dados para um servidor
    console.log("Formulário de cadastro enviado!");
  };

  return (
    <main className="cadastro-container">
      <div className="cadastro-header">
        <h1 className="cadastro-title">Cadastre-se</h1>
        <p className="cadastro-description">Crie uma nova conta.</p>
      </div>
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="username" className="visually-hidden">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email" className="visually-hidden">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password" className="visually-hidden">
            Senha
          </label>
          <input
            type="password"
            placeholder="Senha"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="cadastro-button">
          Cadastrar
        </button>
      </form>
      <p className="login-text">
        Já tem uma conta? Faça <Link to="/login">login</Link>.
      </p>
    </main>
  );
};

export default Cadastro;
