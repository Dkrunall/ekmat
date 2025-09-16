"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function BecomeInstactor() {
  const [isTeachingFormOpen, setIsTeachingFormOpen] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const openTeachingForm = () => {
    setIsTeachingFormOpen(true);
  };

  const closeTeachingForm = () => {
    setIsTeachingFormOpen(false);
    setIsPaymentProcessing(false);
  };

  const handleTeachingFormSubmit = async (e) => {
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      experience: formData.get('experience'),
      subjects: formData.get('subjects')
    };

    try {
      console.log('Submitting instructor application:', data);
      
      // First, submit the form data to your backend
      const response = await fetch('/api/instructor-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Application submission response status:', response.status);
      
      const responseData = await response.json();
      console.log('Application submission response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.error || `Server error: ${response.status}`);
      }

      // After successful form submission, initiate PhonePe payment
      if (responseData.paymentUrl) {
        console.log('Redirecting to payment URL:', responseData.paymentUrl);
        window.location.href = responseData.paymentUrl;
      } else {
        console.log('No payment URL in response, showing success message');
        alert("Application submitted successfully! We'll contact you soon.");
        closeTeachingForm();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert(`Form submission failed: ${error.message || "Please try again."}`);
      setIsPaymentProcessing(false);
    }
  };

  const initiatePhonePePayment = async (userData) => {
    // This function is no longer used since payment initiation is handled in the API route
    console.log('initiatePhonePePayment function called - this should not happen');
  };

  return (
    <section
      className="section-become-instructor tf-spacing-3 pt-0 wow fadeInUp"
      data-wow-delay="0.2s"
    >
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-section">
              <div className="content-inner">
                <h2 className="font-cardo fw-7">Become An Instructor</h2>
                <p className="fs-15">
                  Top instructors from around the world teach millions of
                  students on Ekmat Gyan Jyoti. We provide the tools and skills to teach
                  what you love
                </p>
                <ul className="wrap-list-text-check1">
                  <li>
                    <i className="icon-check" />
                    Earn money
                  </li>
                  <li>
                    <i className="icon-check" />
                    Inspire students
                  </li>
                  <li>
                    <i className="icon-check" />
                    Join our community
                  </li>
                </ul>
              </div>
              <div className="content-user">
                <div className=" box-agent style2">
                  <ul className="agent-img-list">
                    <li className="agent-img-item">
                      <Image
                        className="lazyload rounded-full"
                        alt="Arjun Sharma - Successful online instructor"
                        src="/6.jpg"
                        width={84}
                        height={84}
                      />
                    </li>
                    <li className="agent-img-item">
                      <Image
                        className="lazyload rounded-full"
                        alt="Priya Patel - Expert educator"
                        src="/7.jpg"
                        width={84}
                        height={84}
                      />
                    </li>
                    <li className="agent-img-item">
                      <Image
                        className="lazyload rounded-full"
                        alt="Rahul Verma - Professional teacher"
                        src="/2.jpg"
                        width={84}
                        height={84}
                      />
                    </li>
                    <li className="agent-img-item">
                      <p>1M+</p>
                    </li>
                  </ul>
                  {/* Start Teaching Today Button */}
                  <button 
                    className="tf-btn style-secondary rounded-full"
                    onClick={openTeachingForm}
                    style={{ 
                      borderRadius: '30px',
                      padding: '10px 20px',
                      fontSize: '14px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Start Teaching Today
                    <i className="icon-arrow-top-right" />
                  </button>
                </div>
              </div>
              <div className="content-img">
                <Image
                  className="lazyload item-1"
                  alt="Become an instructor and inspire students through online teaching"
                  src="/3.jpg"
                  width={708}
                  height={802}
                />
                <Image
                  className="lazyload item-2"
                  alt=""
                  src="/images/item/item-4.png"
                  width={148}
                  height={158}
                />
                <Image
                  className="lazyload item-3"
                  alt=""
                  src="/images/item/item-20.png"
                  width={128}
                  height={128}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Teaching Form Popup */}
      {isTeachingFormOpen && (
        <div className="teaching-popup-overlay">
          <div className="teaching-popup">
            <button 
              onClick={closeTeachingForm}
              className="close"
            >
              &times;
            </button>
            <h3>Start Teaching Today</h3>
            <p className="subtitle">Join our platform and share your knowledge with thousands of students worldwide.</p>
            <form onSubmit={handleTeachingFormSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="form-group">
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="form-group">
                <textarea 
                  id="experience" 
                  name="experience" 
                  rows="4"
                  placeholder="Teaching Experience"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <textarea 
                  id="subjects" 
                  name="subjects" 
                  rows="3"
                  placeholder="Subjects You Want to Teach"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="tf-btn"
                disabled={isPaymentProcessing}
              >
                {isPaymentProcessing ? "Processing..." : "Submit Application"}
              </button>
            </form>
            
            {isPaymentProcessing && (
              <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                backgroundColor: '#e9f7ef', 
                border: '1px solid #27ae60', 
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                <p>Your application has been submitted successfully!</p>
                <p>Redirecting to payment gateway to complete your registration (₹1)...</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}