import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper";

import "swiper/css";
import "swiper/css/thumbs";

const ProductGallery = ({ images, alt }) => {
  // store thumbs swiper instance
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [thumbSlides, setThumbSlides] = useState(3);


  // Set items to show per row in grid
  useEffect(() => {
    if (window.innerWidth >= 810) {
      setThumbSlides(5);
    }
  }, []);

  return (
    <>
      <Swiper
        style={{ width: "80%" }}
        slidesPerView={1}
        speed={1000}
        spaceBetween={5}
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
      >

        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={image.url}
              alt={alt}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <Swiper
          style={{ marginTop: "2.5rem", overflowY: "hidden", width: "80%" }}
          slidesPerView={thumbSlides}
          spaceBetween={5}
          modules={[Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src={image.url}
                alt={alt}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}


    </>
  );
};

export default ProductGallery;
