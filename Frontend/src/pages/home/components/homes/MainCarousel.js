import React, { useState, useEffect } from "react";
import { Carousel } from "./Carousel";
import "./home.css";
import useFetch from "use-http";

// import useFetch from "use-http";
import { homeData } from "../../../../mocks/dummyData";
import { books } from "../../../../mocks/dummyData";
import { series } from "../../../../mocks/dummyData";
import { movies } from "../../../../mocks/dummyData";
// import axios from "axios";

export const MainCarousel = () => {
  const [items, setItems] = useState(homeData);

  return (
    <>
      <section className="home">
        <Carousel items={homeData} />
      </section>
    </>
  );
};

export default MainCarousel;
