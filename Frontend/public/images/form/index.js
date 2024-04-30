import React, { useState } from "react";
import axios from "axios";

export function Form() {
  const [formData, setFormData] = useState({
    titulo: "",
    diretor: "",
    elenco: "",
    pais: "",
    anoLancamento: "",
    media: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("http://localhost:8080/filmes", formData);
  //     alert("Filme adicionado com sucesso!");
  //     // Limpar os campos do formulário após o envio bem-sucedido
  //     setFormData({
  //       titulo: "",
  //       diretor: "",
  //       elenco: "",
  //       pais: "",
  //       anoLancamento: "",
  //       media: 0,
  //     });
  //   } catch (error) {
  //     console.error("Erro ao adicionar filme:", error);
  //     alert("Ocorreu um erro ao adicionar o filme.");
  //   }
  // };

  return (
    <div className="form-container">
      <h1>Adicionar Novo Filme</h1>
      <form>
        <label>Título:</label>
        <input
          type="text"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />
        <label>Diretor:</label>
        <input
          type="text"
          name="diretor"
          value={formData.diretor}
          onChange={handleChange}
          required
        />
        <label>Elenco:</label>
        <input
          type="text"
          name="elenco"
          value={formData.elenco}
          onChange={handleChange}
          required
        />
        <label>País:</label>
        <input
          type="text"
          name="pais"
          value={formData.pais}
          onChange={handleChange}
          required
        />
        <label>Ano de Lançamento:</label>
        <input
          type="date"
          name="anoLancamento"
          value={formData.anoLancamento}
          onChange={handleChange}
          required
        />
        <label>Média:</label>
        <input
          type="number"
          name="media"
          value={formData.media}
          onChange={handleChange}
          required
        />
        <button type="submit">Adicionar Filme</button>
      </form>
    </div>
  );
}
