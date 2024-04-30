import React, { useState } from "react";
import { HomeCard } from "./HomeCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetch from "use-http";

export const Carousel = ({ items }) => {
  // console.log(items);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filmes, setFilmes] = useState([]);

  const handleAfterChange = (currentSlide) => {
    setCurrentSlide(currentSlide);
  };

  const customPaging = (i) => (
    <div
      style={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: currentSlide === i ? "#ffed00" : "#ededed", // Altera a cor dos dots se o slide atual for o mesmo que o índice
        marginLeft: "5px",
        marginTop: "-86px",
      }}
    />
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    customPaging: customPaging,
    appendDots: (dots) => (
      <ul style={{ margin: "0px", padding: "0px" }}>{dots}</ul>
    ),
    afterChange: handleAfterChange,
  };

  return (
    <div className="homeContainer">
      <Slider {...settings}>
        {items.map((item) => {
          return <HomeCard key={item.id} item={item} />;
        })}
      </Slider>
    </div>
  );
};
