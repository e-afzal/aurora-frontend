import '../../styles/single.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

// REDUX RELATED
import { useDispatch } from "react-redux";
import { addToCart } from "../../reducers/cartReducer";

// SWIPER
import ProductGallery from "../../components/Swiper";
import PageLoader from './../../components/PageLoader';
import Navbar from '../../components/Navbar';
import Footer from './../../components/Footer';

const SingleProduct = () => {
  // PARAMS
  const { id } = useParams();
  const navigate = useNavigate("");
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`).then(res => {
      setProductData({
        id: res.data.product_id,
        images: res.data.product_images,
        title: res.data.product_title,
        price: res.data.product_price,
        description: [],
        //? OPTIONS
        quantity: 1,

        sizes: res.data.product_size.values || [],
        size: res.data.product_size.values[0] || "",

        goldColors: res.data.gold_color.values || [],
        goldColor: res.data.gold_color.values[0] || "",

        stones: res.data.stone_color.values || [],
        stone: res.data.stone_color.values[0] || "",

        enamels: res.data.enamel_colors.values || [],
        enamel: res.data.enamel_colors.values[0] || "",

        hooks: res.data.hook_options.values || [],
        hook: res.data.hook_options.values[0] || "",
      });
    }).catch(error => console.log(error.message));
  }, [id]);

  // REDUX constants
  const dispatch = useDispatch();

  // HANDLERS
  const handleIds = (e) => {
    setProductData(prevState => {
      return {
        ...prevState,
        [e.target.id]: e.target.value
      };
    });
  };

  const handleAdd = () => {
    dispatch(
      addToCart({
        id: productData.id,
        productTitle: productData.title,
        price: productData.price,
        image: productData.images.values[0].url,
        // CHOSEN OPTION(S)
        quantity: productData.quantity,
        size: productData.size,
        goldColor: productData.goldColor,
        stone: productData.stone,
        enamel: productData.enamel,
        hook: productData.hook,
      })
    );
  };

  const handleBuy = () => {
    dispatch(
      addToCart({
        id: productData.id,
        productTitle: productData.title,
        price: productData.price,
        image: productData.images.values[0].url,
        // CHOSEN OPTION(S)
        quantity: productData.quantity,
        size: productData.size,
        goldColor: productData.goldColor,
        stone: productData.stone,
        enamel: productData.enamel,
        hook: productData.hook,
      })
    );
    navigate("/checkout/cart");
  };

  // OTHER FUNCTIONS
  const decrementQuantity = () => {
    if (productData.quantity === 1) return;
    setProductData(prevState => {
      return {
        ...prevState,
        quantity: prevState.quantity - 1
      };
    });
  };

  const incrementQuantity = () => {
    if (productData.quantity === 10) return;
    setProductData(prevState => {
      return {
        ...prevState,
        quantity: prevState.quantity + 1
      };
    });
  };

  // CURRENCY LOCALIZATION Function
  function localize(amount) {
    return Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(amount);
  }

  if (productData === null) {
    return (
      <PageLoader />
    );
  }

  if (productData !== null) {
    return (
      <>
        <Navbar marginBottom={"7rem"} />

        <div className="product-container">
          <section id="single-product">
            <div className="product-gallery">
              <ProductGallery images={productData.images.values} alt={productData.productTitle} />
            </div>

            <div className="product-details">
              <div className="product-header">
                <h3 className="product-title">{productData.title}</h3>
                <h4 className="product-price">
                  {localize(productData.price)}
                </h4>
              </div>
              <hr />
              <ul className="product-description">
                <li>Material Type: 18k Rose Gold</li>
                <li>Stones: Black Onyx, White Sapphire 0.22</li>
                <li>Weight: 5.72g</li>
              </ul>

              {/* OPTION: PRODUCT SIZES */}
              {productData.sizes.length > 0 && (
                <select
                  className="select-size"
                  defaultValue={productData.sizes[0]}
                >
                  <option disabled>Select Ring Size</option>
                  {productData.sizes.map((size, index) => (
                    <option
                      key={index}
                      value={size}
                      onClick={(e) => handleIds(e)}
                      id="size"
                    >
                      {size}
                    </option>
                  ))}
                </select>
              )}

              {/* OPTION: GOLD COLORS */}
              {productData.goldColors.length > 0 && (
                <select
                  className="select-color"
                  name="goldColor"
                  defaultValue={productData.goldColors[0]}
                  style={{ marginBottom: "2.5rem", textTransform: "capitalize" }}
                >
                  <option disabled>Select Gold Color</option>
                  {productData.goldColors.map((color, index) => (
                    <option
                      key={index}
                      value={color}
                      onClick={(e) => handleIds(e)}
                      id="goldColor"
                      style={{ textTransform: "capitalize" }}
                    >
                      {color}
                    </option>
                  ))}
                </select>
              )}

              {/* OPTION: STONE COLORS */}
              {productData.stones.length > 0 && (
                <select
                  className="select-stone"
                  name="stone"
                  defaultValue={productData.stones[0]}
                  style={{ textTransform: "capitalize" }}
                >
                  <option disabled>Select Stone Type</option>
                  {productData.stones.map((stone, index) => (
                    <option
                      key={index}
                      value={stone}
                      onClick={(e) => handleIds(e)}
                      id="stone">{stone}</option>
                  ))}
                </select>
              )}

              {/* OPTION: ENAMEL COLORS */}
              {productData.enamels.length > 0 && (
                <select
                  className="select-stone"
                  name="enamel"
                  defaultValue={productData.enamels[0]}
                  style={{ textTransform: "capitalize" }}
                >
                  <option disabled>Select Enamel Color</option>
                  {productData.enamels.map((enamel, index) => (
                    <option
                      key={index}
                      value={enamel}
                      onClick={(e) => handleIds(e)}
                      id="enamel">{enamel}
                    </option>
                  ))}
                </select>
              )}

              {/* OPTION: HOOKS */}
              {productData.hooks.length > 0 && (
                <select
                  className="select-stone"
                  style={{ textTransform: "capitalize" }}
                  name="hook"
                  defaultValue={productData.hooks[0]}
                >
                  <option disabled>Select hook type</option>
                  {productData.hooks.map((hook, index) => (
                    <option
                      key={index}
                      value={hook}
                      onClick={(e) => handleIds(e)}
                      id="hook">{hook}</option>
                  ))}
                </select>
              )}

              {/* OPTION: QUANTITY SELECTOR */}
              <div className="options-selector">
                <div className="cart-item-adjustment">
                  <div className="quantity-adjuster">
                    <button onClick={decrementQuantity}>&#8722;</button>
                    <p>{productData.quantity}</p>
                    <button onClick={incrementQuantity}>&#43;</button>
                  </div>
                </div>
              </div>
              <button className="cart" onClick={handleAdd}>
                add to cart
              </button>
              <button className="buy" onClick={handleBuy}>
                buy it now
              </button>
            </div>
          </section>
        </div>
        <Footer marginTop='7rem' />
      </>

    );
  }
};

export default SingleProduct;
