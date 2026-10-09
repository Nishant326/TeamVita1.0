
import { Link } from "react-router-dom";
import {
  Anchor,
  Compass,
  GraduationCap,
  MapPin,
  ArrowUpRight,
  Github,
  Linkedin,
} from "lucide-react";
import "./pirate-layout.css";

const footerLinks = [
  { label: "Home", path: "/home" },
  { label: "About Us", path: "/about" },
  { label: "Notices", path: "/notice" },
  { label: "Study Materials", path: "/study_materials" },
  { label: "Toppers", path: "/topper" },
  { label: "My Profile", path: "/profile" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pirate-footer">
      <div className="pirate-footer-top">
        <div className="pirate-footer-container">
          <div className="pirate-footer-main">
            <div className="pirate-footer-brand">
              <Link to="/home" className="pirate-footer-logo">
                <span className="pirate-footer-mark">
                  <Anchor size={30} />
                </span>

                <span>
                  <strong>VEDORA</strong>
                  <small>INSTITUTE OF TECHNOLOGY</small>
                </span>
              </Link>

              <p className="pirate-footer-description">
                Chart your own course. Discover knowledge, build
                your skills, and sail toward a brighter future.
              </p>

              <div className="pirate-footer-motto">
                <Compass size={17} />
                <span>Knowledge is our compass.</span>
              </div>
            </div>

            <div className="pirate-footer-column">
              <h3>Explore</h3>
              <ul>
                {footerLinks.slice(0, 3).map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>
                      <ArrowUpRight size={14} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pirate-footer-column">
              <h3>Academics</h3>
              <ul>
                {footerLinks.slice(3).map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>
                      <ArrowUpRight size={14} />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pirate-footer-column pirate-footer-contact">
              <h3>Our Compass</h3>

              <div className="pirate-footer-contact-item">
                <GraduationCap size={19} />
                <span>
                  Learn with purpose.
                  <small>Grow with confidence.</small>
                </span>
              </div>

              <div className="pirate-footer-contact-item">
                <MapPin size={19} />
                <span>
                  Vedora Institute of Technology
                  <small>Knowledge beyond boundaries</small>
                </span>
              </div>

              <div className="pirate-footer-socials">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="pirate-footer-divider">
            <span className="pirate-footer-divider-icon">
              <Anchor size={16} />
            </span>
          </div>

          <div className="pirate-footer-bottom">
            <p>
              © {year} Vedora Institute of Technology.
              All rights reserved.
            </p>

            <p className="pirate-footer-credit">
              Crafted with <span>♥</span> for curious minds.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
