import '../../styles/collectionsProducts.css';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// COMPONENTS
import SearchFilter from '../../components/SearchFilter';
import Pagination from '../../components/Pagination';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageLoader from '../../components/PageLoader';

const CollectionsProducts = () => {
  const headingRef = useRef();
  // STATE
  const [openFilter, setOpenFilter] = useState(false);
  const [productsData, setProductsData] = useState(null);
  const [finalData, setFinalData] = useState([
    {
      product_id: 0,
      product_images: { values: [] },
      product_title: "",
      product_price: 0,
    }
  ]);
  const [filters, setFilters] = useState({
    price: { min: 500, max: 100000 },
    category: "all"
  });

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`).then(res => {
      setFinalData(res.data.products);
      // 'productsData' is original. DONT TOUCH
      setProductsData(res.data);
    }).catch(error => console.log(error.message));
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
      return setFinalData(productsData.products);
    } else {
      newData =
        productsData.products.filter(product => {
          return product.category.name === filters.category;
        }
        );
      //? If a category is chosen which is unavailable in the data, dont make any changes
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
      headingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    }, 100);
  };

  if (productsData === null) {
    return (
      <PageLoader />
    );
  }

  if (finalData.length > 0 && productsData !== null) {
    return (
      <>
        <SearchFilter
          mode={"category"}
          openFilter={openFilter}
          filters={filters}
          setFilters={setFilters}
          data={[{ name: "all" }, ...productsData.categories]}
          handleResult={handleResult}
        />

        <Navbar marginBottom={"5rem"} />

        <section id="collectionsProducts">
          <h1 ref={headingRef}>Products</h1>

          <div className="searchsortbar">
            <div className="adjustment-wrapper">
              <button
                className="filter-button"
                onClick={activeFilter}>FILTER</button>
              {/* <select className="select-sort" name="sort" id="sort">
              <option selected disabled>Sort By</option>
              <option value="Price Low to High">Price: Low to High</option>
              <option value="Price High to Low">Price: High to Low</option>
            </select> */}
            </div>
          </div>

          <div className="search-grid">
            <div className="result-grid">

              {currentPosts && currentPosts.map((product, index) => (
                <a href={`/products/${product.product_id}`} className="result-card" key={index}>
                  <div className="card-image">
                    <img
                      src={product.product_images.values[0] && product.product_images.values[0].url}
                      alt="Daria Coral Ring"
                    />
                  </div>
                  <div className="card-content">
                    <h4 className="card-title" style={{ textTransform: "capitalize", marginTop: "1.5rem" }}>{product.product_title}</h4>
                    <p className="card-price">{localize(product.product_price)}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={finalData.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <Footer marginTop="5rem" />
      </>
    );
  }
};

export default CollectionsProducts;