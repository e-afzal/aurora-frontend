import { useSelector } from "react-redux";

const OrderSummary = () => {
  // Fetch 'userInfo' using Redux
  const cartItems = useSelector((state) => state.cartItems.value);

    //? Calculate Subtotal Price
    // const subtotalPrice = cartItems.reduce(
    //   (acc, curr) => acc + curr.price * curr.quantity,
    //   0
    // );
  

    //? Calculate Taxes
    // const estimatedTax = Math.ceil(subtotalPrice * (5 / 100));
  

    //? Calculate Total Price
    // const totalPrice = Math.ceil(subtotalPrice + estimatedTax);
  
  

  return (
    <div className="order-container">
      <section id="summary">
        <h2>Order summary</h2>

        
          <div  className="product-grid">
            <div className="product-image">
              <img
                src="./images/homepage/daria_coral-tinified.jpg"
                alt="Product image"
              />
            </div>
            <div className="product-description">
              <p className="product-title">Title</p>
              <p className="product-size-color">size/gold color</p>
            </div>
            <p className="product-price">AED 0.00</p>
          </div>
        

        <div className="calculation-grid">
          <div className="subtotal-calculation">
            <p>Subtotal</p>
            <p>AED 0.00</p>
          </div>
          <div className="shipping-calculation">
            <p>Shipping</p>
            <p>Calculated at next step</p>
          </div>
          <div className="taxes-calculation">
            <p>Taxes (estimated)</p>
            <p>AED 0.00</p>
          </div>
        </div>

        <div className="total-amount">
          <p>Total</p>
          <p>AED 0.00</p>
        </div>
      </section>
    </div>
  );
};

export default OrderSummary;
