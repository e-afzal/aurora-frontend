import { useEffect } from "react";

const SearchFilter = ({ filters, setFilters, handleResult, openFilter, mode, data }) => {
  // OPEN & CLOSE FILTER SIDEBAR
  useEffect(() => {
    const filterButton = document.querySelector("button.filter-button");
    const cancelIcon = document.querySelector(".filter-pane-cancel-icon img");
    const resultButton = document.querySelector("button.filter-result");
    const filterOverlay = document.querySelector(".filter-overlay");

    filterButton.addEventListener("click", () => {
      filterOverlay.style.display = "block";
    });
    cancelIcon.addEventListener("click", () => {
      filterOverlay.style.display = "none";
    });
    resultButton.addEventListener("click", () => {
      filterOverlay.style.display = "none";
    });
  }, []);

  const handlePrice = (value) => {
    setFilters(prevState => {
      return {
        ...prevState,
        price: {
          min: value[0],
          max: value[1]
        }
      };
    });
  };

  const handleCollection = (e) => {
    setFilters(prevState => {
      return {
        ...prevState,
        collection: e.target.id
      };
    });
  };

  const handleCategory = (e) => {
    setFilters(prevState => {
      return {
        ...prevState,
        category: e.target.id
      };
    });
  };

  return (
    <>
      {/* FILTER SIDEBAR (Desktop & Mobile) */}
      <div className="filter-overlay" style={{ display: openFilter ? "block" : "none" }}>
        <div className="filter-pane">
          <div className="filter-header">
            <h3>filters</h3>
            <div className="filter-pane-cancel-icon">
              <img
                src="/images/homepage/icons/close-icon.svg"
                alt="Close Icon"
              />
            </div>
          </div>

          {/* <div className="filter-price">
            <h5>price</h5>
            <div className="wrapper">
            </div>
          </div> */}

          {/* COLLECTION FILTER */}
          {mode === "collection" && (
            <div className="filter-category" style={{ borderBottom: "1px solid rgba(51, 51, 51, 0.65)" }}>
              <h5>Collection</h5>
              <ul className="filter-category-options">

                {data.map((collection, index) => (
                  <div key={index} className="form-control" style={{ backgroundColor: "transparent", marginTop: "1.2rem", marginBottom: "0", borderColor: "transparent" }}>
                    <input
                      type="radio"
                      name={"collection"}
                      value={collection.name}
                      id={collection.name}
                      onChange={handleCollection}
                      checked={collection.name === filters.collection}
                    />
                    <label htmlFor={collection.name} style={{
                      textTransform: "capitalize",
                      marginLeft: "7px",
                      marginBottom: "5px",
                      color: "#fff",
                      fontFamily: "Avenir-Medium,sans-serif"
                    }}>{collection.name}</label>
                  </div>
                ))}

              </ul>
            </div>
          )}

          {/* CATEGORIES FILTER */}
          {mode === "category" && (
            <div className="filter-category">
              <h5>product type</h5>
              <ul className="filter-category-options">
                <form>
                  {data.map((category, index) => (
                    <div key={index} className="form-control" style={{ backgroundColor: "transparent", borderColor: "transparent", marginTop: "1.2rem" }}>
                      <input
                        type="radio"
                        name={"category"}
                        value={category.name}
                        id={category.name}
                        onChange={handleCategory}
                        checked={category.name === filters.category}
                      />
                      <label htmlFor={category.name} style={{
                        textTransform: "capitalize",
                        marginLeft: "7px",
                        marginBottom: "5px",
                        color: "#fff",
                        fontFamily: "Avenir-Medium,sans-serif"
                      }}>{category.name}</label>
                    </div>
                  ))}
                </form>
              </ul>
            </div>
          )}

          <button className="filter-result" onClick={handleResult}>see results</button>
        </div>
      </div>
    </>
  );





};

export default SearchFilter;
