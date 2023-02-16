import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SwiperCategory = ({ categories }) => {
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
        spaceBetween={20}
        // loop={true}
        speed={1000}
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index} style={{ borderRadius: "7px", height: "50%", marginLeft: "1rem", paddingBlock: "1rem" }}>
            <a href={`/products/category/${category.name}`} className="carousel-item-link">
              <img
                className="carousel-item-image"
                src="/images/homepage/daria_coral-tinified.jpg"
                alt="Carousel item image test"
              />
              <p className="carousel-item-title">{category.name}</p>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperCategory;
