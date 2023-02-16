import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// GENERAL
import Home from "./pages/index";
import Conditions from "./pages/conditions";
import Contact from "./pages/contact";

// ACCOUNT
import Signup from "./pages/account/signup";
import Login from "./pages/account/login";
import Overview from "./pages/account/dashboard/overview";
import MyAddresses from "./pages/account/dashboard/addresses";
import OrderDetails from "./pages/account/dashboard/order";

// CHECKOUT
import Cart from "./pages/checkout/cart";
import Confirmation from "./pages/checkout/confirmation";
import Information from "./pages/checkout/information";
import Shipping from "./pages/checkout/shipping";

// COLLECTIONS
import MainCollection from "./pages/collections/mainCollection";
import CollectionsProducts from "./pages/collections/CollectionsProducts";
import CollectionProducts from "./pages/products/collectionProducts";

// PRODUCTS
import CategoryProducts from "./pages/products/categoryProducts";
import Search from "./pages/products/searchProducts";
import SingleProduct from "./pages/products/singleProduct";

// TEST
import PaginatedProducts from "./pages/products/paginatedProducts";

function App() {
  //! EMPTY 'userInfo' || 'cartItems' from 'localStorage' on tab/page close:
  // window.onbeforeunload = function () {
  //   localStorage.clear();
  // };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/contact" element={<Contact />} />

          {/* ACCOUNT */}
          <Route path="/account/signup" element={<Signup />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/dashboard" element={<Overview />} />
          <Route path="/account/dashboard/address" element={<MyAddresses />} />
          <Route
            path="/account/dashboard/order/:order_id"
            element={<OrderDetails />}
          />

          {/* CHECKOUT */}
          <Route path="/checkout/cart" element={<Cart />} />
          <Route path="/checkout/information" element={<Information />} />
          <Route path="/checkout/shipping" element={<Shipping />} />
          <Route path="/checkout/confirmation" element={<Confirmation />} />

          {/* COLLECTIONS */}
          <Route
            path="/collections/main/:main_jewelry_title"
            element={<MainCollection />}
          />
          <Route path="/collections/all" element={<CollectionsProducts />} />
          <Route
            path="/collections/:collection_name"
            element={<CollectionProducts />}
          />

          {/* PRODUCTS */}
          <Route path="/products/paginated" element={<PaginatedProducts />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/search/:query" element={<Search />} />

          <Route
            path="/products/category/:category_type"
            element={<CategoryProducts />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
