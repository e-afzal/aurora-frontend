import '../../styles/singleCollection.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

// COMPONENT(S)
import Navbar from '../../components/Navbar';
import SearchFilter from './../../components/SearchFilter';
import PageLoader from './../../components/PageLoader';
import Footer from '../../components/Footer';

const CollectionProducts = () => {
  const { collection_name } = useParams();
  const [gridSize, setGridSize] = useState(2);
  const [imageHeight, setImageHeight] = useState("30vw");
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData] = useState(null);
  const [finalData, setFinalData] = useState([
    {
      product_id: 0,
      product_images: { values: [] },
      product_title: "",
      product_price: 0,
    }
  ]);
  const [filters, setFilters] = useState({
    price: { min: 0, max: 100000 },
    category: "all",
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/collections/${collection_name}`)
      .then(res => {
        setFinalData(res.data.collection.products);
        // 'data' is ORIGINAL, DON'T TOUCH THIS..
        setData(res.data);
      })
      .catch(error => console.log(error.message));
  }, []);

  const activeFilter = () => {
    setOpenFilter(true);
  };

  // CURRENCY LOCALIZATION Function
  function localize(amount) {
    return Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(amount);
  }

  // HANDLERS
  const handleResult = () => {
    // const minPrice = filters.price.min;
    // const maxPrice = filters.price.max;
    let newData = [];
    if (filters.category === "all") {
      return setFinalData(data.collection.products);
    } else {
      newData =
        data.collection.products.filter(product => {
          return product.category.name === filters.category;
        }
        );
      if (newData.length === 0) {
        //? If a category is chosen which is unavailable in the data, dont make any changes
        return;
        // setFinalData(data);
      }
      // .filter(product => product.product_price >= minPrice && product.product_price <= maxPrice);
      setFinalData(newData);
    }
  };

  if (data === null) {
    return (
      <PageLoader />
    );
  }

  if (finalData.length > 0 && data !== null) {
    return (
      <>
        <Navbar />
        <SearchFilter
          mode={"category"}
          openFilter={openFilter}
          filters={filters}
          setFilters={setFilters}
          data={[{ name: "all" }, ...data.categories]}
          handleResult={handleResult}
        />

        {/* PAGE contains ALL items from this particular collection */}
        <div id="collection-container" >
          {/* COLLECTION IMAGE */}
          <div className="collection-image-container" style={{ marginTop: "0px" }}>
            <img src="" alt="Collection showcase image" className="collection-image" />
          </div>

          {/* CONTENT */}
          <div className="collection-content">
            <h2 className="collection-heading">{data.collection.name}</h2>
            <h5 className="collection-caption">Fine Jewelry</h5>
            <p className="collection-description">
              {data.collection.description}
            </p>
          </div>

          {/* FILTER BAR */}
          <div className="filterSortBar">
            <div className="adjustment-wrapper">
              <button className="filter-button" onClick={activeFilter}>FILTER</button>
              {/* <select className="select-sort" name="sort" id="sort">
            <option selected disabled>Sort By</option>
            <option value="Price Low to High">Price: Low to High</option>
            <option value="Price High to Low">Price: High to Low</option>
          </select> */}
            </div>
          </div>

          {/* RESULT GRID */}
          <section className="search-grid">
            <div className="result-grid">

              {finalData.map((product, index) => (
                <a key={index} href={`/products/${product.product_id}`} className="result-card">
                  <div className="card-image" style={{ overflowY: "hidden" }}>
                    <img
                      src={product.product_images.values[0] && product.product_images.values[0].url}
                      alt={product.product_title}
                      style={{ height: "18rem" }}
                    />
                  </div>
                  <div className="card-content" style={{ marginTop: "1rem" }}>
                    <h4 className="card-title" style={{ textTransform: "capitalize", marginTop: "1.5rem" }}>{product.product_title}</h4>
                    <p className="card-price">{localize(product.product_price)}</p>
                  </div>
                </a>
              ))}

            </div>
          </section>
        </div>

        <Footer marginTop='5rem' />
      </>

    );
  }
};

export default CollectionProducts;