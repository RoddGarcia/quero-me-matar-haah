import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { homeData } from "../../mocks/dummyData";
import "./List.css";

export const List = () => {
  const [data, setData] = useState(null);
  const [showFilmes, setShowFilmes] = useState(true);
  const [reload, setReload] = useState(true);

  const removeItem = (id) => {
    if (window.confirm("Deseja remover o item?")) {
      setReload(!reload);
    }
  };

  useEffect(() => {
    setData(homeData);
  }, [showFilmes, reload]);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>{showFilmes ? "Lista de Filmes" : "Lista de Séries"}</h2>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Nome</td>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>

                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeItem(item.id)}
                      >
                        Remover {showFilmes ? "Filme" : "Série"}
                      </button>
                      <Link
                        to={
                          showFilmes
                            ? `/editfilme/${item.id}`
                            : `/editserie/${item.id}`
                        }
                        className="btn btn-success ml-2"
                      >
                        Editar {showFilmes ? "Filme" : "Série"}
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="card-footer">
          {showFilmes ? (
            <Link to="/addfilme" className="btn btn-primary">
              Adicionar Filme
            </Link>
          ) : (
            <Link to="/addserie" className="btn btn-primary">
              Adicionar Série
            </Link>
          )}
          <button
            className="btn btn-secondary ml-2"
            onClick={() => setShowFilmes(!showFilmes)}
          >
            {showFilmes ? "Ver Séries" : "Ver Filmes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default List;
