import { useState, useEffect } from "react";
import '../../../styles/details.css';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import PageLoader from "../../../components/PageLoader";
import Navbar from "../../../components/Navbar";

// COMPONENT(S)

const OrderDetails = () => {
  const { order_id } = useParams();
  // STATE
  const [order, setOrder] = useState(null);
  // const [refundText, setRefundText] = useState("");
  // const [exchangeText, setExchangeText] = useState("");
  // const [checkOptions, setCheckOptions] = useState([]);
  // const [checkExchange, setCheckExchange] = useState([]);

  useEffect(() => {
    //! Need to use API to fetch data for THIS order by ID. So you need 'route params'
    //! to get ID
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/orders/getOrder`, { order_id })
      .then(res => {
        setOrder(res.data);
      })
      .catch(error => console.log(error.message));
    // Set exchange checkbox options
    // const options = user.orders[0].cartItems.map(eachItem => eachItem.productTitle);
    // setCheckOptions(options);
  }, []);

  // HANDLERS - Refund related
  // const handleRefundText = (e) => {
  //   const text = e.target.value.trim();
  //   setRefundText(text);
  // };

  // const handleRefunds = (e) => {
  //   e.preventDefault();
  //   if (refundText.length < 5) return;
  // //Create refund request with 'text'
  //   console.log(refundText);
  // };

  // // HANDLERS - Exchange related
  // const handleCheckExchange = (checkedValues) => { setCheckExchange(checkedValues); };

  // const handleExchangeText = (e) => {
  //   const text = e.target.value.trim();
  //   setExchangeText(text);
  // };

  // const handleExchanges = (e) => {
  //   e.preventDefault();
  //   // If checkbox not selected OR textbox empty, 'return'
  //   if (checkExchange.length === 0 || exchangeText.length < 5) return;
  //   // DISPATCH request with 'item(s)' to exchange
  //   console.log(exchangeText);
  //   console.log(checkExchange);
  // };

  // CURRENCY LOCALIZATION Function
  function localize(amount) {
    return Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(amount);
  }

  if (order === null) {
    return (
      <PageLoader />
    );
  }

  if (order !== null && order.status === "success") {
    return (
      <>
        <Navbar marginBottom={"2rem"} />
        <section className="details-container">
          <Link to={"/account/dashboard"} className="back" >
            back to my account
          </Link>
          <h4>order #{`${order.data.orderNumber}`} <span style={{ backgroundColor: "yellow", fontSize: "1.5rem", paddingBlock: ".3rem", paddingInline: ".5rem", borderRadius: ".4rem", fontFamily: "Avenir-Medium" }}>{order.data.fulfillmentStatus}</span></h4>
          <p>Order placed on {new Date(order.data.createdAt).toLocaleDateString("en-AE")}</p>

          {/* <div className="order-message">
          <p>
            Your order has been sent. Track the shipment with number SWFT209657 or
            by clicking here.
          </p>
        </div> */}

          <div className="details-grid">
            <section id="product-details">
              <table>
                <thead>
                  <tr>
                    <th>product</th>
                    <th>quantity</th>
                    <th>total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.data.cartItems.map((eachItem, index) => (
                    <tr key={index}>
                      <td className="product-details">
                        <div className="product-image">
                          <img
                            src="/images/homepage/daria_coral-tinified.jpg"
                            alt="Product image"
                          />
                        </div>
                        <div className="product-detail">
                          <p style={{ textTransform: "capitalize" }}>{eachItem.productTitle}</p>
                          <p style={{ textTransform: "capitalize" }}>{eachItem.size > 0 ? `${eachItem.size} / ` : null} {eachItem.color}</p>
                          <p>{localize(eachItem.price)}</p>
                        </div>
                      </td>
                      <td className="product-quantity">1</td>
                      <td className="total-amount">{localize(eachItem.price * eachItem.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="calculation-grid">
                <h4 className="subtotal-title">Subtotal</h4>
                <h4 className="subtotal-amount">{localize(order.data.subtotalAmt)}</h4>
                <h4 className="shipping-title">SHIPPING (Standard)</h4>
                <h4 className="shipping-amount">{localize(order.data.shippingAmt || 0)}</h4>
                <h4 className="tax-title">TAX (VAT 5.00%)</h4>
                <h4 className="tax-amount">{localize(order.data.taxAmt)}</h4>
                <h4 className="total-title">TOTAL</h4>
                <h4 className="total-amount">{localize(order.data.totalAmt)}</h4>
              </div>
            </section>
            <section id="address">
              <div className="shipping-address">
                <h4>Shipping Address</h4>
                <p className="name">{`${order.data.shipping.shippingAddress.firstName} ${order.data.shipping.shippingAddress.lastName}`}</p>
                <p className="address">{`${order.data.shipping.shippingAddress.address}`}</p>
                <p className="apartment">{order.data.shipping.shippingAddress.apartment}</p>
                <p className="city">{order.data.shipping.shippingAddress.city}</p>
                <p className="country">{order.data.shipping.shippingAddress.country}</p>
              </div>
              <div className="billing-address">
                <h4>billing address</h4>
                <p className="name">{`${order.data.shipping.shippingAddress.firstName} ${order.data.shipping.shippingAddress.lastName}`}</p>
                <p className="address">{`${order.data.shipping.shippingAddress.address}`}</p>
                <p className="apartment">{order.data.shipping.shippingAddress.apartment}</p>
                <p className="city">{order.data.shipping.shippingAddress.city}</p>
                <p className="country">{order.data.shipping.shippingAddress.country}</p>
              </div>
            </section>
          </div>

          {/* <div className="refunds-exchanges">
    <section id="refunds">
      <div className="refunds-submit">
        <h3>Refunds</h3>
        <p>To process a complete refund, kindly fill in the below:</p>
        <form id="refunds" onSubmit={handleRefunds}>
          <textarea
            name="refund-request"
            id="refund-request"
            placeholder="Type in the reason for the refund"
            onChange={(e) => handleRefundText(e)}
          ></textarea>
          <button>Request refund</button>
        </form>
      </div>
      <div className="refunds-status">
        <h3>Refund status</h3>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Date of request</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Under process</td>
              <td>13th August 2022</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <section id="exchange">
      <div className="exchange-submit">
        <h3>Exchange</h3>
        <p>
          <span>NOTE:</span> The exchange of a particular item is allowed
          only once; if the cause for the exchange is deemed reasonable.
        </p>
        <p>
          Please select the item to be exchanged and the reason for the
          exchange:
        </p>
        <form id="exchanges" onSubmit={handleExchanges}>
          <Checkbox.Group options={checkOptions} onChange={handleCheckExchange} style={{ marginBlock: "1.5rem" }} />
          <textarea
            name="exchange-request"
            id="exchange-request"
            placeholder="Type in the reason for the exchange"
            onChange={(e) => handleExchangeText(e)}
          ></textarea>
          <button>Request Exchange</button>
        </form>
      </div>
      <div className="exchange-status">
        <h3>Exchange status</h3>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Date of request</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Under process</td>
              <td>13th August 2022</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div> */}
        </section>
      </>
    );
  }
};

export default OrderDetails;
