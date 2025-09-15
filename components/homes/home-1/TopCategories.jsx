import React from "react";
import Link from "next/link";
import { vedantuCategories } from "@/data/categories";

export default function TopCategories() {
  // Get the first 6 categories for the top section
  const topCategories = vedantuCategories.slice(0, 6);

  return (
    <section className="tf-spacing-3 section-top-categories pt-0">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center mb-40">
              <h2 className="font-cardo fw-7 wow fadeInUp">Popular Categories</h2>
              <div className="sub fs-15 wow fadeInUp" data-wow-delay="0.2s">
                Explore our most sought-after educational categories
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="top-categories-wrap">
              {topCategories.map((category, index) => (
                <div key={category.id} className="category-card wow fadeInUp" data-wow-delay={`${0.1 * (index + 1)}s`}>
                  <div className="content">
                    <div className="category-icon mb-10">
                      <span className="icon fs-20">{category.icon}</span>
                    </div>
                    <h5 className="fw-6">{category.title}</h5>
                    <div className="courses-count fs-14">{category.courses}</div>
                  </div>
                  <Link href="#" className="tf-btn-arrow rounded-full">
                    <i className="icon-arrow-top-right" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}