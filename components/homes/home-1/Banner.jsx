import React from "react";
import Image from "next/image";
export default function Banner() {
  return (
    <section className="section-get-started tf-spacing-3 pt-0">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="get-started-wrap flex">
              <div className="wrap-content">
                <h2
                  className="font-cardo fw-7 wow fadeInUp"
                  data-wow-delay="0s"
                >
                  Learn Latest Skills;
                  <br /> Advance&nbsp;Your Career
                </h2>
                <p className="fs-15 wow fadeInUp" data-wow-delay="0.1s">
                  Lorem ipsum dolor sit amet consectur adipiscing elit sed
                  eiusmod ex tempor incididunt labore dolore magna aliquaenim
                  minim.
                </p>
                <span
                  className="tf-btn wow fadeInUp"
                  data-wow-delay="0.2s"
                >
                  Get Started <i className="icon-arrow-top-right" />
                </span>
              </div>
              <div className="img-right">
                <Image
                  className="lazyload"
                  data-src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1370&q=80"
                  alt="Students learning latest skills and advancing their careers through online education"
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1370&q=80"
                  width={1370}
                  height={1201}
                />
                <div className="tags-list style2">
                  <ul className="tag-list">
                    <li
                      className="tag-list-item wow fadeInUp"
                      data-wow-delay="0.3s"
                    >
                      <span className="font-outfit">
                        Expert Trainers
                      </span>
                    </li>
                    <li
                      className="tag-list-item wow fadeInUp"
                      data-wow-delay="0.4s"
                    >
                      <span className="font-outfit">
                        Online Remote Learning
                      </span>
                    </li>
                    <li
                      className="tag-list-item wow fadeInUp"
                      data-wow-delay="0.5s"
                    >
                      <span className="font-outfit">
                        Lifetime Access
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}