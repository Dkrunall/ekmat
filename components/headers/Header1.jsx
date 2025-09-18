"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import SimpleNav from "./SimpleNav";
import SimpleMobileNav from "./SimpleMobileNav";

export default function Header1() {
  return (
    <header id="header_main" className="header" style={{ backgroundColor: '#000000' }}>
      <div className="header-inner">
        <div className="header-inner-wrap">
          <div className="header-left flex-grow">
            <div id="site-logo">
              <span rel="home" style={{ backgroundColor: '#000000', padding: '5px', borderRadius: '4px', display: 'inline-block' }}>
                <Image
                  id="logo-header"
                  alt="Company Logo"
                  src="/images/logo.png"
                  width={123}
                  height={36}
                />
              </span>
            </div>
          </div>
          <div className="header-right">
            <a
              className="mobile-nav-toggler mobile-button d-lg-none flex"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
            >
              <i className="icon-menu" style={{ color: 'white', fontSize: '24px' }}></i>
            </a>
            <nav className="main-menu d-none d-lg-block">
              <ul className="navigation">
                <SimpleNav />
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <SimpleMobileNav />
      
      <style jsx>{`
        .dropdown:hover .dropdown-menu {
          display: block;
        }
        
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 1000;
          display: none;
          background-color: white;
          min-width: 160px;
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
          padding: 10px 0;
          border-radius: 4px;
        }
        
        .dropdown-menu.show {
          display: block;
        }
        
        .dropdown-menu a {
          display: block;
          padding: 8px 16px;
          text-decoration: none;
          color: #333;
        }
        
        .dropdown-menu a:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </header>
  );
}