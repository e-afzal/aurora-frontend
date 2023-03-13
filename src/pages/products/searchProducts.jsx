import '../../styles/search.css';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// COMPONENT(S)
import Navbar from './../../components/Navbar';
import PageLoader from './../../components/PageLoader';
import Pagination from './../../components/Pagination';
import Footer from '../../components/Footer';

const Search = () => {
  const headingRef = useRef();
  const { query } = useParams();
  const [data, setData] = useState(null);
  const [result, setResult] = useState([
    {
      product_id: 0,
      product_images: { values: [] },
      product_price: 0,
      product_title: "",
      product_types: ""
    }
  ]);

  // PAGINATION STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products/search`, { queryString: query })
      .then(res => {
        // 'data' is original. Don't modify!
        setData(res.data);
        setResult(res.data);
      })
      .catch(error => console.log(error.message));
  }, [query]);

  // CURRENCY LOCALIZATION Function
  function localize(amount) {
    return Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(amount);
  }

  //? Pagination related: Get Current Posts
  const indexOfLastPost = currentPage * postsPerPage; // 1*10
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 10 - 10
  const currentPosts = result.slice(indexOfFirstPost, indexOfLastPost); // 0 to 10

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

  if (data === null) {
    return (<PageLoader />);
  }

  if (data !== null && result.length > 0) {
    return (
      <>
        <Navbar marginBottom={"5.5rem"} />
        {/* SEARCH SECTION */}
        <>
          <section id="search">
            <h2>Search</h2>
            <div>
              <p ref={headingRef} style={{ marginBottom: "5rem" }}>{result.length} {result.length === 1 ? "result" : "results"} for "{`${query}`}"</p>

              {/* RESULTS GRID */}
              <div className="search-grid">
                <div className="result-grid">

                  {currentPosts && currentPosts.map((product, index) => (
                    <a href={`/products/${product.product_id}`} className="result-card" key={index}>
                      <div className="card-image" style={{ overflowY: "hidden" }}>
                        <img
                          src={product.product_images.values[0] && product.product_images.values[0].url}
                          alt={product.product_title}
                        />
                      </div>
                      <div className="card-content" style={{ marginTop: "1rem" }}>
                        <h4 className="card-title" style={{ textTransform: "capitalize" }}>{product.product_title}</h4>
                        <p className="card-price">{localize(product.product_price)}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={result.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </section>
          <Footer marginTop='9rem' />
        </>
      </>
    );
  }
};

export default Search;
