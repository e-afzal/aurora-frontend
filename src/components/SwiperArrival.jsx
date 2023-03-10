import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SwiperArrival = ({ products }) => {
  const [slides, setSlides] = useState(4);
  const [centeredSlides, setCenteredSlides] = useState(true);
  const [slideHeight, setSlideHeight] = useState("50%");

  useEffect(() => {
    if (window.innerWidth >= 360) {
      setSlides(1);
      setSlideHeight("100%");
    }
    if (window.innerWidth >= 600) {
      setSlides(2);
      setCenteredSlides(false);
    }
    if (window.innerWidth >= 810) {
      setSlides(3);
    }
    if (window.innerWidth >= 1366) {
      setSlides(4);
    }
    if (window.innerWidth >= 1600) {
      setSlides(5);
    }
  }, []);

  // CURRENCY LOCALIZATION Function
  function localize(amount) {
    return Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(amount);
  }

  return (
    <>
      <Swiper
        style={{
          width: "100%",
          height: "max-content"
          // height: "300px"
        }}
        slidesPerView={slides}
        spaceBetween={20}
        speed={1000}
        centeredSlides={centeredSlides}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index} style={{
            height: slideHeight,
            // marginLeft: "1rem", 
            paddingBlock: "1rem"
          }}>
            <a href={`/products/${product.product_id}`} className="carousel-item-link">
              <img
                className="carousel-item-image"
                src={product.product_images.values[0].url}
                alt={product.product_title}
              />
              <p className="carousel-item-title">{product.product_title}</p>
              <p className="carousel-item-title" style={{ marginTop: "-4px" }}>{localize(product.product_price)}</p>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperArrival;
