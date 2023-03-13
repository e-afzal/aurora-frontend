import React from 'react';

const CartEmpty = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: "1rem" }}>
      <p style={{ marginTop: "1rem" }}>Your cart is currently empty.</p>
      <button style={{ width: "23.5rem", marginTop: "1.5rem", paddingInline: "1.3rem", paddingBlock: "1.7rem" }}>
        <a style={{ width: "100%", display: "block", textTransform: "uppercase", color: "#fff" }} href="/collections/all">shop all products</a>
      </button>
    </div>
  );
};

export default CartEmpty;