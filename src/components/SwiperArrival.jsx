import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SwiperArrival = ({ products }) => {
  const [slides, setSlides] = useState(4);

  return (
    <>
      <Swiper
        style={{ width: "100%", height: "max-content" }}
        slidesPerView={slides}
        spaceBetween={20}
        speed={1000}
        loop={true}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index} style={{ borderRadius: "7px", height: "50%", marginLeft: "1rem", paddingBlock: "1rem" }}>
            <a href={`/products/${product.product_id}`} className="carousel-item-link">
              <img
                className="carousel-item-image"
                src={product.product_images.values[0].url}
                alt={product.product_title}
              />
              <p className="carousel-item-title">{product.product_title}</p>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperArrival;
