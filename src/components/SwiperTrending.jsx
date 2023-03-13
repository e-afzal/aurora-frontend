import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const TrendingSwiper = () => {
  const images = [
    {
      url: "/collections/savannah",
      imageUrl: "/images/homepage/trending/savannah_butterfly_ring-model_resized.png",
      alt: "Model Wearing Savannah Butterfly Ring",
      name: "savannah"
    },
    {
      url: "/collections/sevilla",
      imageUrl: "/images/homepage/trending/sevilla_ruby_fan_ring-model_resized.jpg",
      alt: "Model Wearing Sevilla Ruby Fan Ring",
      name: "sevilla"
    },
    {
      url: "/collections/aurora",
      imageUrl: "/images/homepage/trending/lapis_lazuli_chevron_ring-model_1_resized.png",
      alt: "Model Wearing Lapis Lazuli Chevron Ring and Mini Hoops",
      name: "aurora"
    },
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
  const [slides, setSlides] = useState(3);
  const [centeredSlide, setCenteredSlide] = useState(true);

  const updateIndex = (swiperInstance) => {
    if (swiperInstance === null) return;
    const currentSlide = swiperInstance?.activeIndex;
    setCurrentSlideIndex(currentSlide);
  };

  // Set items to show per row in grid
  useEffect(() => {
    if (window.innerWidth <= 1200) {
      setSlides(1.15);
    }
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={slides}
        centeredSlides={centeredSlide}
        speed={500}
        spaceBetween={15}
        initialSlide={currentSlideIndex}
        onActiveIndexChange={updateIndex}
      >

        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <a href={image.url}>
              <img
                src={image.imageUrl}
                alt={image.alt}
              />
              <p style={{ textTransform: "uppercase", fontSize: "17.5px", textAlign: "center" }}>{image.name}</p>
            </a>
          </SwiperSlide>
        ))}

      </Swiper>
    </>
  );
};

export default TrendingSwiper;
