import { useState } from 'react';
import axios from 'axios';

const NavSearchMobile = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [viewUrl, setViewUrl] = useState("");

  const handleResult = (e) => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products/search`, { queryString: e.target.value })
      .then((res) => {
        setSearchResult(res.data);
      })
      .catch(error => console.log(error.message));
    setViewUrl(`/search/${e.target.value}`);
  };

  // CURRENCY LOCALIZATION Function
  function localize(amount) {
    return Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(amount);
  }

  return (
    <div className="search-mobile">
      <div className="search-grid">
        <div className="search-icon">
          <img
            className=""
            src="/images/homepage/icons/search-icon-white.svg"
            alt="Search Icon"
          />
        </div>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="SEARCH..."
          onChange={handleResult}
        />
        <img
          src="/images/homepage/icons/close-icon-black.svg"
          alt="Cancel Icon"
          className="search-cancel-mobile"
        />

        {/* RESULTS GRID */}
        <div className="results">
          <div className="results-header">
            <h4>{searchResult.length} {searchResult.length === 1 ? "result" : "results"}</h4>
            {searchResult.length > 4 ? <a href={viewUrl}>View All</a> : null}
          </div>
          <div className="results-grid">

            {searchResult.slice(0, 4).map((each, index) => (
              <a key={index} className="result" href={`/products/${each.product_id}`}>
                <div className="result-img">
                  <img
                    src={each.product_images.values[0] && each.product_images.values[0].url}
                    alt={each.product_title}
                  />
                </div>
                <div className="result-details">
                  <p className="result-title">{each.product_title}</p>
                  <p className="result-price">{localize(each.product_price)}</p>
                </div>
              </a>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default NavSearchMobile;