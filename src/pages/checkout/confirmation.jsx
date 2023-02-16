import '../../styles/confirmation.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';

// COMPONENTS
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Confirmation = () => {
  //? Fetch 'userInfo' and 'cartItems' using REDUX, if any
  const userInfo = useSelector((state) => state.userInfo.user);
  const cartItems = useSelector((state) => state.cartItems.value);

  const [searchParams, setSearchParams] = useSearchParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const session_id = searchParams.get("session_id");
    const session_status = searchParams.get("session_status");
    if (session_id && session_status === "1")
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/payments/retrieve`, { session_id, cartItems, userInfo })
        .then(res => {
          setOrder(res.data);
          //? Empty the cart since order placed 'successfully'
          if (res.data.status === "success") {
            localStorage.setItem("cartItems", []);
            const userObj = {
              user: {}
            };
            // localStorage.setItem("userInfo", {});
          }
        })
        .catch(error => console.log(error.message));
  }, []);

  // CURRENCY LOCALIZATION Function
  function localize(amount) {
    return Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(amount);
  }

  console.log(order);

  if (order === null) {
    return <p>LOADING..</p>;
  }

  return order !== null && (
    <>
      <Navbar marginBottom={'7rem'} />
      <div className="confirmation-grid">
        <div className="customer-container">
          <div className="thanks">
            <div className="order-number">
              <h5>Order #{order.data.orderNumber}</h5>
            </div>
          </div>

          <div className="order-confirmed">
            <div className="map-container"></div>
            <div className="confirm-content">
              <h4>Your order is confirmed</h4>
              <p>
                You will receive a confirmation email with your order number
                shortly.
              </p>
            </div>
          </div>

          <div className="order-updates">
            <h4>Order updates</h4>
            <p>You'll get shipping and delivery updates by email.</p>
          </div>

          <div className="customer-info-grid">
            <div className="email">
              <h4>Contact email</h4>
              <p>{order && order.data.shipping.shippingAddress.email}</p>
            </div>
            <div className="payment-method">
              <h4>Payment Method</h4>
              <div className="card-flex">
                <div className="card-logo"></div>
                <p className="card-number">ending with 0001 - AED 7,770</p>
              </div>
            </div>
            <div className="shipping-address">
              <h4>Shipping Address</h4>
              <p className="name">{order && `${order.data.shipping.shippingAddress.firstName} ${order.data.shipping.shippingAddress.lastName}`}</p>
              <p className="address">{order && order.data.shipping.shippingAddress.address}</p>
              <p className="apartment">{order && order.data.shipping.shippingAddress.apartment}</p>
              <p className="city">{order && order.data.shipping.shippingAddress.city}</p>
              <p className="country">{order && order.data.shipping.shippingAddress.country}</p>
              <p className="phone">{order && order.data.shipping.shippingAddress.phone}</p>
            </div>

            <div className="billing-address">
              <h4>Billing Address</h4>
              <p className="name">{order && `${order.data.shipping.shippingAddress.firstName} ${order.data.shipping.shippingAddress.lastName}`}</p>
              <p className="address">{order && order.data.shipping.shippingAddress.address}</p>
              <p className="apartment">{order && order.data.shipping.shippingAddress.apartment}</p>
              <p className="city">{order && order.data.shipping.shippingAddress.city}</p>
              <p className="country">{order && order.data.shipping.shippingAddress.country}</p>
              <p className="phone">{order && order.data.shipping.shippingAddress.phone}</p>
            </div>

            <div className="shipping-method">
              <h4>Shipping Method</h4>
              <p>Standard shipping</p>
            </div>
          </div>

          <button className="continue" style={{ padding: "0rem" }}>
            <a style={{ paddingBlock: "1.7rem", display: "inline-block", width: "100%" }} href="/collections/all">Continue Shopping</a>
          </button>
        </div>

        {/* SUMMARY */}
        <div className="order-container">
          <section id="summary">
            <h2>Order summary</h2>

            {order.data.cartItems.map((item, index) => (
              <div className="product-grid" key={index}>
                <div className="product-image">
                  <img
                    src="./img/homepage/daria_coral-tinified.jpg"
                    alt="Product image"
                  />
                </div>
                <div className="product-description">
                  <p className="product-title">{`${item.productTitle} (x${item.quantity})`}</p>
                  <p className="product-size-color">{item.size > 0 ? `${item.size} / ` : null} {item.color}</p>
                </div>
                <p className="product-price">{localize(item.price * item.quantity)}</p>
              </div>
            ))}

            <div className="calculation-grid">
              <div className="subtotal-calculation">
                <p>Subtotal</p>
                <p>{localize(order.data.subtotalAmt)}</p>
              </div>
              <div className="taxes-calculation">
                <p>Tax (included in subtotal)</p>
                <p>{localize(order.data.taxAmt)}</p>
              </div>
              <div className="shipping-calculation">
                <p>Shipping</p>
                <p>
                  {localize(order.data.shippingAmt)}
                </p>
              </div>
            </div>

            <div className="total-amount">
              <p>Total</p>
              <p>{localize(order.data.totalAmt)}</p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>

  );
};

export default Confirmation;
