import '../../styles/mainCollection.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

// COMPONENT(S)
import Navbar from './../../components/Navbar';
import Footer from './../../components/Footer';
import PageLoader from '../../components/PageLoader';
import SwiperMainJewelry from '../../components/SwiperMainJewelry';
import SwiperCategory from '../../components/SwiperCategory';

const MainCollection = () => {
  const { main_jewelry_title } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/collections/main/${main_jewelry_title}`)
      .then(res => {
        setData(res.data);
      })
      .catch(error => console.log(error.message));
  }, []);

  if (data === null) {
    return (
      <PageLoader />
    );
  }

  if (data !== null) {
    return (
      <>
        <Helmet>
          <title>Fine Jewelry | Aurora Jewelry</title>
          <meta name="description" content={data.mainJewelry.description} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Aurora Jewelry | Fine Jewelry" />
          <meta property="og:description" content={data.mainJewelry.description} />
          <meta property="og:url" content="https://aurorajewelry.ae/collections/main/fine-jewelry" />
          {/* <meta property="og:image" content="https://cdn.shopify.com/s/files/1/0595/9286/7976/files/aurora-logo.png?height=628&amp;pad_color=ffffff&amp;v=1663492389&amp;width=1200" /> */}
        </Helmet>

        <Navbar />
        <div id="collection-container">
          {/* DESCRIPTION SECTION */}
          <h1 className="collection-heading">{data.mainJewelry.name}</h1>
          <h5 className="collection-caption">our signature collections</h5>
          <p className="collection-description">
            {data.mainJewelry.description}
          </p>

          {/* IMAGE SECTION */}
          <div className="collection-image-container">
            <img src="" alt="Collection showcase image" className="collection-image" />
          </div>

          {/* SECTION: Shop by sub-collections e.g. aurora */}
          <section id="shopCollection">
            <h2 className="shop-heading">shop by collection</h2>
            <p className="shop-description">
              Discover much-loved collections and signature designs showcasing the
              finest coloured gemstones and diamonds.
            </p>
            <div className="shop-carousel-wrapper">
              <SwiperMainJewelry mainJewelry={data.mainJewelry} />
            </div>
          </section>

          {/* SECTION: Shop by category */}
          <section id="shopCategory">
            <h2 className="shop-heading">shop by category</h2>
            <p className="shop-description">
              Browse our collections by jewelry type. Choose from beautifully
              designed rings, necklaces, earrings, bracelets and bangles.
            </p>
            <div className="shop-carousel-wrapper">
              <SwiperCategory categories={data.category} />
            </div>
          </section>
        </div>
        <Footer />
      </>
    );
  }


};

export default MainCollection;