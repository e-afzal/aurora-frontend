import '../../styles/shipping.css';
import { useState, useEffect } from "react";
import getStripe from '../../service/getStripe';
import axios from 'axios';

// REDUX RELATED
import { useSelector } from "react-redux";

// COMPONENTS
import CartEmpty from '../../components/CartEmpty';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from "../..//components/Footer";

const Shipping = () => {
  //? 'userInfo' related. We will pull userInfo passed through 'navigate' method 
  //? from 'info' page using 'useLocation'
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  //? Fetch 'cartItems' using REDUX, if any
  const cartItems = useSelector((state) => state.cartItems.value);

  // STATES
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [estimatedTax, setEstimatedTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [method, setMethod] = useState("standard");

  useEffect(() => {
    // Set userInfo and shippingPrice from 'location' object
    const {
      userInfoPass,
      //  shippingPrice
    } = location.state;
    setUserInfo(userInfoPass);
    setShippingPrice(userInfoPass.shippingPrice);

    //? Calculate Subtotal Price
    const subPrice = cartItems && cartItems.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );

    //? Calculate Taxes
    const estdTax = Math.ceil(subPrice * (5 / 100));

    //? Calculate Total Price
    // const ttlPrice = Math.ceil(subPrice + (shippingPrice || 0) + estdTax);
    const ttlPrice = Math.ceil(subPrice + (userInfoPass.shippingPrice || 0));

    setSubtotalPrice(subPrice);
    setEstimatedTax(estdTax);
    setTotalPrice(ttlPrice);
  }, [cartItems]);

  // HANDLERS
  const handleSubmit = async (e) => {
    e.preventDefault();
    //? Routing is done via <a> tag wherever this handler is called
    //* Here, we only send CART ITEMS to STRIPE in the '/api/payments'

    try {
      //? Stripe payment initiated and redirected to STRIPE 'PAYMENT' PAGE if successful
      const stripe = await getStripe();
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/payments`, { cartItems, shippingPrice: userInfo.shippingPrice });
      await stripe.redirectToCheckout({ sessionId: res.data.id });
    } catch (error) {
      console.log(error.message);
    }
  };

  // CURRENCY LOCALIZATION Function
  function localize(amount) {
    return Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(amount);
  }

  if (cartItems.length === 0 || cartItems === null) {
    return (
      <CartEmpty />
    );
  }

  if (userInfo === null) {
    return (
      <h1>You are not logged in</h1>
    );
  }

  if (cartItems.length >= 1 && userInfo !== null) {
    return (
      <>
        {/* NAVBAR */}
        <Navbar marginBottom={"5.5rem"} />

        <section className="shipping-info-summary-grid">
          <div className="info-container">
            <section id="information">
              {/* <h2>AURORA</h2> */}

              <div className="cart-links">

                <a href="/checkout/cart">Cart</a>

                <img
                  src="/images/homepage/icons/chevron-right-outline.svg"
                  alt="Forward Facing Chevron"
                />
                <a href="/checkout/information">Information</a>
                <img
                  src="/images/homepage/icons/chevron-right-outline.svg"
                  alt="Forward Facing Chevron"
                />
                <a href="#">
                  Shipping
                </a>
                {/* <img
              src="/images/homepage/icons/chevron-right-outline.svg"
              alt="Forward Facing Chevron"
            />
            <a href="#">Payment</a> */}
              </div>
              <section className="contact">
                <div className="contact-container">
                  <div className="contact-info-grid">
                    <p>Contact</p>
                    <p>{userInfo && userInfo.email}</p>
                    {/* <a href="#">Change</a> */}
                  </div>
                  <div className="ship-to-grid">
                    <p>Ship to</p>
                    <p>
                      {userInfo && `${userInfo.address}, ${userInfo.apartment}, ${userInfo.city}, ${userInfo.country}`}
                    </p>
                    {/* <a href="#">Change</a> */}
                  </div>
                </div>
              </section>
              <section className="shipping">
                <h5>Shipping Method</h5>

                <form className="shipping-form">
                  <label
                    htmlFor="standard"
                    className="input-container"
                    style={{ borderBottom: "none", paddingBottom: "0px" }}
                  >
                    <div className="form-control">
                      <input
                        type="radio"
                        name="shipping"
                        id="standard"
                        // defaultValue={shippingMethod}
                        checked={method === "standard"}
                        onChange={(e) => setMethod(e.target.id)}
                      />
                      <label htmlFor="standard" style={{ marginBottom: "0px" }}>
                        Standard
                      </label>
                    </div>
                    <p>{localize(userInfo.shippingPrice)}</p>
                  </label>

                  {/* <label htmlFor="express" className="input-container">
                    <div className="form-control">
                      <input
                        type="radio"
                        name="shipping"
                        id="express"
                        checked={method === "express"}
                        onChange={(e) => setMethod(e.target.id)}
                      />
                      <label htmlFor="express">Express</label>
                    </div>
                    <p>+ AED 50.00</p>
                  </label>

                  <label htmlFor="expensive" className="input-container">
                    <div className="form-control">
                      <input
                        type="radio"
                        name="shipping"
                        id="expensive"
                        checked={method === "expensive"}
                        onChange={(e) => setMethod(e.target.id)}
                      />
                      <label htmlFor="expensive">Expensive</label>
                    </div>
                    <p>+ AED 100.00</p>
                  </label> */}
                </form>

                <div className="grid-btns">
                  <div className="return">
                    <a href="/checkout/information">
                      Return to information
                    </a>
                  </div>

                  {/* <button onClick={handleSubmit}>SUBMIT</button> */}

                  <a href="#" onClick={handleSubmit}>
                    <button type="submit">Continue to payment</button>
                  </a>
                </div>
              </section>
            </section>
          </div>

          {/* SUMMARY */}
          <div className="order-container">
            <section id="summary">
              <h2>Order summary</h2>

              {cartItems && cartItems.map((eachItem, index) => (
                <div key={index} className="product-grid">
                  <div className="product-image">
                    <img
                      src={eachItem.image}
                      alt={eachItem.productTitle}
                    />
                  </div>
                  <div className="product-description">
                    <p className="product-title" style={{ textTransform: "capitalize" }}>{eachItem.productTitle}</p>
                    <p className="product-size-color">
                      {eachItem.size && `${eachItem.size} / `}
                      {eachItem.goldColor && `${eachItem.goldColor}`}
                      {eachItem.stone && ` / ${eachItem.stone}`}
                      {eachItem.enamel && ` / ${eachItem.enamel}`}
                      {eachItem.hook && ` / ${eachItem.hook}`}
                    </p>
                  </div>
                  <p className="product-price">
                    {localize((eachItem.price * eachItem.quantity))}
                  </p>
                </div>
              ))}

              <div className="calculation-grid">
                <div className="subtotal-calculation">
                  <p>Subtotal</p>
                  <p>{localize(subtotalPrice)}</p>
                </div>
                <div className="shipping-calculation">
                  <p>Shipping</p>
                  <p>{localize(userInfo.shippingPrice)}</p>
                </div>
                <div className="taxes-calculation">
                  <p>Taxes (included in subtotal)</p>
                  <p>{localize(estimatedTax)}</p>
                </div>
              </div>

              <div className="total-amount">
                <p>Total</p>
                <p>{localize(totalPrice)}</p>
              </div>
            </section>
          </div>

        </section>
        <Footer marginTop='7rem' />
      </>
    );
  }


};

export default Shipping;
