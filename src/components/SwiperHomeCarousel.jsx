import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";

import { Autoplay, EffectFade } from "swiper";

const SwiperHomeCarousel = () => {
  const [carouselHeight, setCarouselHeight] = useState("70rem");

  useEffect(() => {
    if (window.innerWidth < "900px") {
      setCarouselHeight("50rem");
    }
  }, []);
  return (
    <>
      <Swiper
        style={{ width: "100%", height: "100%" }}
        slidesPerView={1}
        effect={"fade"}
        // fadeEffect={{ crossFade: true }}
        // autoplay={{ delay: 5000, disableOnInteraction: true }}
        loop={true}
        modules={[Autoplay, EffectFade]}
        speed={1000}
      >
        <SwiperSlide style={{ width: "100vw", height: "100%", }}>
          <img
            style={{ width: "100vw", height: "100%", objectFit: "cover", objectPosition: "bottom left" }}
            src="/images/homepage/carousel/1.jpg"
            alt="Product image 1"
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100vw", height: "100%", }}>
          <img
            style={{ width: "100vw", height: "100%", objectFit: "cover", objectPosition: "center center" }}
            src="/images/homepage/carousel/2.jpg"
            alt="Product image 2"
          />
        </SwiperSlide>
        <SwiperSlide style={{ width: "100vw", height: "100%", }}>
          <img
            style={{ width: "100vw", height: "100%", objectFit: "cover", objectPosition: "center right" }}
            src="/images/homepage/carousel/3.jpg"
            alt="Product image 3"
          />
        </SwiperSlide>
      </Swiper>

    </>
  );
};

export default SwiperHomeCarousel;
