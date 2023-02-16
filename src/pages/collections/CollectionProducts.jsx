import '../../styles/collectionProducts.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// COMPONENTS
import SearchFilter from '../../components/SearchFilter';
import Pagination from '../../components/Pagination';

const CollectionProducts = () => {
  const { collectionName } = useParams();

  // STATE
  const [collection, setCollection] = useState(null);
  const [finalData, setFinalData] = useState(null);
  const [filters, setFilters] = useState({
    price: { min: 500, max: 10000 },
    type: "all"
  });
  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/collection/collections/${collectionName}`).then(res => {
      setFinalData(res.data.products);
      // Collection is 'ORIGINAL' data that can be used if ever 'category' in filter is set to 'ALL'
      setCollection(res.data);
      console.log(res.data);
    }
    ).catch(error => console.log(error.message));
  }, [collectionName]);
  // CURRENCY LOCALIZATION Function
  function localize(amount) {
    return Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(amount);
  }

  // HANDLERS
  const handleResult = () => {
    const minPrice = filters.price.min;
    const maxPrice = filters.price.max;
    if (collection.products) {
      const newData = collection.products && collection.products
        .filter(product => {
          if (filters.type === 'all') return collection.products;
          return product.product_types.toLowerCase() === filters.type.toLowerCase();
        })
        .filter(product => product.product_price >= minPrice && product.product_price <= maxPrice);
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  // RENDERING
  if (finalData === null) {
    return (
      <h3>Loading..</h3>
    );
  }

  if (finalData !== null) {
    return (
      <>
        <SearchFilter setFilters={setFilters} handleResult={handleResult} />

        {/* COLLECTION RESULT */}
        <section id="collectionProducts">
          <h1>The {collection && collection.name} Collection</h1>

          <div className="searchsortbar">
            <div className="adjustment-wrapper">
              <button className="filter-button">FILTER</button>
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
                      src="/img/single-product/daria_coral-tinified.jpg"
                      alt="Daria Coral Ring"
                    />
                  </div>
                  <div className="card-content">
                    <h4 className="card-title">{product.product_title}</h4>
                    <p className="card-price">{localize(product.product_price)}</p>
                  </div>
                </a>
              ))}

            </div>
          </div>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={finalData.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </section>
      </>
    );
  }


};

export default CollectionProducts;