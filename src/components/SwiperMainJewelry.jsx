import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SwiperMainJewelry = ({ mainJewelry }) => {
  const [slides, setSlides] = useState(4);
  const [centeredSlides, setCenteredSlides] = useState(true);
  const [slideHeight, setSlideHeight] = useState("50%");

  useEffect(() => {
    // Set # of pictures shown in carousel
    if (window.innerWidth >= 360) {
      setSlides(2);
      setSlideHeight("100%");
    }
    if (window.innerWidth >= 810) {
      setSlides(3);
      setCenteredSlides(false);
    }
    if (window.innerWidth >= 1280) {
      setSlides(4);
    }
  }, []);

  return (
    <>
      <Swiper
        style={{ width: "100%", height: "max-content" }}
        slidesPerView={slides}
        spaceBetween={5}
        speed={1000}
        centeredSlides={centeredSlides}
      >
        {mainJewelry.collections.map((collection, index) => (
          <SwiperSlide key={index} style={{
            borderRadius: "7px",
            height: slideHeight,
            marginLeft: "1rem",
            paddingBlock: "1rem"
          }}>
            <a href={`/collections/${collection.name}`} className="carousel-item-link">
              <img
                className="carousel-item-image"
                src="/images/homepage/daria_coral-tinified.jpg"
                alt="Carousel item image test"
              />
              <p className="carousel-item-title">{collection.name}</p>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperMainJewelry;
