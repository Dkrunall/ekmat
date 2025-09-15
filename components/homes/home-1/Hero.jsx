"use client";
import { categories } from "@/data/categories";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
export default function Hero() {
  const swiperOptions = {
    spaceBetween: 20,
    observer: true,
    loop: true,
    observeParents: true,
    breakpoints: {
      0: {
        slidesPerView: 1.5,
        spaceBetween: 15,
      },
      700: {
        slidesPerView: 4,
      },
      1000: {
        slidesPerView: 7,
      },
      1440: {
        slidesPerView: 10,
      },
    },

    navigation: {
      clickable: true,
      nextEl: ".courses10-next",
      prevEl: ".courses10-prev",
    },
  };
  return (
    <div className="page-title-home1">
      <div className="tf-container">
        <div className="row items-center">
          <div className="col-lg-7">
            <div className="content">
              <div className="box-sub-tag wow fadeInUp" data-wow-delay="0s">
                <div className="sub-tag-icon">
                  <i className="icon-flash" />
                </div>
                <div className="sub-tag-title">
                  <p>India's #1 Online Learning Platform</p>
                </div>
              </div>
              <h1
                className="fw-7 font-cardo wow fadeInUp"
                data-wow-delay="0.1s"
              >
                Get <span className="tf-secondary-color">2500+</span> Best
                Online <br />
                Courses From Expert Instructors
              </h1>
              <h6 className="wow fadeInUp" data-wow-delay="0.2s">
                Master new skills with our expert-led courses, live interactive sessions, 
                and personalized learning. Join 500,000+ satisfied students who transformed 
                their careers with Ekmat Gyan Jyoti.
              </h6>
              <div className="bottom-btns">
                {/* Hidden "Book a Free Class" button as per user request */}
                {/* <span
                  className="tf-btn wow fadeInUp rounded-full"
                  data-wow-delay="0.3s"
                >
                  Book a Free Class
                  <i className="icon-arrow-top-right" />
                </span> */}
                {/* Hidden "Explore courses" button as per user request */}
                {/* <span
                  className="tf-btn style-third wow fadeInUp rounded-full"
                  data-wow-delay="0.4s"
                >
                  Explore courses
                  <i className="icon-arrow-top-right" />
                </span> */}
                <div className="box-agent wow fadeInUp" data-wow-delay="0.5s">
                  <ul className="agent-img-list">
                    <li className="agent-img-item">
                      <Image
                        className="ls-is-cached lazyloaded rounded-full"
                        alt="Arjun Sharma - Successful online learner"
                        width={45}
                        height={45}
                        src="/r1.jpg"
                        style={{ objectFit: 'cover' }}
                      />
                    </li>
                    <li className="agent-img-item">
                      <Image
                        className="ls-is-cached lazyloaded rounded-full"
                        alt="Priya Patel - Career achiever"
                        width={45}
                        height={45}
                        src="/r2.jpg"
                        style={{ objectFit: 'cover' }}
                      />
                    </li>
                    <li className="agent-img-item">
                      <Image
                        className="ls-is-cached lazyloaded rounded-full"
                        alt="Rahul Verma - Professional student"
                        width={45}
                        height={45}
                        src="/r3.jpg"
                        style={{ objectFit: 'cover' }}
                      />
                    </li>
                  </ul>
                  <div className="rate">
                    <div className="ratings">
                      <i className="icon-star" />
                      <i className="icon-star" />
                      <i className="icon-star" />
                      <i className="icon-star" />
                      <i className="icon-star" />
                    </div>
                    <div className="number-rate">500k+ happy students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="image">
              {/* Main hero image - Updated with local image */}
              <Image
                className="lazyload rounded-image"
                alt="Online Learning Platform - Students attending live interactive classes with expert instructors"
                width={960}
                height={1161}
                src="/1.jpg"
                style={{ objectFit: 'cover' }}
              />
              {/* Removed decorative floating images as per user request */}
            </div>
          </div>
        </div>
      </div>
      <div className="bot-categories">
        <Swiper
          {...swiperOptions}
          className="swiper-container slider-courses-10"
          modules={[Pagination, Navigation]}
        >
          {categories.map((category, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="item">
                <div className="icon">
                  <Image
                    alt={`${category.title} - Online Learning Category`}
                    src={category.src}
                    width={category.width}
                    height={category.height}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h6>{category.title}</h6>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}