import '../../styles/carts.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

// REDUX RELATED
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../reducers/cartReducer";

// COMPONENTS
import Navbar from '../../components/Navbar';
import CartEmpty from '../../components/CartEmpty';
import Footer from '../../components/Footer';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //? 'cartItems' pulled via Redux to show for display
  const items = useSelector((state) => state.cartItems.value);

  // STATE
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // EFFECT
  useEffect(() => {
    //? Set cartItems to 'pulled' items via Redux
    setCartItems(items);
    //? Calculate all items total price and change even if any 'item' is removed
    const total = items.reduce((prev, curr) => prev + (curr.price * curr.quantity), 0);
    setTotalPrice(total);
  }, [items]);

  // HANDLERS
  const handleDelete = (productId) => {
    dispatch(removeFromCart(Number(productId)));
  };

  const handleCheckout = () => {
    navigate("/checkout/information");
  };

  // OTHER FUNCTIONS
  const decrementQuantity = (product) => {
    if (product.quantity === 1) return;

    dispatch(
      addToCart({
        //? Spread all properties in 'product' and only decrement 'quantity'
        ...product,
        quantity: product.quantity - 1,
      })
    );
  };

  const incrementQuantity = (product) => {
    if (product.quantity === 10) return;

    dispatch(
      addToCart({
        //? Spread all properties in 'product' and only increment 'quantity'
        ...product,
        quantity: product.quantity + 1,
      })
    );
  };

  // CURRENCY LOCALIZATION Function
  function localize(amount) {
    return Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(amount);
  }

  return (
    <>
      {/* NAVBAR */}
      <Navbar marginBottom={"7rem"} />
      <section id="cart">
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <CartEmpty />
        ) : (
          <>
            <div className="cart-titles">
              <h2 className="product-title">Product</h2>
              <h2 className="quantity-title">Quantity</h2>
              <h2 className="total-title">Total</h2>
            </div>

            {cartItems.length >= 1 && cartItems.map((eachItem, index) => (
              <div key={index} className="product">
                <div className="product-details">
                  <div className="product-image">
                    <img
                      src={eachItem.image}
                      alt={eachItem.productTitle}
                    />
                  </div>
                  <div className="product-detail">
                    <p style={{ textTransform: "capitalize" }}>{eachItem.productTitle}</p>
                    <p>
                      {eachItem.size && `${eachItem.size} / `}
                      {eachItem.goldColor && `${eachItem.goldColor}`}
                      {eachItem.stone && ` / ${eachItem.stone}`}
                      {eachItem.enamel && ` / ${eachItem.enamel}`}
                      {eachItem.hook && ` / ${eachItem.hook}`}
                    </p>
                    <p>{localize(eachItem.price)}</p>
                  </div>
                </div>
                <div className="quantity-selector">
                  <div className="cart-item-adjustment">
                    <div className="quantity-adjuster">
                      <button onClick={() => decrementQuantity(eachItem)}>
                        &#8722;
                      </button>
                      <p>{eachItem.quantity}</p>
                      <button onClick={() => incrementQuantity(eachItem)}>
                        &#43;
                      </button>
                    </div>
                    <div className="item-remove">
                      <button onClick={() => handleDelete(eachItem.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className="price">
                  <p>{localize(eachItem.price * eachItem.quantity)}</p>
                </div>
              </div>
            ))}

            <div className="bottom">
              <div className="last-column">
                <div className="total-price">
                  <p>TOTAL: {localize(totalPrice)}</p>
                </div>
                <div className="tax-statement">
                  <p>Shipping & taxes calculated at checkout</p>
                </div>
                <div className="checkout-button">
                  <button onClick={handleCheckout}>Checkout</button>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
      <Footer marginTop='7rem' />
    </>
  );
};

export default Cart;
