// Popular.js
import React, { useState } from "react";
import { PopularCard } from "./PopularCard";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const PopularSeries = ({ items, title }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleAfterChange = (currentSlide) => {
    setCurrentSlide(currentSlide);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    afterChange: handleAfterChange,
  };

  return (
    <>
      <div className="container">
        <div className="header navbar">
          <h1>{title}</h1>
          <Link to="/series">Ver Todos</Link>
        </div>
        <div className="content">
          <Slider {...settings}>
            {items.map((item) => (
              <div className="popular-card-wrapper" key={item.id}>
                <PopularCard item={item} tipo={"serie"} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};
