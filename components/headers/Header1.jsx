"use client";
import React, { useEffect, useRef } from "react";
import Nav from "./Nav";
import Link from "next/link";
import Image from "next/image";
import Categories from "./Categories";
import MobileNav from "./MobileNav";
export default function Header1() {
  return (
    <header id="header_main" className="header" style={{ backgroundColor: '#FFE5D7' }}>
      <div className="header-inner">
        <div className="header-inner-wrap">
          <div className="header-left flex-grow">
            <a
              className="mobile-nav-toggler mobile-button d-lg-none flex"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
            />
            <div id="site-logo">
              <span rel="home">
                <Image
                  id="logo-header"
                  alt="Company Logo"
                  src="/images/logo.png"
                  width={123}
                  height={36}
                />
              </span>
            </div>
            <div className="header-catalog">
              <span className="header-text">
                Categories
                <i className="icon-arrow-bottom" />
              </span>
              <Categories />
            </div>
            <div className="header-search flex-grow">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="form-search"
              >
                <fieldset>
                  <input
                    className=""
                    type="text"
                    placeholder="Search for anything"
                    name="text"
                    tabIndex={2}
                    defaultValue=""
                    aria-required="true"
                    required
                  />
                </fieldset>
                <div className="button-submit">
                  <button className="" type="submit">
                    <i className="icon-search fs-20" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="header-right">
            <nav className="main-menu">
              <ul className="navigation">
                <Nav />
              </ul>
            </nav>
            <span
              className="d-lg-none flex"
              data-bs-toggle="offcanvas"
              aria-controls="offcanvasLeft"
            >
              <i className="icon-search fs-20" />
            </span>
            <span
              className="header-cart flex items-center justify-center"
            >
              <i className="icon-shopcart fs-18" />
            </span>
            <div className="header-btn flex gap-10">
              <div className="header-login">
                <span className="tf-button-default header-text">
                  Log In
                </span>
              </div>
              <div className="header-register">
                <span
                  className="tf-button-default header-text black-bg"
                >
                  Sign Up
                </span>
              </div>
              <div className="d-lg-none flex">
                <span className="fs-15">
                  Join
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileNav />
    </header>
  );
}