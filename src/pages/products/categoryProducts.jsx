import { useState, useEffect, useRef } from 'react';
import '../../styles/singleCategory.css';
import axios from 'axios';
import { useParams } from "react-router-dom";

// COMPONENTS
import Navbar from '../../components/Navbar';
import SearchFilter from '../../components/SearchFilter';
import PageLoader from '../../components/PageLoader';
import Pagination from './../../components/Pagination';
import Footer from './../../components/Footer';

const CategoryProducts = () => {
  const { category_type } = useParams();
  const categoryHeading = useRef();
  const [openFilter, setOpenFilter] = useState(false);
  const [data, setData] = useState(null);
  const [finalData, setFinalData] = useState(null);
  const [filters, setFilters] = useState({
    price: { min: 0, max: 100000 },
    collection: "all",
  });

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/category/${category_type}`)
      .then(res => {
        setFinalData(res.data.category.products);
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
    if (filters.collection === "all") {
      return setFinalData(data.category.products);
    } else {
      newData =
        data.category.products.filter(product => {
          return product.collection.name === filters.collection;
        });
      // .filter(product => product.product_price >= minPrice && product.product_price <= maxPrice);
      //? If a collection is chosen which is unavailable in the data, dont make any changes
      if (newData.length === 0) return;
      setFinalData(newData);
    }
  };

  //? Pagination related: Get Current Posts
  const indexOfLastPost = currentPage * postsPerPage; // 1*10
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 10 - 10
  const currentPosts = finalData && finalData.slice(indexOfFirstPost, indexOfLastPost); // 0 to 10

  // HANDLER: Pagination related: Change page
  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
    setTimeout(() => {
      categoryHeading.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }, 100);
  };

  if (data === null) {
    return (
      <PageLoader />
    );
  }

  if (finalData !== null) {
    return (
      <>
        <Navbar />
        <SearchFilter
          mode={"collection"}
          openFilter={openFilter}
          filters={filters}
          setFilters={setFilters}
          data={[{ name: "all" }, ...data.collection]}
          handleResult={handleResult}
        />

        {/* PAGE contains ALL items from this particular CATEGORY e.g. Rings */}
        <div id="category-container">
          {/* COLLECTION IMAGE */}
          <div className="category-image-container" style={{ marginTop: "0px" }}>
            <img src="" alt="Category showcase image" className="category-image" />
          </div>

          {/* CONTENT */}
          <div className="category-content">
            <h2 className="category-heading" ref={categoryHeading}>{data.category.name}</h2>
            <h5 className="category-caption">Fine Jewelry</h5>
            <p className="category-description">
              From across-the-finger designs and bold cocktail rings to polished
              bands and stacking styles, make a striking statement in our
              exquisitely crafted rings.
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
          <section className="results-grid">
            <div className="result-grid">
              {currentPosts && currentPosts.map((product, index) => (
                <a key={index} href={`/products/${product.product_id}`} className="result-card">
                  <div className="card-image" style={{ overflowY: "hidden" }}>
                    <img
                      src={product.product_images.values[0] && product.product_images.values[0].url}
                      alt={product.product_title}
                      style={{ height: "18rem" }}
                    />
                  </div>
                  <div className="card-content">
                    <h4 style={{ textTransform: "capitalize" }} className="card-title">{product.product_title}</h4>
                    <p className="card-price">{localize(product.product_price)}</p>
                  </div>
                </a>
              ))}
            </div>

            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={finalData.length}
              paginate={paginate}
              currentPage={currentPage}
            />

          </section>
          <Footer marginTop="7rem" />
        </div>
      </>
    );
  }
};

export default CategoryProducts;