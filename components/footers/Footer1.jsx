"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { menuItems, socialLinks } from "@/data/footerLinks";
export default function Footer1({ parentClass = "footer" }) {


  const handleScrollLink = (e, href) => {
    // Check if it's an anchor link
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <footer id="footer" className={parentClass}>
      <div className="footer-wrap">
        <div className="footer-body">
          <div className="tf-container">
            <div className="row">
              <div className="col-12">
                <div className="footer-body-wrap flex justify-between">
                  <div
                    className="footer-more-infor wow fadeInUp"
                    data-wow-delay="0s"
                  >
                    <div className="footer-logo">
                      <Link href={`/`} style={{ backgroundColor: '#000000', padding: '10px', borderRadius: '4px', display: 'inline-block' }}>
                        <Image
                          alt="Company Logo"
                          src="/images/logo.png"
                          width={123}
                          height={36}
                        />
                      </Link>
                    </div>
                    <ul className="address">
                      <li className="flex gap-10 items-center">
                        <div className="icon">
                          <i className="flaticon-location" />
                        </div>
                        <p>
                          305 Shree Vardhan Complex, Indore, Madhya Pradesh
                        </p>
                      </li>

                      <li className="flex gap-10 items-center">
                        <div className="icon">
                          <i className="flaticon-call" />
                        </div>
                        <p>0731-4087302</p>
                      </li>
                      <li className="flex gap-10 items-center">
                        <div className="icon">
                          <i className="flaticon-mail-1" />
                        </div>
                        <p>support@ekmatgyanjyoti.com</p>
                      </li>
                    </ul>
                    <ul className="tf-social-icon flex items-center gap-10">
                      {socialLinks.map((link, index) => (
                        <li key={index}>
                          <a href={link.href}>
                            <i className={link.icon} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {menuItems.map((menu, index) => (
                    <div
                      key={index}
                      className="footer-menu-list wow fadeInUp"
                      data-wow-delay={menu.delay}
                    >
                      <h5 className="fw-5">{menu.title}</h5>
                      <ul>
                        {menu.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            {link.href.startsWith("/") ? (
                              <Link href={link.href}>{link.name}</Link>
                            ) : link.href.startsWith("#") ? (
                              <a href={link.href} onClick={(e) => handleScrollLink(e, link.href)}>
                                {link.name}
                              </a>
                            ) : (
                              <a href={link.href}>{link.name}</a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom wow fadeInUp" data-wow-delay="0s">
          <div className="tf-container">
            <div className="row">
              <div className="col-12">
                <div className="footer-bottom-wrap flex justify-center items-center">
                  <p>© Ekmat Gyan Jyoti 2025 — All rights reserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}