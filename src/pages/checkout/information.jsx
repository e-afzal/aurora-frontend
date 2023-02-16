import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import '../../styles/info.css';

// REDUX RELATED
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../reducers/userReducer";

// Components
import CartEmpty from '../../components/CartEmpty';
import schema from '../../validation/cartInfo';
import fedexList from './../../script/fedexList';
import Navbar from '../../components/Navbar';
import Footer from './../../components/Footer';

const Information = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //? Fetch 'userInfo' and 'cartItems' using REDUX, if any
  const cartItemsRedux = useSelector((state) => state.cartItems.value);
  const userInfoRedux = useSelector((state) => state.userInfo.user);

  // STATES
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  // shipping price set to Afghanistan price as DEFAULT since 'Afghanistan' is <select> defaultValue
  const [shippingPrice, setShippingPrice] = useState(0);
  const [estimatedTax, setEstimatedTax] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: userInfoRedux && userInfoRedux.firstName || "",
    lastName: userInfoRedux && userInfoRedux.lastName || "",
    email: userInfoRedux && userInfoRedux.email || "",
    address: userInfoRedux && userInfoRedux.address || "",
    apartment: userInfoRedux && userInfoRedux.apartment || "",
    city: userInfoRedux && userInfoRedux.city || "",
    //? Set default value incase nothing selected from 'Option' tag
    country: userInfoRedux && userInfoRedux.country || "Afghanistan",
    phone: userInfoRedux && userInfoRedux.phone || "",
    shippingPrice: 0
  });

  function uaeShipPrice(countryObj) {
    if (countryObj.country === "United Arab Emirates" && subtotalPrice >= 500) {
      setShippingAddress(prevState => {
        return {
          ...prevState,
          shippingPrice: 0
        };
      });
      // setShippingPrice(0);
    }
    if ((countryObj.country === "United Arab Emirates" && subtotalPrice < 500) ||
      countryObj.country !== "United Arab Emirates") {
      setShippingAddress(prevState => {
        return {
          ...prevState,
          shippingPrice: countryObj.price
        };
      });
      // setShippingPrice(countryObj.price);
    }
  }

  useEffect(() => {
    //? Calculate Subtotal Price
    const subPrice = cartItemsRedux.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );

    //? Calculate Taxes
    const estdTax = Math.ceil(subPrice * (5 / 100));

    //? Calculate Total Price
    // const ttlPrice = Math.ceil(subPrice + estdTax);
    const ttlPrice = Math.ceil(subPrice);

    setSubtotalPrice(subPrice);
    setEstimatedTax(estdTax);
    setTotalPrice(ttlPrice);
  }, []);

  useEffect(() => {
    const countryObj = fedexList.find(country => country.country === shippingAddress.country);

    // Set 'shippingPrice'
    uaeShipPrice(countryObj);

    // Set 'country'
    setShippingAddress((prevState) => {
      return {
        ...prevState,
        country: countryObj.country,
      };
    });
  }, []);

  // HANDLERS
  const handleCountrySelect = (e) => {
    const countryObj = fedexList.find(country => country.country === e.target.value);

    // Set 'shippingPrice'
    uaeShipPrice(countryObj);

    // Set 'country'
    setShippingAddress((prevState) => {
      return {
        ...prevState,
        country: countryObj.country,
      };
    });
  };

  const handleCountry = (e, country) => {
    // Set country
    setShippingAddress((prevState) => {
      return {
        ...prevState,
        country: country.country,
      };
    });
  };

  const handleChange = (e) => {
    setShippingAddress((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...shippingAddress };
    const { error } = schema.validate(data);
    const errorMessage = error ? error.details[0].message : "";
    if (errorMessage) {
      // If error, show error toast
      toast.error(errorMessage, { style: { fontSize: "13.5px" } });
    } else {
      dispatch(register(shippingAddress));
      navigate("/checkout/shipping", { state: { userInfoPass: shippingAddress } });
    }
    //? Use below if you want ALL ERRORS at once
    // const { error } = schema.validate(data
    //    { abortEarly: false }
    // );
    // error.details.forEach(each => {
    //   setErrors(prevState => {
    //     return {
    //       ...prevState,
    //       [each.context.key]: each.message
    //     };
    //   });
    // });
  };

  // CURRENCY LOCALIZATION Function
  function localize(amount) {
    return Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(amount);
  }

  return (
    <>
      {/* NAVBAR */}
      <Navbar marginBottom={"5.5rem"} />
      {/* TOAST */}
      <Toaster position="bottom-center" />

      {cartItemsRedux.length === 0 ? (<CartEmpty />) : (
        <>
          <section className="info-summary-grid">

            <div className="info-container">
              <section id="information">
                {/* <h2>AURORA</h2> */}
                <div className="cart-links">
                  <a href="/checkout/cart">Cart</a>
                  <img
                    src="/images/homepage/icons/chevron-right-outline.svg"
                    alt="Forward Facing Chevron"
                  />

                  <a href="#">Information</a>

                  {/* <img
                    src="/images/homepage/icons/chevron-right-outline.svg"
                    alt="Forward Facing Chevron"
                  /> */}

                  {/* <a href="#" onClick={navigateToInfo}>Shipping</a> */}

                  {/* <img
              src="/images/homepage/icons/chevron-right-outline.svg"
              alt="Forward Facing Chevron"
            />
            <a href="/payment" >Payment</a> */}
                </div>

                <section className="contact-info">
                  <div className="contact-head">
                    <h5>Contact Information</h5>
                    <p>
                      Have an account?{" "}
                      <a href="/account/login">Log in</a>
                    </p>
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="E.g. domain@email.com"
                    required
                    onChange={handleChange}
                    defaultValue={shippingAddress.email && shippingAddress.email}
                  />
                </section>

                <section className="shipping">
                  <h5>Shipping address</h5>
                  <form>
                    <div className="country form-input">
                      <label htmlFor="country">Country of Residence</label>
                      <select
                        name="country"
                        id="country"
                        required
                        onChange={handleCountrySelect}
                        defaultValue={shippingAddress.country}
                      >
                        {fedexList.map((each, index) => (
                          <option key={index}
                            onClick={(e) => handleCountry(e, each)}
                            value={each.country}
                            id={"country"}>{each.country}</option>
                        ))}
                      </select>
                    </div>
                    <div className="name-container">
                      <div className="form-input">
                        <label htmlFor="fName">First name</label>
                        <input
                          type="text"
                          name="firstName"
                          id="fName"
                          placeholder="Enter first name"
                          required
                          defaultValue={userInfoRedux && userInfoRedux.firstName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-input">
                        <label htmlFor="lName">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          id="lName"
                          placeholder="Enter last name"
                          required
                          defaultValue={userInfoRedux && userInfoRedux.lastName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="address form-input">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Enter your address"
                        required
                        defaultValue={userInfoRedux && userInfoRedux.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="apartment form-input">
                      <label htmlFor="apartment">Building/Villa name & number</label>
                      <input
                        type="text"
                        name="apartment"
                        id="apartment"
                        placeholder="Apartment, villa, etc."
                        required
                        defaultValue={userInfoRedux && userInfoRedux.apartment}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="city form-input" style={{ display: "block" }}>
                      <div className="city-label">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          placeholder="E.g. Dubai"
                          required
                          defaultValue={userInfoRedux && userInfoRedux.city}
                          onChange={handleChange}
                        />
                      </div>
                      {/* <div className="emirate-label">
                  <label htmlFor="emirate">Emirate</label>
                  <select name="emirate" id="emirate" required>
                    <option value="Emirate" disabled>
                      Emirate
                    </option>
                    <option value="Dubai">Dubai</option>
                  </select>
                </div> */}
                    </div>
                    <div className="phone form-input">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="E.g. +971501234567"
                        required
                        defaultValue={userInfoRedux && userInfoRedux.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </form>
                  <div className="grid-btns">
                    <div className="return">
                      <a href="/checkout/cart">Return to cart</a>
                    </div>
                    <button type="submit" style={{ paddingBlock: "0" }}>
                      <a href="#" onClick={handleSubmit} style={{ color: "#fff", paddingBlock: "1.7rem", display: "inline-block", width: "100%" }}>
                        Continue to shipping
                      </a>
                    </button>
                  </div>
                </section>

              </section>
            </div>

            {/* SUMMARY */}
            <div className="order-container">
              <section id="summary">
                <h2>Order summary</h2>

                {cartItemsRedux && cartItemsRedux.map((eachItem, index) => (
                  <div key={index} className="product-grid">
                    <div className="product-image">
                      <img
                        src={eachItem.image}
                        alt={eachItem.productTitle}
                      />
                    </div>
                    <div className="product-description">
                      <p style={{ textTransform: "capitalize" }} className="product-title">{eachItem.productTitle}</p>
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
                    <p>Calculated at next step</p>
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
        </>
      )}
      <Footer marginTop={'7rem'} />

    </>
  );
};

export default Information;
