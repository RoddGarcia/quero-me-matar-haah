import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import { HomePage } from "./pages/home";
import MoviePage from "./pages/moviePages/MoviePage";
import UserPage from "./pages/userPages/UserPage";
import ContentAdm from "./pages/content_adm/ContentAdm";
import Login from "./pages/loginPage/Login";
import Cadastro from "./pages/loginPage/Cadastro";
import Obras from "./pages/fullContent/Obras";
import Pesquisa from "./pages/fullContent/Pesquisa";
import SeriePage from "./pages/seriePage/SeriePage";
import LivroPage from "./pages/home/livroPage/LivroPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <HomePage />
        </Layout>
      ),
    },
    {
      path: "/filmes/:movieId",
      element: (
        <Layout>
          <MoviePage />
        </Layout>
      ),
    },
    {
      path: "*",
      element: (
        <Layout>
          {/* <ErrorPage /> */}
          <div className="error">
            <img src="../images/error.gif" />
            <h1 style={{ color: "white" }}>Ops, página não encontrada!</h1>
          </div>
        </Layout>
      ),
    },
    {
      path: "/pages/Gerenciar",
      element: (
        <Layout>
          <ContentAdm />
        </Layout>
      ),
    },
    {
      path: "/login",
      element: (
        <Layout>
          <Login />
        </Layout>
      ),
    },
    {
      path: "/user/:userId",
      element: (
        <Layout>
          <UserPage />
        </Layout>
      ),
    },
    {
      path: "/filmes",
      element: (
        <Layout>
          <Obras tipo={"filmes"} />
        </Layout>
      ),
    },
    {
      path: "/series",
      element: (
        <Layout>
          <Obras tipo={"series"} />
        </Layout>
      ),
    },
    {
      path: "/livros",
      element: (
        <Layout>
          <Obras tipo={"livros"} />
        </Layout>
      ),
    },
    {
      path: "/livros/:livrosId",
      element: (
        <Layout>
          <LivroPage />
        </Layout>
      ),
    },
    {
      path: "/pesquisa/:searchVar",
      element: (
        <Layout>
          <Pesquisa />
        </Layout>
      ),
    },
    {
      path: "/cadastro",
      element: (
        <Layout>
          <Cadastro />
        </Layout>
      ),
    },

    {
      path: "/serie/:serieId",
      element: (
        <Layout>
          <SeriePage />
        </Layout>
      ),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default App;
