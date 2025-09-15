"use client";
import { categories, menuItems } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function MobileMenu() {
  const pathname = usePathname();
  const isMenuActive = (menu) => {
    let isActive = false;
    if (menu.href !== "#") {
      if (pathname.split("/")[1] == menu.href?.split("/")[1]) {
        isActive = true;
      }
    }
    if (menu.subItems) {
      menu.subItems.forEach((el) => {
        if (el.href != "#") {
          if (pathname.split("/")[1] == el.href?.split("/")[1]) {
            isActive = true;
          }
        }
        if (el.subItems) {
          el.subItems.map((elm) => {
            if (elm.href != "#") {
              if (pathname.split("/")[1] == elm.href?.split("/")[1]) {
                isActive = true;
              }
            }
          });
        }
      });
    }
    return isActive;
  };
  return (
    <>
      {/* Offcanvas for Mobile Menu */}
      <div
        className="offcanvas offcanvas-start mobile-menu"
        tabIndex={-1}
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasMenuLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <ul className="list-group">
            {[
              { title: "Categories", subItems: categories, noActive: true },
              ...menuItems,
            ].map((item, index) => (
              <li
                className={`list-group-item ${
                  item.noActive ? "disabled-active-menu" : ""
                }`}
                key={index}
              >
                {item.subItems ? (
                  <>
                    <span
                      className={`submenu-toggle collapsed ${
                        isMenuActive(item) ? "activeMenu" : ""
                      }`}
                      data-bs-toggle="collapse"
                      data-bs-target={`#menu${index}`}
                    >
                      {item.title}
                    </span>
                    <ul id={`menu${index}`} className="list-group collapse">
                      {item.subItems.map((subItem, subIndex) => (
                        <li className="list-group-item" key={subIndex}>
                          {subItem.subItems ? (
                            <>
                              <span
                                className={`submenu-toggle collapsed  ${
                                  isMenuActive(subItem) ? "activeMenu" : ""
                                }`}
                                data-bs-toggle="collapse"
                                data-bs-target={`#submenu${index}-${subIndex}`}
                              >
                                {subItem.title}
                              </span>
                              <ul
                                id={`submenu${index}-${subIndex}`}
                                className="list-group collapse"
                              >
                                {subItem.subItems.map(
                                  (subSubItem, subSubIndex) => (
                                    <li
                                      className="list-group-item"
                                      key={subSubIndex}
                                    >
                                      <span
                                        className={` nav-link-mobile  ${
                                          isMenuActive(subSubItem)
                                            ? "activeMenu"
                                            : ""
                                        }`}
                                      >
                                        {subSubItem.title}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </>
                          ) : (
                            <span
                              className={` nav-link-mobile  ${
                                isMenuActive(subItem) ? "activeMenu" : ""
                              }`}
                            >
                              {subItem.title}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <span
                    className={`nav-link-mobile   ${
                      isMenuActive(item) ? "activeMenu" : ""
                    }`}
                  >
                    {item.title}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
