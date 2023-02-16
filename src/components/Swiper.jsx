import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper";

import "swiper/css";
import "swiper/css/thumbs";

const ProductGallery = ({ images, alt }) => {
  // store thumbs swiper instance
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
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
        style={{ width: "80%" }}
        slidesPerView={1}
        speed={1000}
        spaceBetween={5}
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
      >

        {images.map(image => (
          <SwiperSlide>
            <img
              style={{ width: "100%", height: "100%" }}
              src={image.url}
              alt={alt}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 && (
        <Swiper
          style={{ width: "80%", marginTop: "2.5rem", overflowY: "hidden" }}
          slidesPerView={slides}
          spaceBetween={5}
          modules={[Thumbs]}
          watchSlidesProgress
          onSwiper={setThumbsSwiper}
        >
          {images.map(image => (
            <SwiperSlide>
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
