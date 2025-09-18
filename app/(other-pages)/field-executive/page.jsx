"use client";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";
import Link from "next/link";

export default function FieldExecutivePage() {
  return (
    <>
      <style jsx>{`
        .image-section img {
          width: 100%;
          height: auto;
          max-height: 700px;
          object-fit: cover;
          border-radius: 8px;
        }
        
        .form-section .tf-btn {
          width: 100%;
          padding: 12px 24px;
          border-radius: 4px;
          border: none;
          background-color: #ff6b00;
          color: white;
          font-weight: bold;
          cursor: pointer;
          font-family: 'Outfit', sans-serif;
        }
        
        @media (max-width: 768px) {
          .main-content {
            padding: 20px 0 !important;
          }
          
          .page-title {
            padding-top: 20px !important;
            padding-bottom: 20px !important;
          }
          
          .page-title h2 {
            font-size: 1.8rem !important;
          }
          
          .page-title h6 {
            font-size: 1rem !important;
          }
          
          .image-section img {
            max-height: 300px;
          }
          
          .form-section h3 {
            font-size: 1.5rem !important;
          }
          
          .breadcrumbs {
            font-size: 0.9rem !important;
            gap: 5px !important;
          }
          
          .breadcrumbs li {
            padding: 0 5px !important;
          }
        }
        
        @media (max-width: 576px) {
          .image-section img {
            max-height: 250px;
          }
          
          .page-title h2 {
            font-size: 1.5rem !important;
          }
          
          .form-section h3 {
            font-size: 1.3rem !important;
          }
          
          input, select, textarea {
            padding: 10px !important;
            font-size: 0.9rem !important;
          }
          
          .tf-btn {
            padding: 10px 20px !important;
            font-size: 0.9rem !important;
          }
        }
      `}</style>
      <div id="wrapper">
        <Header1 />
        <div className="page-title basic page-field-executive" style={{ paddingBottom: '30px', paddingTop: '30px' }}>
          <div className="tf-container full">
            <div className="row">
              <div className="col-12">
                <div className="content text-center">
                  <ul className="breadcrumbs flex items-center justify-center gap-10" style={{ marginBottom: '20px', fontFamily: "'Outfit', sans-serif" }}>
                    <li>
                      <Link href={`/`} className="flex">
                        <i className="icon-home" />
                      </Link>
                    </li>
                    <li>
                      <i className="icon-arrow-right" />
                    </li>
                    <li>Careers</li>
                    <li>
                      <i className="icon-arrow-right" />
                    </li>
                    <li>Field Executive</li>
                  </ul>
                  <h2 className="font-cardo fw-7" style={{ marginBottom: '15px', fontFamily: "'Cardo', serif" }}>Field Executive</h2>
                  <h6 style={{ marginBottom: '10px', fontFamily: "'Outfit', sans-serif" }}>
                    Join our team and help us provide free education across India
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="main-content" style={{ padding: '40px 0' }}>
          <div className="tf-container">
            <div className="row">
              <div className="col-lg-6 col-md-12 mb-4">
                <div className="image-section">
                  <img 
                    src="/2.jpg" 
                    alt="Field Executive" 
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-section">
                  <h3 className="mb-4" style={{ fontFamily: "'Cardo', serif" }}>Apply for Field Executive Position</h3>
                  <form>
                    <div className="form-group mb-3">
                      <input 
                        type="text" 
                        id="fullName" 
                        name="fullName" 
                        placeholder="Full Name *"
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="tel" 
                        id="contactNo" 
                        name="contactNo" 
                        placeholder="Contact No *"
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Email *"
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>
                    
                    <div className="form-group mb-3">
                      <select 
                        id="fieldOption" 
                        name="fieldOption" 
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      >
                        <option value="">Field Option *</option>
                        <option value="field-executive">Field Executive</option>
                        <option value="tally-caller">Tally Caller</option>
                      </select>
                    </div>
                    
                    <div className="form-group mb-3">
                      <textarea 
                        id="fullAddress" 
                        name="fullAddress" 
                        rows="3"
                        placeholder="Full Address *"
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      ></textarea>
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="text" 
                        id="pinCode" 
                        name="pinCode" 
                        placeholder="Pin Code *"
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="text" 
                        id="city" 
                        name="city" 
                        placeholder="City *"
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>
                    
                    <div className="form-group mb-4">
                      <input 
                        type="text" 
                        id="state" 
                        name="state" 
                        placeholder="State *"
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="tf-btn"
                    >
                      Submit Application
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '40px' }}>
          <Footer1 parentClass="footer has-border-top" />
        </div>
      </div>
    </>
  );
}