"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

export default function SimpleNav() {
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
      <li className={pathname === "/" ? "current" : ""}>
        <Link href="/" onClick={(e) => {
          e.preventDefault();
          scrollToSection("wrapper");
        }}>
          Home
        </Link>
      </li>
      <li className={pathname === "/about" ? "current" : ""}>
        <Link href="/about" onClick={(e) => {
          e.preventDefault();
          const aboutSection = document.getElementById("about-section");
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
          } else {
            // If about section is not on current page, navigate to about page
            window.location.href = "/about";
          }
        }}>
          About
        </Link>
      </li>
      <li className={pathname === "/testimonials" ? "current" : ""}>
        <Link href="/testimonials" onClick={(e) => {
          e.preventDefault();
          const testimonialsSection = document.getElementById("testimonials-section");
          if (testimonialsSection) {
            testimonialsSection.scrollIntoView({ behavior: "smooth" });
          } else {
            // If testimonials section is not on current page, navigate to testimonials page
            window.location.href = "/testimonials";
          }
        }}>
          Testimonials
        </Link>
      </li>
      <li>
        <span onClick={openContactForm} style={{ cursor: 'pointer' }}>
          Contact us
        </span>
      </li>

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
                  id="name" 
                  name="name" 
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="form-group">
                <textarea 
                  id="message" 
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