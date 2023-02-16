import { useState, useEffect } from 'react';
import '../styles/homeNew.css';
import axios from "axios";

// COMPONENT(S)
import Navbar from './../components/Navbar';
import SwiperHomeCarousel from '../components/SwiperHomeCarousel';
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
      <Navbar />

      <section id="showcase" >
        <div className="showcase-carousel" style={{ height: carouselHeight, overflow: "none" }}>
          <SwiperHomeCarousel />
        </div>
      </section>

      <div className="overall-container">
        {/* ABOUT THE BRAND */}
        <section id="brand">
          <div className="brand-grid">
            <div className="brand-gallery">
              <img
                src="/images/homepage/daria_ring_fabric.jpg"
                alt="daria ruby ring"
                className="brand-image-1"
              />
            </div>
            <div className="brand-content">
              <h2 className="brand-content-heading">A Dream in the Making</h2>
              <div className="brand-content-description">
                <p className="description-1">
                  Welcome to the world of Aurora Jewelry, I am Haifa, the founder
                  and designer behind the brand. I have always been drawn to the
                  beauty and artistry of jewelry and after years of honing my
                  skills I decided to turn my passion into a business.
                </p>
                <p className="description-2">
                  My children, especially my son who has autism, were my biggest
                  motivators to follow my passion and bring Aurora Jewelry to
                  life. Through this brand, I was able to reconnect with the world
                  after feeling disconnected for a while.
                </p>
                <p className="description-3">
                  Aurora Jewelry is much more than a store, it’s a manifestation
                  of my passion. Designing each piece of jewelry is a joy and a
                  source of pride of me. I believe that jewelry should not only be
                  beautiful but also meaningful . I pour my character, creativity
                  and individuality into each piece, with the goal of inspiring
                  others to express their own style through the jewelry they wear.
                </p>
                <p className="description-4">
                  Thank you for taking the time to learn about me and Aurora
                  Jewelry. I am thrilled to share my passion and creations with
                  you and I look forward to present more of my jewelry creations
                  to you in the future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* NEW ARRIVALS */}
        <section id="arrivals">
          <h2>new arrivals</h2>

          <div className="arrivals-gallery">
            <SwiperArrival products={products} />
            <a className='view-all' href="/collections/all">view all products</a>
          </div>
        </section>
      </div>
      <Footer marginTop='12rem' />
    </>
  );
};

export default Home;