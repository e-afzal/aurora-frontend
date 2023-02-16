import React from 'react';

const CartEmpty = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: "3.5rem" }}>
      <p>Your cart is empty.</p>
      <button style={{ width: "50%", marginTop: "1.5rem" }}>
        <a style={{ width: "100%", display: "block", textTransform: "uppercase", color: "#fff" }} href="/collections/all">shop all products</a>
      </button>
    </div>
  );
};

export default CartEmpty;