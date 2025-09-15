import React from "react";
import Image from "next/image";
import { counters } from "@/data/facts";
import Counter from "@/components/common/Counter";
export default function Facts() {
  return (
    <section className="section-key tf-spacing-3 pt-0">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="key-wrap flex">
              <div className="key-image">
                {/* Updated with CDN image showing diverse students engaged in online learning */}
                <Image
                  className="lazyload"
                  data-src="https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1370&q=80"
                  alt="Students learning online with UpSkill - Interactive education platform"
                  src="https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1370&q=80"
                  width={1370}
                  height={1301}
                />
              </div>
              <div className="content">
                <h2
                  className="font-cardo fw-7 wow fadeInUp"
                  data-wow-delay="0s"
                >
                  Transform Your Future With Expert-Led Online Learning
                </h2>
                <p className="h6 fw-4 wow fadeInUp" data-wow-delay="0.1s">
                  Join over 500,000 students who have transformed their careers with our comprehensive online learning platform. 
                  Our expert instructors and cutting-edge curriculum provide you with the skills needed to excel in today's competitive job market.
                </p>
                <div className="counter style-2">
                  {counters.map((counter, index) => (
                    <div
                      key={index}
                      className="number-counter wow fadeInUp"
                      data-wow-delay={counter.delay}
                    >
                      <div className="counter-content">
                        <span className="number">
                          <Counter max={counter.number} />
                        </span>
                        {counter.suffix}
                      </div>
                      <p>{counter.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}