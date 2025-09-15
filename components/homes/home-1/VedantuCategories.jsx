import React from "react";
import Link from "next/link";
import { vedantuCategories } from "@/data/categories";

export default function VedantuCategories() {
  return (
    <section className="tf-spacing-6 section-categories pt-0">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center mb-40">
              <h2 className="font-cardo fw-7 wow fadeInUp" data-wow-delay="0s">
                Browse By Categories
              </h2>
              <div className="sub fs-15 wow fadeInUp" data-wow-delay="0.2s">
                Explore our wide range of educational categories designed to help you excel in your studies
              </div>
            </div>
          </div>
          
          {vedantuCategories.map((category, index) => (
            <div 
              key={category.id} 
              className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" 
              data-wow-delay={`${0.1 * (index + 1)}s`}
            >
              <div className="category-item hover-img mb-30">
                <div className="content text-center">
                  <div className="category-icon mb-15">
                    <span className="icon fs-30">{category.icon}</span>
                  </div>
                  <h5 className="fw-6">{category.title}</h5>
                  <p className="fs-14 mb-10">{category.description}</p>
                  <div className="courses-count fs-14 fw-5">{category.courses}</div>
                  <Link href="#" className="tf-btn-arrow rounded-full mt-15">
                    <span className="fw-5 fs-15">Explore</span>
                    <i className="icon-arrow-top-right" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}