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
    </header>
  );
}