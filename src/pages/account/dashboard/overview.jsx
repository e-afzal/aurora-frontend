import '../../../styles/account.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

// REDUX RELATED
import { useDispatch } from "react-redux";
import { logout } from '../../../reducers/userReducer';

// COMPONENTS
import Navbar from '../../../components/Navbar';
import Footer from "../../../components/Footer";

const Overview = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const dispatch = useDispatch();
  // const user = useSelector(state => state.userInfo.user);
  // const [userInfo, setUserInfo] = useState(null);
  // const [dashboardInfo, setDashboardInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (!isLoading && user.email) {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register/auth0`, { email: user.email })
        .then(res => {
          // setDashboardInfo(res.data);
          setUserInfo(res.data.data);
        })
        .catch(error => console.log(error.message));
    }
  }, [isLoading]);

  // useEffect(() => {
  //   // Setting userInfo
  //   const user = JSON.parse(localStorage.getItem("userInfo"));
  //   setUserInfo(user.user);
  //   // Fetch dashboard info
  //   axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/overview`, { user_id: user.user.id })
  //     .then(res => {
  //       setDashboardInfo(res.data);
  //     })
  //     .catch(error => console.log(error.message));
  // }, []);

  const handleLogout = () => {
    // dispatch(logout());
  };

  // CURRENCY LOCALIZATION Function
  function localize(amount) {
    return Intl.NumberFormat("en-AE", { style: "currency", currency: "AED" }).format(amount);
  }

  // if (!isAuthenticated) {
  //   return (
  //     <>
  //       <h1>Not logged in</h1>
  //     </>
  //   );
  // }

  if (isAuthenticated) {
    return (
      <>
        <Navbar marginBottom={"5.5rem"} />
        <h1>Dashboard</h1>
        <section className="account-container">
          <button
            onClick={() => logout()}
            // onClick={handleLogout} 
            className="logout"
          >LOGOUT</button>
          <h4>my account</h4>
          <div className="account-grid">
            <section id="orders">
              <table>
                <thead>
                  <tr>
                    <th>order</th>
                    <th>date</th>
                    {/* <th>payment status</th> */}
                    <th>fulfillment status</th>
                    <th>total</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <a href={`/account/dashboard/order/1`}>
                        #1
                      </a>
                    </td>
                    <td>order date</td>
                    {/* <td>paid</td> */}
                    <td>full status</td>
                    <td>total amount</td>
                  </tr>
                </tbody>

              </table>
            </section>

            <section id="address">
              <h4>primary address</h4>
              <p className="name" style={{ textTransform: "capitalize" }}>Sam Rogers</p>
              <p className="address">User address</p>
              <p className="apartment">User apartment</p>
              <p className="city">User city</p>
              <p className="country">User country</p>
              <button>
                <a href={"/account/dashboard/address"}>edit addresses</a>
              </button>
            </section>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // if (dashboardInfo !== null && dashboardInfo.status === "success" && dashboardInfo.user.orders.length === 0) {
  //   return (
  //     <>
  //       <Navbar marginBottom={"5.5rem"} />
  //       <div style={{ marginTop: "10rem", marginBottom: "15rem", display: "flex", justifyContent: "center", flexDirection: "column" }}>
  //         <a href='/account/login' onClick={handleLogout} className="logout">LOGOUT</a>
  //         <h1 style={{ textAlign: "center" }}>No orders to display</h1>
  //         <p style={{ textAlign: "center" }}>No order has been placed. Please have a look at our latest offerings.</p>
  //         <a style={{ marginInline: "auto", padding: "1.7rem 1.5rem", backgroundColor: "#000", borderRadius: "2.5px" }} href="/collections/all">VIEW PRODUCTS</a>
  //       </div>
  //     </>
  //   );
  // }

  // if (dashboardInfo !== null && dashboardInfo.status === "success" && dashboardInfo.user.orders.length >= 1) {
  // if (isAuthenticated) {
  //   return (
  //     <>
  //       <Navbar marginBottom={"5.5rem"} />
  //       <section className="account-container">
  //         <a href='/account/login'
  //           onClick={logout({ logoutParams: { returnTo: window.location.origin } })}
  //           // onClick={handleLogout} 
  //           className="logout"
  //         >LOGOUT</a>
  //         <h4>my account</h4>
  //         <div className="account-grid">
  //           <section id="orders">
  //             <table>
  //               <thead>
  //                 <tr>
  //                   <th>order</th>
  //                   <th>date</th>
  //                   {/* <th>payment status</th> */}
  //                   <th>fulfillment status</th>
  //                   <th>total</th>
  //                 </tr>
  //               </thead>

  //               <tbody>
  //                 <tr>
  //                   <td>
  //                     <a href={`/account/dashboard/order/1`}>
  //                       #1
  //                     </a>
  //                   </td>
  //                   <td>order date</td>
  //                   {/* <td>paid</td> */}
  //                   <td>full status</td>
  //                   <td>total amount</td>
  //                 </tr>

  //                 {/* {dashboardInfo.user.orders.map((eachOrder, index) => ( */}
  //                 {/* <tr key={index}>
  //                     <td>
  //                       <a href={`/account/dashboard/order/${eachOrder.orderNumber}`}>
  //                         #{eachOrder.orderNumber}
  //                       </a>
  //                     </td>
  //                     <td>{new Date(eachOrder.createdAt).toLocaleDateString("en-AE")}</td>
  //                     {/* <td>paid</td> */}
  //                 {/* <td>{eachOrder.fulfillmentStatus}</td> */}
  //                 {/* <td>{localize(eachOrder.totalAmt)}</td> */}
  //                 {/* </tr>} */}
  //                 {/* ))} */}
  //               </tbody>

  //             </table>
  //           </section>

  //           <section id="address">
  //             {/* <h4>primary address</h4>
  //             <p className="name" style={{ textTransform: "capitalize" }}> {`${dashboardInfo.user.first_name} ${dashboardInfo.user.last_name}`} </p>
  //             <p className="address">{`${dashboardInfo.user.addresses.address}`}</p>
  //             <p className="apartment">{`${dashboardInfo.user.addresses.apartment}`}</p>
  //             <p className="city">{`${dashboardInfo.user.addresses.city}`}</p>
  //             <p className="country">{`${dashboardInfo.user.addresses.country}`}</p>
  //             <button>
  //               <a href={"/account/dashboard/address"}>edit addresses</a>
  //             </button> */}
  //             <h4>primary address</h4>
  //             <p className="name" style={{ textTransform: "capitalize" }}>Sam Rogers</p>
  //             <p className="address">User address</p>
  //             <p className="apartment">User apartment</p>
  //             <p className="city">User city</p>
  //             <p className="country">User country</p>
  //             <button>
  //               <a href={"/account/dashboard/address"}>edit addresses</a>
  //             </button>
  //           </section>
  //         </div>
  //       </section>
  //     </>

  //   );
  // }
};



export default Overview;

