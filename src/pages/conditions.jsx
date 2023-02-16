import { useState, useEffect } from "react";
import '../styles/conditions.css';
import axios from 'axios';

// COMPONENT(S)
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Conditions = () => {
  const [conditions, setConditions] = useState(null);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/conditions/condition`).then(res => {
      setConditions(res.data);
    }).catch(error => console.log(error.message));
  }, []);

  return (
    <>
      <Navbar marginBottom={"5rem"} />
      {conditions !== null && (
        <div>
          <section id="conditions">
            <h2
              style={{
                marginBottom: "3rem",
                textTransform: "capitalize",
                textAlign: "center",
              }}
            >
              terms and conditions
            </h2>

            <div className="condition conditions-shipping">
              <h3>SHIPPING</h3>
              <p>{conditions.shipping}</p>
            </div>
            <div className="condition refund">
              <h3>refund and exchange</h3>
              <p>{conditions.refundAndExchange}</p>
            </div>
            <div className="condition account">
              <h3>accounts and membership</h3>
              <p>{conditions.accountsAndMembership}</p>
            </div>
            <div className="condition repair">
              <h3>Repairs and defects</h3>
              <p>{conditions.repairsAndDefects}</p>
            </div>
            <div className="condition payment">
              <h3>Payment</h3>
              <p>{conditions.payment}</p>
            </div>
            <div className="condition usage">
              <h3>Website usage</h3>
              <p>{conditions.websiteUsage}</p>
            </div>
            <div className="condition shopping">
              <h3>Shopping at aurorajewelry.ae</h3>
              <p>{conditions.shoppingAtAurora}</p>
            </div>
            <div className="condition pricing">
              <h3>Pricing Policy</h3>
              <p>{conditions.pricingPolicy}</p>
            </div>
            <div className="condition risk">
              <h3>Passing of property and risk</h3>
              <p>{conditions.propertyAndRisk}</p>
            </div>
            <div className="condition details">
              <h3>safety of personal details</h3>
              <p>{conditions.safetyOfPersonalDetails}</p>
            </div>
            <div className="condition copyright">
              <h3>copyright and trademarks</h3>
              <p>{conditions.copyrightAndTrademarks}</p>
            </div>
            <div className="condition content">
              <h3>Content</h3>
              <p>{conditions.content}</p>
            </div>
            <div className="condition links">
              <h3>third-party links</h3>
              <p>{conditions.thirdPartyLinks}</p>
            </div>
            <div className="condition acceptance">
              <h3>acceptance of terms</h3>
              <p>{conditions.acceptanceOfTerms}</p>
            </div>
            <div className="condition backup">
              <h3>backup</h3>
              <p>{conditions.backups}</p>
            </div>
          </section>
          <Footer />
        </div>
      )}

    </>
  );
};

export default Conditions;
