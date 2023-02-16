import '../../../styles/addresses.css';
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import axios from "axios";

// COMPONENT(S)
import Navbar from './../../../components/Navbar';
import AddressModal from '../../../components/AddressModal';

const MyAddresses = () => {
  const user = useSelector(state => state.userInfo.user);
  const [userInfo, setUserInfo] = useState(null);
  const [newUserInfo, setNewUserInfo] = useState(null);

  useEffect(() => {
    //? newUserInfo is sent to 'AddressModal' for observing any 'newUserInfo'
    //? If any changes are made and saved, that NEW INFO will be set in 'setUserInfo'
    //? Else, the usual 'user' information is taken from the above 'user' through 'useSelector'
    setUserInfo(newUserInfo?.user || user);
  }, [newUserInfo]);

  const deleteAddress = () => {
    //? Address is not being 'deleted'. It is just being reset with EMPTY STRINGS
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users/deleteAddress`, { user_id: user.id })
      .then((res) => {
        const modifiedUser = {
          user: {
            ...user,
            addresses: res.data.addresses
          }
        };
        localStorage.setItem("userInfo", JSON.stringify(modifiedUser));
        setNewUserInfo(modifiedUser);
      })
      .catch(error => console.log(error.message));
  };

  if (userInfo === null) {
    return (
      <>
        <h2>You are not logged in</h2>
        <p>Please login to continue.</p>
      </>
    );
  }

  if (userInfo !== null) {
    return (
      <>
        {/* "Add New Address" MODAL */}
        <Navbar marginBottom={"5.5rem"} />
        <AddressModal setNewUserInfo={setNewUserInfo} userId={user.id} />

        {/* Address UI */}
        <div className="address-container">
          <section id="address">
            <Link to={"/account/dashboard"} className="back">
              back to my account
            </Link>
            <h4>my addresses</h4>
            <button className="add-address">Edit address</button>
            {userInfo.addresses.city && (
              <div className="address-grid">
                <div className="default-address">
                  <h4>Primary Address</h4>
                  <p className="name">{`${userInfo.firstName} ${userInfo.lastName}`}</p>
                  <p className="address">{`${userInfo.addresses.address}`}</p>
                  <p className="apartment">{`${userInfo.addresses.apartment}`}</p>
                  <p className="city">{`${userInfo.addresses.city}`}</p>
                  <p className="country">{`${userInfo.addresses.country}`}</p>
                  <button className="edit">edit</button>
                  <button onClick={deleteAddress} className="delete">delete</button>
                </div>
                {/* <div className="second-address">
                <h4>Secondary Address</h4>
                <p className="name">Sam Rogers</p>
                <p className="address">{addresses.secondary.address}</p>
                <p className="apartment">{addresses.secondary.apartment}</p>
                <p className="city">{addresses.secondary.city}</p>
                <p className="country">{addresses.secondary.country}</p>
                <button className="edit">edit</button>
                <button className="delete">delete</button>
              </div> */}
              </div>
            )}
          </section>
        </div>
      </>
    );
  }
};

export default MyAddresses;
