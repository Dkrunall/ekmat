"use client";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";
import Link from "next/link";

export default function TeachersPage() {
  return (
    <>
      <style jsx>{`
        .job-description h3, .job-description h4 {
          font-family: 'Cardo', serif;
        }
        
        .job-description p, .job-description li {
          font-family: 'Outfit', sans-serif;
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
          
          .job-description h3 {
            font-size: 1.5rem !important;
          }
          
          .job-description h4 {
            font-size: 1.3rem !important;
          }
          
          .form-section h3 {
            font-size: 1.5rem !important;
          }
          
          .form-section h4 {
            font-size: 1.3rem !important;
          }
          
          .breadcrumbs {
            font-size: 0.9rem !important;
            gap: 5px !important;
          }
          
          .breadcrumbs li {
            padding: 0 5px !important;
          }
          
          .job-description p, .job-description li {
            font-size: 1.1rem !important;
            line-height: 1.4 !important;
          }
        }
        
        @media (max-width: 576px) {
          .page-title h2 {
            font-size: 1.5rem !important;
          }
          
          .job-description h3 {
            font-size: 1.3rem !important;
          }
          
          .job-description h4 {
            font-size: 1.1rem !important;
          }
          
          .form-section h3 {
            font-size: 1.3rem !important;
          }
          
          .form-section h4 {
            font-size: 1.1rem !important;
          }
          
          input, select, textarea {
            padding: 10px !important;
            font-size: 0.9rem !important;
          }
          
          .tf-btn {
            padding: 10px 20px !important;
            font-size: 0.9rem !important;
          }
          
          .job-description p, .job-description li {
            font-size: 1rem !important;
            line-height: 1.3 !important;
          }
        }
      `}</style>
      <div id="wrapper">
        <Header1 />
        <div className="page-title basic page-teachers" style={{ paddingBottom: '30px', paddingTop: '30px' }}>
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
                    <li>Teachers</li>
                  </ul>
                  <h2 className="font-cardo fw-7" style={{ marginBottom: '15px', fontFamily: "'Cardo', serif" }}>Teachers – Full Time</h2>
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
                <div className="job-description">
                  <h3 className="mb-4">Job Description</h3>
                  <p className="mb-4">We are looking for a passionate Teachers to join our growing team at Ekmat Gyan Jyoti. You will be working on impactful projects that aim to provide free education across India.</p>
                  
                  <h4 className="mb-3">Responsibilities:</h4>
                  <ul className="mb-4">
                    <li className="mb-2">Deliver subject-wise teaching for Classes 8th–12th and entrance exams (NEET, JEE, CUET, etc.)</li>
                    <li className="mb-2">Prepare lesson plans, study materials, and assignments</li>
                    <li className="mb-2">Conduct regular tests, evaluate student performance, and provide feedback</li>
                    <li className="mb-2">Guide students for higher studies, competitive exams, and career paths</li>
                    <li className="mb-2">For Vocational Teachers – impart practical training, technical knowledge, and employability skills</li>
                    <li className="mb-2">Support students in skill-based and job-oriented learning.</li>
                  </ul>
                  
                  <h4 className="mb-3">Requirements:</h4>
                  <ul className="mb-4">
                    <li className="mb-2">Graduation / Post-Graduation in relevant subject</li>
                    <li className="mb-2">B.Ed. / D.Ed. / Equivalent Teaching Qualification preferred.</li>
                    <li className="mb-2">For Vocational Teachers: Degree/Diploma in Vocational/Technical Field.</li>
                    <li className="mb-2">Age Limit: 24 to 45 Years (as on 01.08.2025)</li>
                  </ul>
                  
                  <h4 className="mb-3">Salary:</h4>
                  <p className="mb-4">As per Organization Norms (Based on Qualification & Subject)</p>
                  
                  <h4 className="mb-3">Selection Process:</h4>
                  <ul className="mb-4">
                    <li className="mb-2">Written Examination – Online Mode Date: 05/10/2025 (subject to change)</li>
                    <li className="mb-2">Merit List – Based on Written Exam Results</li>
                    <li className="mb-2">Document Verification & Final Selection</li>
                  </ul>
                  
                  <h4 className="mb-3">Documents Required:</h4>
                  <ul className="mb-4">
                    <li className="mb-2">Passport Photo *</li>
                    <li className="mb-2">10th Marksheet *</li>
                    <li className="mb-2">12th Marksheet *</li>
                    <li className="mb-2">Graduation Degree *</li>
                    <li className="mb-2">Post Graduation *</li>
                    <li className="mb-2">B.Ed Certificate</li>
                    <li className="mb-2">ID Proof *</li>
                  </ul>
                  
                  <h4 className="mb-3">Application Process</h4>
                  <ul>
                    <li className="mb-2">Application Fee: ₹150</li>
                    <li className="mb-2">Mode of Application: Online</li>
                    <li className="mb-2">Last Date to Apply: 25/09/2025</li>
                    <li className="mb-2">Exam Date: 05/10/2025 (Tentative, subject to change)</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="form-section">
                  <h3 className="mb-4">Apply for Teacher Position</h3>
                  <form>
                    <h4 className="mb-3">1) Basic Details</h4>
                    
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
                        type="text" 
                        id="nationality" 
                        name="nationality" 
                        placeholder="Nationality *"
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="text" 
                        id="fatherName" 
                        name="fatherName" 
                        placeholder="Father's Name *"
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="text" 
                        id="motherName" 
                        name="motherName" 
                        placeholder="Mother's Name *"
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="text" 
                        id="dob" 
                        name="dob" 
                        placeholder="Date of Birth (Format: DD/MM/YYYY) *"
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="number" 
                        id="age" 
                        name="age" 
                        placeholder="Age as on 01/01/2025 *"
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="text" 
                        id="aadhaar" 
                        name="aadhaar" 
                        placeholder="Aadhaar Number *"
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      />
                    </div>
                    
                    <div className="form-group mb-3">
                      <select 
                        id="gender" 
                        name="gender" 
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      >
                        <option value="">Gender *</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div className="form-group mb-3">
                      <select 
                        id="maritalStatus" 
                        name="maritalStatus" 
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      >
                        <option value="">Marital Status *</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                      </select>
                    </div>
                    
                    <div className="form-group mb-4">
                      <select 
                        id="category" 
                        name="category" 
                        required
                        style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', fontFamily: "'Outfit', sans-serif" }}
                      >
                        <option value="">Category *</option>
                        <option value="general">General</option>
                        <option value="obc">OBC</option>
                        <option value="sc">SC</option>
                        <option value="st">ST</option>
                        <option value="ews">EWS</option>
                      </select>
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