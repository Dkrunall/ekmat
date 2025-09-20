"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function SimpleMobileNav() {
  const pathname = usePathname();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openContactForm = () => {
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  return (
    <>
      <div className="offcanvas offcanvas-start mobile-menu" tabIndex="-1" id="offcanvasMenu">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link 
                className={`nav-link ${pathname === "/" ? "active" : ""}`} 
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("wrapper");
                  // Close the offcanvas
                  const offcanvas = document.getElementById('offcanvasMenu');
                  if (offcanvas) {
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                    if (bsOffcanvas) bsOffcanvas.hide();
                  }
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${pathname === "/about" ? "active" : ""}`} 
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  const aboutSection = document.getElementById("about-section");
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: "smooth" });
                  } else {
                    // If about section is not on current page, navigate to about page
                    window.location.href = "/about";
                  }
                  // Close the offcanvas
                  const offcanvas = document.getElementById('offcanvasMenu');
                  if (offcanvas) {
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                    if (bsOffcanvas) bsOffcanvas.hide();
                  }
                }}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${pathname === "/teachers" ? "active" : ""}`} 
                href="/teachers"
                onClick={(e) => {
                  e.preventDefault();
                  const teachersSection = document.getElementById("teachers-section");
                  if (teachersSection) {
                    teachersSection.scrollIntoView({ behavior: "smooth" });
                  } else {
                    // If teachers section is not on current page, navigate to teachers page
                    window.location.href = "/teachers";
                  }
                  // Close the offcanvas
                  const offcanvas = document.getElementById('offcanvasMenu');
                  if (offcanvas) {
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                    if (bsOffcanvas) bsOffcanvas.hide();
                  }
                }}
              >
                Teachers
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${pathname === "/field-executive" ? "active" : ""}`} 
                href="/field-executive"
                onClick={(e) => {
                  e.preventDefault();
                  const fieldExecutiveSection = document.getElementById("field-executive-section");
                  if (fieldExecutiveSection) {
                    fieldExecutiveSection.scrollIntoView({ behavior: "smooth" });
                  } else {
                    // If field executive section is not on current page, navigate to field executive page
                    window.location.href = "/field-executive";
                  }
                  // Close the offcanvas
                  const offcanvas = document.getElementById('offcanvasMenu');
                  if (offcanvas) {
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                    if (bsOffcanvas) bsOffcanvas.hide();
                  }
                }}
              >
                Field Executive
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${pathname === "/testimonials" ? "active" : ""}`} 
                href="/testimonials"
                onClick={(e) => {
                  e.preventDefault();
                  const testimonialsSection = document.getElementById("testimonials-section");
                  if (testimonialsSection) {
                    testimonialsSection.scrollIntoView({ behavior: "smooth" });
                  } else {
                    // If testimonials section is not on current page, navigate to testimonials page
                    window.location.href = "/testimonials";
                  }
                  // Close the offcanvas
                  const offcanvas = document.getElementById('offcanvasMenu');
                  if (offcanvas) {
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                    if (bsOffcanvas) bsOffcanvas.hide();
                  }
                }}
              >
                Testimonials
              </Link>
            </li>
            <li className="nav-item">
              <span 
                className="nav-link" 
                onClick={() => {
                  openContactForm();
                  // Close the offcanvas
                  const offcanvas = document.getElementById('offcanvasMenu');
                  if (offcanvas) {
                    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                    if (bsOffcanvas) bsOffcanvas.hide();
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                Contact us
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Contact Form Popup */}
      {isContactFormOpen && (
        <div className="contact-popup-overlay">
          <div className="contact-popup">
            <button 
              onClick={closeContactForm}
              className="close"
            >
              &times;
            </button>
            <h3>Get in Touch</h3>
            <p className="subtitle">Have questions or want to learn more about our courses? Our team is here to help you achieve your learning goals.</p>
            <form>
              <div className="form-group">
                <input 
                  type="text" 
                  id="mobile-name" 
                  name="name" 
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  id="mobile-email" 
                  name="email" 
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="form-group">
                <textarea 
                  id="mobile-message" 
                  name="message" 
                  rows="5"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="tf-btn"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}