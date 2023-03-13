import { useState, useEffect } from "react";
import '../styles/conditions.css';
import axios from 'axios';
import { Helmet } from "react-helmet";

// COMPONENT(S)
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Conditions = () => {
  const [conditions, setConditions] = useState(null);
  const [formattedConditions, setFormattedConditions] = useState({
    shipping: [],
    refundAndExchange: [],
    accountsAndMembership: [],
    repairsAndDefects: [],
    payment: [],
    websiteUsage: [],
    shoppingAtAurora: [],
    pricingPolicy: [],
    propertyAndRisk: [],
    safetyOfPersonalDetails: [],
    copyrightAndTrademarks: [],
    content: [],
    thirdPartyLinks: [],
    acceptanceOfTerms: [],
    backups: [],
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/conditions/condition`).then(res => {
      setConditions(res.data);
    }).catch(error => console.log(error.message));
  }, []);

  useEffect(() => {
    if (conditions !== null) {
      setFormattedConditions(prevState => {
        return {
          shipping: conditions.shipping.split("|"),
          refundAndExchange: conditions.refundAndExchange.split("|"),
          accountsAndMembership: conditions.accountsAndMembership.split("|"),
          repairsAndDefects: conditions.repairsAndDefects.split("|"),
          payment: conditions.payment.split("|"),
          websiteUsage: conditions.websiteUsage.split("|"),
          shoppingAtAurora: conditions.shoppingAtAurora.split("|"),
          pricingPolicy: conditions.pricingPolicy.split("|"),
          propertyAndRisk: conditions.propertyAndRisk.split("|"),
          safetyOfPersonalDetails: conditions.safetyOfPersonalDetails.split("|"),
          copyrightAndTrademarks: conditions.copyrightAndTrademarks.split("|"),
          content: conditions.content.split("|"),
          thirdPartyLinks: conditions.thirdPartyLinks.split("|"),
          acceptanceOfTerms: conditions.acceptanceOfTerms.split("|"),
          backups: conditions.backups.split("|"),
        };
      });
    }
  }, [conditions]);

  return (
    <>
      {/* SEO MARKUP */}
      <Helmet>
        <title>Terms &amp; Conditions – Aurora Jewelry</title>
        <meta name="description" content="Aurora Jewely Terms and Conditions" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Aurora Jewelry Terms and Conditions" />
        <meta property="og:site_name" content="Aurora Jewelry" />
        <meta property="og:description" content="Aurora Jewely Terms and Conditions" />
        <meta property="og:url" content="https://aurorajewelry.ae/conditions" />
      </Helmet>

      <Navbar marginBottom={"5rem"} />
      {conditions !== null && (
        <div>
          <section id="conditions">
            <h2>terms and conditions</h2>

            <div className="condition conditions-shipping">
              <h3>1. SHIPPING</h3>
              {formattedConditions.shipping.map(shipping => (
                <p>{shipping}</p>
              ))}
            </div>
            <div className="condition refund">
              <h3>2. refund and exchange</h3>
              {formattedConditions.refundAndExchange.map(shipping => (
                <p>{shipping}</p>
              ))}
            </div>
            <div className="condition account">
              <h3>3. accounts and membership</h3>
              {formattedConditions.accountsAndMembership.map(shipping => (
                <p>{shipping}</p>
              ))}
            </div>
            <div className="condition repair">
              <h3>4. Repairs and defects</h3>
              {formattedConditions.repairsAndDefects.map(shipping => (
                <p>{shipping}</p>
              ))}
            </div>
            <div className="condition payment">
              <h3>5. Payment</h3>
              {formattedConditions.payment.map(shipping => (
                <p>{shipping}</p>
              ))}
            </div>
            <div className="condition usage">
              <h3>6. Website usage</h3>
              {formattedConditions.websiteUsage.map(shipping => (
                <p>{shipping}</p>
              ))}
            </div>
            <div className="condition shopping">
              <h3>7. Shopping at aurorajewelry.ae</h3>
              {formattedConditions.shoppingAtAurora.map(shipping => (
                <p>{shipping}</p>
              ))}
            </div>
            <div className="condition pricing">
              <h3>8. Pricing Policy</h3>
              {formattedConditions.pricingPolicy.map(shipping => (
                <p>{shipping}</p>
              ))}
            </div>
            <div className="condition risk">
              <h3>9. Passing of property and risk</h3>
              {formattedConditions.propertyAndRisk.map(shipping => (
                <p>{shipping}</p>
              ))}
            </div>
            <div className="condition details">
              <h3>10. safety of personal details</h3>
              {formattedConditions.safetyOfPersonalDetails.map(shipping => (
                <p>{shipping}</p>
              ))}
            </div>
            <div className="condition copyright">
              <h3>11. copyright and trademarks</h3>
              {formattedConditions.copyrightAndTrademarks.map(shipping => (
                <p>{shipping}</p>
              ))}
            </div>
            <div className="condition content">
              <h3>12. Content</h3>
              {formattedConditions.content.map(shipping => (
                <p>{shipping}</p>
              ))}
            </div>
            <div className="condition links">
              <h3>13. third-party links</h3>
              {formattedConditions.thirdPartyLinks.map(shipping => (
                <p>{shipping}</p>
              ))}
            </div>
            <div className="condition acceptance">
              <h3>14. acceptance of terms</h3>
              {formattedConditions.acceptanceOfTerms.map(shipping => (
                <p>{shipping}</p>
              ))}
            </div>
            <div className="condition backup">
              <h3>15. backup</h3>
              {formattedConditions.backups.map(shipping => (
                <p>{shipping}</p>
              ))}
            </div>
          </section>
          <Footer />
        </div>
      )}

    </>
  );
};

export default Conditions;
