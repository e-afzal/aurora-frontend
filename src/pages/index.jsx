import { useState, useEffect } from 'react';
import '../styles/homeNew.css';
import axios from "axios";
import { Helmet } from "react-helmet";

// COMPONENT(S)
import Navbar from './../components/Navbar';
import SwiperHomeCarousel from '../components/SwiperHomeCarousel';
import TrendingSwiper from './../components/SwiperTrending';
import SwiperArrival from './../components/SwiperArrival';
import Footer from '../components/Footer';

const Home = () => {
  const [carouselHeight, setCarouselHeight] = useState("65rem");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (window.innerWidth < 900) {
      setCarouselHeight("45rem");
    }
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/arrivals`)
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => console.log(err.message));
  }, []);

  return (
    <>
      {/* SEO MARKUP */}
      <Helmet>
        <title>Aurora Jewelry</title>
        <meta name="description" content="Founded in Dubai 2019, Aurora Jewelry brings you nothing less than ordinary with its handmade timeless pieces." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Aurora Jewelry" />
        <meta property="og:description" content="Founded in Dubai 2019, Aurora Jewelry brings you nothing less than ordinary with its handmade timeless pieces." />
        <meta property="og:url" content="https://aurorajewelry.ae/" />
        <meta property="og:image" content="https://cdn.shopify.com/s/files/1/0595/9286/7976/files/aurora-logo.png?height=628&amp;pad_color=ffffff&amp;v=1663492389&amp;width=1200" />
      </Helmet>

      <Navbar />

      <section id="showcase" >
        <div className="showcase-carousel" style={{ height: carouselHeight, overflow: "none" }}>
          <SwiperHomeCarousel />
        </div>
      </section>

      <div className="overall-container">
        {/* SECTION: DREAM */}
        <section id="dream">
          <img
            src="./images/homepage/daria_ring_fabric.jpg"
            alt="daria ring fabric photo"
            className="dream-image"
          />
          <div className="dream-content">
            <h2 className="dream-title">a dream in the making</h2>
            <p className="dream-description">
              Welcome to the world of Aurora Jewelry, I am Haifa, the founder and
              designer behind the brand. I have always been drawn to the beauty and
              artistry of jewelry and after years of honing my skills I decided to
              turn my passion into a business.
            </p>
            <p className="dream-description">
              My children, especially my son who has autism, were my biggest
              motivators to follow my passion and bring Aurora Jewelry to life.
              Through this brand, I was able to reconnect with the world after
              feeling disconnected for a while.
            </p>
            <p className="dream-description">
              Aurora Jewelry is much more than a store, it’s a manifestation of my
              passion. Designing each piece of jewelry is a joy and a source of
              pride of me. I believe that jewelry should not only be beautiful but
              also meaningful. I pour my character, creativity and individuality
              into each piece, with the goal of inspiring others to express their
              own style through the jewelry they wear.
            </p>
            <p className="dream-description">
              Thank you for taking the time to learn about me and Aurora Jewelry. I
              am thrilled to share my passion and creations with you and I look
              forward to present more of my jewelry creations to you in the future.
            </p>
          </div>
        </section>

        {/* SECTION: TRENDING COLLECTIONS */}
        <section id="trending">
          <h2 class="trending-title">trending collections</h2>
          <div class="trending-image-container">
            <TrendingSwiper />
            {/* <img
              src="./images/homepage/collections/daria.webp"
              alt="daria ring and model"
              class="trending-image"
            /> */}
          </div>
          <a href="#" class="view-collections">view all collections</a>
        </section>

        {/* ARRIVAL SECTION REDESIGNED */}
        <section id="arrival">
          <h2 className="arrivals-title">new arrivals</h2>
          <div className="product-container">
            <SwiperArrival products={products} />
          </div>
        </section>
      </div>
      <Footer marginTop='5rem' />
    </>
  );
};

export default Home;