import { useEffect } from 'react';
import '../styles/footer.css';

const Footer = ({ marginTop = "10rem" }) => {
  useEffect(() => {
    // SET FOOTER YEAR
    const footerYear = document.querySelector(".footer-year");
    const currentYear = new Date().getFullYear();
    footerYear.textContent = currentYear;
  }, []);

  return (
    <footer id="footer-main" style={{ marginTop: marginTop }}>
      <div className="footer-logo">
        <img
          src="/images/homepage/aurora-logo.png"
          alt="Aurora logo"
          className="footer-logo-image"
        />
      </div>
      <div className="footer-grid">
        <div className="helpful">
          <h5>Helpful links</h5>
          <ul className="footer-list">
            <li className="footer-list-item">
              <a className="footer-link" href="/">home</a>
            </li>
            <li className="footer-list-item">
              <a className="footer-link" href="/collections/main/fine-jewelry">fine jewelry</a>
            </li>
            <li className="footer-list-item">
              <a className="footer-link" href="/conditions">terms & conditions</a>
            </li>
            <li className="footer-list-item">
              <a className="footer-link" href="/contact">contact us</a>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <div className="social">
            <h5>follow us</h5>
            <a
              href="https://instagram.com/aurorajewelryae?igshid=NDk5N2NIZjQ="
              target="_blank"
              className="social-link">instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <p>&#169; <span className="footer-year"></span> Aurora Jewelry</p>
      </div>
    </footer>
  );
};

export default Footer;