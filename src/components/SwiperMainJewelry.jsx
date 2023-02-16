import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SwiperMainJewelry = ({ mainJewelry }) => {
  const [slides, setSlides] = useState(4);

  useEffect(() => {
    // Set # of pictures shown in carousel
    if (window.innerWidth < 1100) {
      setSlides(3);
    }

    if (window.innerWidth < 790) {
      setSlides(1);
    }
  }, []);

  return (
    <>
      <Swiper
        style={{ width: "100%", height: "100%" }}
        slidesPerView={slides}
        spaceBetween={5}
        // loop={true}
        speed={1000}
      >
        {mainJewelry.collections.map((collection, index) => (
          <SwiperSlide key={index} style={{ borderRadius: "7px", height: "50%", marginLeft: "1rem", paddingBlock: "1rem" }}>
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
