import { useEffect, useState, useRef } from 'react';
import fedexList from '../script/fedexList';
import '../styles/addressModal.css';
import axios from "axios";

const AddressModal = ({ setNewUserInfo, userId }) => {
  const modalRef = useRef();
  const [modalAddress, setModalAddress] = useState({
    address: "",
    apartment: "",
    city: "",
    country: "",
    phone: ""
  });

  // Modal Javascript Code
  useEffect(() => {
    const addAddress = document.querySelector("button.add-address");
    const modal = document.querySelector(".modal");
    const cancelIcon = document.querySelector(".cancel-icon img");
    const modalContent = document.querySelector(".modal-content");

    // Open Modal
    addAddress.addEventListener("click", () => {
      modal.style.display = "block";
      modalContent.style.marginTop = "3rem";
    });

    // Close Modal
    cancelIcon.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
      if (e.target.className === "modal") {
        modal.style.display = "none";
        return;
      }
    });
  }, []);

  // HANDLERS
  // Local 'modal' change
  const handleChange = (e) => {
    setModalAddress(prevState => {
      return {
        ...prevState,
        [e.target.name]: e.target.value.trim()
      };
    });
  };

  // HANDLERS
  const handleCountrySelect = (e) => {
    setModalAddress((prevState) => {
      return {
        ...prevState,
        country: e.target.value || "Afghanistan",
      };
    });
  };

  const handleCountry = (e) => {
    setModalAddress((prevState) => {
      return {
        ...prevState,
        country: e.target.value || "Afghanistan",
      };
    });
  };

  //Submit change to 'addresses' page
  const submitChange = () => {
    //? Explanation:
    //? Send new address data (modalAddress) for updating user address
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/users/changeAddress`, { user_id: userId, ...modalAddress })
      .then(res => {
        //? Extract 'user' from current 'userInfo' in localStorage due to using Redux
        const userInfo = JSON.parse(localStorage.getItem("userInfo")).user;
        //? Format structure as needed to be added in the localStorage again WITH the 'res.data' response from backend
        const modifiedUser = {
          user: {
            ...userInfo,
            addresses: res.data.addresses
          }
        };
        //? Stringify above structure as per REDUX requirement
        localStorage.setItem("userInfo", JSON.stringify(modifiedUser));
        //? Took 'modifiedUser' structure and below state from 'addresses.jsx'
        setNewUserInfo(modifiedUser);
        //? Close modal after done
        modalRef.current.style.display = "none";
      })
      .catch(error => console.log(error.message));
  };

  return (
    <div className="modal" style={{ height: "auto", bottom: 0 }} ref={modalRef}>
      <div className="modal-content">
        <div className="cancel-icon">
          <img
            src="/images/homepage/icons/close-icon-black.svg"
            alt="Cancel Icon"
          />
        </div>
        <h4>add a new address</h4>
        <p>Please fill in the information below:</p>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Enter address"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="apartment"
          id="apartment"
          placeholder="Enter building/villa name & number"
          required
          onChange={handleChange}
        />
        <input style={{ width: "75%" }} type="text" name="city" id="city" placeholder="Enter city" required onChange={handleChange} />
        <select
          name="country"
          id="country"
          required
          onChange={handleCountrySelect}
          defaultValue={"Afghanistan"}
        >
          {fedexList.map((each, index) => (
            <option key={index} onClick={handleCountry} value={each.country} id={"country"}>{each.country}</option>
          ))}
        </select>
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="Enter phone number"
          onChange={handleChange}
        />

        <button className="add" onClick={submitChange}>Add address</button>
      </div>
    </div>
  );
};

export default AddressModal;