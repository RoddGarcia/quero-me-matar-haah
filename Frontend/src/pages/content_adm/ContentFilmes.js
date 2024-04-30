import { IoMdAddCircleOutline } from "react-icons/io";
import { useEffect } from "react";
import React, { useState } from "react";
import useFetch from "use-http";
import { AiFillMessage } from "react-icons/ai";
import { FaRegTrashAlt, FaEdit, FaSave } from "react-icons/fa";

const ContentFilmes = () => {
  const baseURL =
    "http://ec2-15-229-232-244.sa-east-1.compute.amazonaws.com:25000/filmes";
  const { get, response, del, put, error, loading } = useFetch(baseURL);
  const [novoItem, setNovoItem] = useState();
  const [movies, setMovies] = useState([]);
  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [diretor, setDiretor] = useState("");
  const [anoLancamento, setAnoLancamento] = useState("");
  const [elenco, setElenco] = useState("");
  const [pais, setPais] = useState("");
  const [genero, setGenero] = useState("");
  const [editandoItem, setEditandoItem] = useState(null);

  function gerarUUID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-4" +
      s4().substr(0, 3) +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }

  const uuid = gerarUUID();

  const buscar = async () => {
    const resp = await get();

    if (response.ok) {
      setMovies(resp);
    } else {
      setMovies([]);
    }
  };

  const cancelarEdicao = () => {};

  const salvarEdicao = () => {};

  const removerItem = () => {};

  const editarItem = () => {};

  useEffect(() => {
    buscar();
  }, []);

  return (
    <>
      <div className="create-item">
        <div className="inputNovoItem">
          <input
            type="text"
            name="titulo"
            placeholder="Titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <input
            type="text"
            name="ano"
            placeholder="Ano de Lançamento"
            value={anoLancamento}
            onChange={(e) => setAnoLancamento(e.target.value)}
            required
          />
          <input
            type="text"
            name="elenco"
            placeholder="Elenco"
            value={elenco}
            onChange={(e) => setElenco(e.target.value)}
            required
          />
          <input
            type="text"
            name="pais"
            placeholder="País"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            required
          />
          <input
            type="text"
            name="diretor"
            placeholder="Diretor"
            value={diretor}
            onChange={(e) => setDiretor(e.target.value)}
            required
          />
          <input
            type="text"
            name="genero"
            placeholder="Gênero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          />
          <input
            type="text"
            name="description"
            value={uuid}
            placeholder="Descrição"
            required
          />
        </div>

        <div className="img-side">
          <img alt="imagem" />
          <input type="file" accept=".jpg" required />
          <button>Enviar</button>
        </div>
      </div>

      {/* <button className="add-btn" onClick={adicionarItem}>
        <IoMdAddCircleOutline color="white" size={22} />
      </button> */}
      <table className="tabela-conteudo">
        <thead>
          <tr>
            <th>Título</th>
            <th>Ano</th>
            <th>Diretor</th>
            <th>Elenco</th>
          </tr>
        </thead>
        {movies.map((m, index) => (
          <tr key={m.id}>
            <td>{m.titulo}</td>
            <td>{m.anoLancamento}</td>
            <td>{m.diretor}</td>
            <td className="act-bottons">
              {editandoItem === index ? (
                <>
                  {/* passar o id pelo parametro */}
                  <button onClick={() => salvarEdicao()}>
                    <FaSave />
                  </button>
                  <button onClick={() => cancelarEdicao()}>Cancelar</button>
                </>
              ) : (
                <>
                  {/* passar o id pelo parametro */}
                  <button onClick={() => removerItem()}>
                    <FaRegTrashAlt />
                  </button>
                  {/* passar o id pelo parametro */}
                  <button onClick={() => editarItem()}>
                    <FaEdit />
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};
export default ContentFilmes;
