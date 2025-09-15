"use client";

import { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Testimonials({
  titleFont = "font-cardo",
  parentClass = "tf-spacing-22 widget-saying pt-0",
}) {
  const swiperOptions = {
    slidesPerView: 1,
    // centeredSlides: true,
    loop: true,
  };
  const swiperOptions2 = {
    // slidesPerView: 'auto',
    spaceBetween: 80,
    slidesPerView: 5,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    breakpoints: {
      0: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      450: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      868: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1400: {
        slidesPerView: 5,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  // Updated testimonials data with more engaging content and Indian names
  const updatedTestimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Software Engineer",
      rating: 5,
      text: "Ekmat Gyan Jyoti transformed my career! The live classes and expert instructors helped me land a job at a top tech company in Mumbai. The personalized learning path was exactly what I needed.",
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Data Scientist",
      rating: 5,
      text: "The hands-on projects and real-world applications made learning so much more effective. I went from beginner to job-ready in just 6 months. Highly recommended for Indian students!",
    },
    {
      id: 3,
      name: "Amit Kumar",
      role: "UX Designer",
      rating: 5,
      text: "The interactive sessions and doubt-clearing classes made all the difference. The instructors are truly experts in their fields and made complex topics easy to understand. Proud to be part of Ekmat Gyan Jyoti!",
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Marketing Manager",
      rating: 5,
      text: "As a working professional, I needed flexible learning options. Ekmat Gyan Jyoti's platform allowed me to learn at my own pace while still getting personalized attention from instructors.",
    },
    {
      id: 5,
      name: "Vikram Singh",
      role: "College Student",
      rating: 5,
      text: "The courses are well-structured and the instructors are incredibly supportive. I've gained skills that have helped me in both academics and internships. Worth every rupee!",
    },
    {
      id: 6,
      name: "Anjali Mehta",
      role: "Entrepreneur",
      rating: 5,
      text: "Ekmat Gyan Jyoti helped me acquire the technical skills I needed to build my startup. The community support and mentorship programs are exceptional. Truly a game-changer for Indian entrepreneurs!",
    },
    {
      id: 7,
      name: "Rohan Gupta",
      role: "Product Manager",
      rating: 5,
      text: "The career services and resume building workshops were invaluable. I received multiple job offers after completing just two courses. The ROI has been incredible!",
    },
    {
      id: 8,
      name: "Kavita Desai",
      role: "Financial Analyst",
      rating: 5,
      text: "Transitioning from finance to tech seemed impossible until I found Ekmat Gyan Jyoti. Their bootcamp-style courses and job placement assistance made the transition seamless.",
    },
    {
      id: 9,
      name: "Deepak Verma",
      role: "Graphic Designer",
      rating: 5,
      text: "The practical assignments and peer feedback system helped me improve my skills rapidly. I've already started freelancing and earning extra income!",
    },
    {
      id: 10,
      name: "Neha Choudhary",
      role: "Recent Graduate",
      rating: 5,
      text: "Ekmat Gyan Jyoti gave me the confidence and skills to compete in today's job market. The mock interviews and portfolio reviews were particularly helpful in my job search.",
    },
  ];

  // Avatar images using local r1.jpg to r5.jpg
  const avatars = [
    {
      id: 1,
      src: "/r1.jpg",
      alt: "Rahul Sharma - Software Engineer",
      width: 240,
      height: 241,
    },
    {
      id: 2,
      src: "/r2.jpg",
      alt: "Priya Patel - Data Scientist",
      width: 240,
      height: 241,
    },
    {
      id: 3,
      src: "/r3.jpg",
      alt: "Amit Kumar - UX Designer",
      width: 240,
      height: 241,
    },
    {
      id: 4,
      src: "/r4.jpg",
      alt: "Sneha Reddy - Marketing Manager",
      width: 240,
      height: 241,
    },
    {
      id: 5,
      src: "/r5.jpg",
      alt: "Vikram Singh - College Student",
      width: 240,
      height: 241,
    },
  ];

  return (
    <section className={`${parentClass}`}>
      <div className="tf-container">
        <div className="row justify-center">
          <div className="col-xl-10 col-sm-12">
            <div className="heading-section text-center">
              <h2
                className={`fw-7 ${titleFont} wow fadeInUp`}
                data-wow-delay="0s"
              >
                What Our Students Are Saying
              </h2>
              <div className="sub fs-15 wow fadeInUp" data-wow-delay="0.2s">
                Join thousands of satisfied learners who transformed their careers with Ekmat Gyan Jyoti
              </div>
            </div>
            <div className="gallery">
              <div className="swiper-button-prev widget-saying-button">
                <svg
                  width={35}
                  height={34}
                  viewBox="0 0 35 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M35 16.9832H2.02708" stroke="black" />
                  <path
                    d="M8.96808 24.7926C7.02916 20.5253 5.49308 18.7339 1.66599 16.9949C5.57849 15.0692 7.09716 13.2712 8.96808 9.17383"
                    stroke="black"
                  />
                </svg>
              </div>
              <div className="swiper-button-next widget-saying-button">
                <svg
                  width={35}
                  height={34}
                  viewBox="0 0 35 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 16.9832H32.9729" stroke="black" />
                  <path
                    d="M26.0319 24.7926C27.9708 20.5253 29.5069 18.7339 33.334 16.9949C29.4215 15.0692 27.9028 13.2712 26.0319 9.17383"
                    stroke="black"
                  />
                </svg>
              </div>
              <Swiper
                {...swiperOptions2}
                modules={[Navigation, Thumbs]}
                className="swiper-container gallery-thumbs"
                thumbs={{ swiper: thumbsSwiper }}
              >
                {avatars.map((avatar, index) => (
                  <SwiperSlide key={index} className="swiper-slide">
                    {/* Student avatar - Using local images r1.jpg to r5.jpg */}
                    <Image
                      className="lazyload testimonials-thumb-image rounded-full"
                      src={avatar.src}
                      alt={`${avatar.alt} - Ekmat Gyan Jyoti Student Success Story`}
                      width={avatar.width}
                      height={avatar.height}
                      style={{ objectFit: 'cover' }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                {...swiperOptions}
                modules={[Thumbs]}
                onSwiper={setThumbsSwiper}
                allowTouchMove={false}
                loopAdditionalSlides={7}
                className="swiper-container gallery-slider"
              >
                {updatedTestimonials.map((testimonial, index) => (
                  <SwiperSlide key={index} className="swiper-slide">
                    <div className="widget-saying-item">
                      <div className="info">
                        <span>
                          <span className="name">{testimonial.name}</span>
                        </span>
                        <div className="ratings">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <i key={i} className="icon-star-1" />
                          ))}
                        </div>
                      </div>
                      <div className="widget-saying-content">
                        <p className="text">{testimonial.text}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}