"use client";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React, { useState } from "react";
import Link from "next/link";

export default function TeachersPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    nationality: '',
    fatherName: '',
    motherName: '',
    dob: '',
    age: '',
    aadhaar: '',
    gender: '',
    maritalStatus: '',
    category: '',
    email: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Validation functions
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'fullName':
      case 'fatherName':
      case 'motherName':
        if (!value.trim()) {
          error = 'This field is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters long';
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = 'Name can only contain letters and spaces';
        }
        break;
        
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
        
      case 'nationality':
        if (!value.trim()) {
          error = 'Nationality is required';
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          error = 'Nationality can only contain letters and spaces';
        }
        break;
        
      case 'dob':
        if (!value.trim()) {
          error = 'Date of birth is required';
        } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
          error = 'Please enter date in DD/MM/YYYY format';
        } else {
          const [day, month, year] = value.split('/');
          const date = new Date(year, month - 1, day);
          const today = new Date();
          const age = today.getFullYear() - date.getFullYear();
          
          if (date.getDate() != day || date.getMonth() != month - 1 || date.getFullYear() != year) {
            error = 'Please enter a valid date';
          } else if (age < 24 || age > 45) {
            error = 'Age must be between 24 and 45 years';
          }
        }
        break;
        
      case 'age':
        if (!value) {
          error = 'Age is required';
        } else if (isNaN(value) || value < 24 || value > 45) {
          error = 'Age must be between 24 and 45 years';
        }
        break;
        
      case 'aadhaar':
        if (!value.trim()) {
          error = 'Aadhaar number is required';
        } else if (!/^\d{12}$/.test(value.replace(/\s/g, ''))) {
          error = 'Aadhaar number must be exactly 12 digits';
        }
        break;
        
      case 'gender':
        if (!value) {
          error = 'Please select your gender';
        }
        break;
        
      case 'maritalStatus':
        if (!value) {
          error = 'Please select your marital status';
        }
        break;
        
      case 'category':
        if (!value) {
          error = 'Please select your category';
        }
        break;
        
      default:
        break;
    }
    
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate field and update errors
    const error = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Validate all fields
      const newErrors = {};
      const requiredFields = ['fullName', 'nationality', 'fatherName', 'motherName', 'dob', 'age', 'aadhaar', 'gender', 'maritalStatus', 'category'];
      
      // Check all fields for validation errors
      Object.keys(formData).forEach(field => {
        const error = validateField(field, formData[field]);
        if (error) {
          newErrors[field] = error;
        }
      });
      
      // Check for missing required fields
      requiredFields.forEach(field => {
        if (!formData[field] || !formData[field].toString().trim()) {
          if (!newErrors[field]) {
            newErrors[field] = 'This field is required';
          }
        }
      });
      
      // If there are validation errors, show them and stop submission
      if (Object.keys(newErrors).length > 0) {
        setFieldErrors(newErrors);
        setSubmitMessage('Please fix the errors below before submitting.');
        setIsSubmitting(false);
        return;
      }
      
      // Clear any previous errors
      setFieldErrors({});

      // Initiate PhonePe payment
      const paymentResponse = await fetch('/api/phonepe-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      const paymentData = await paymentResponse.json();

      if (paymentData.success && paymentData.paymentUrl) {
        // Store form data in localStorage for after payment
        localStorage.setItem('teacherApplicationData', JSON.stringify({
          formData,
          merchantOrderId: paymentData.merchantOrderId,
          transactionId: paymentData.transactionId
        }));
        
        // Redirect to PhonePe payment page
        window.location.href = paymentData.paymentUrl;
      } else {
        setSubmitMessage('Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  <form onSubmit={handleSubmit}>
                    <h4 className="mb-3">1) Basic Details</h4>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="text" 
                        id="fullName" 
                        name="fullName" 
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          borderRadius: '4px', 
                          border: fieldErrors.fullName ? '1px solid #dc3545' : '1px solid #ccc', 
                          fontFamily: "'Outfit', sans-serif" 
                        }}
                      />
                      {fieldErrors.fullName && (
                        <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px', fontFamily: "'Outfit', sans-serif" }}>
                          {fieldErrors.fullName}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Email Address (Optional)"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          borderRadius: '4px', 
                          border: fieldErrors.email ? '1px solid #dc3545' : '1px solid #ccc', 
                          fontFamily: "'Outfit', sans-serif" 
                        }}
                      />
                      {fieldErrors.email && (
                        <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px', fontFamily: "'Outfit', sans-serif" }}>
                          {fieldErrors.email}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="text" 
                        id="nationality" 
                        name="nationality" 
                        placeholder="Nationality *"
                        value={formData.nationality}
                        onChange={handleInputChange}
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          borderRadius: '4px', 
                          border: fieldErrors.nationality ? '1px solid #dc3545' : '1px solid #ccc', 
                          fontFamily: "'Outfit', sans-serif" 
                        }}
                      />
                      {fieldErrors.nationality && (
                        <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px', fontFamily: "'Outfit', sans-serif" }}>
                          {fieldErrors.nationality}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="text" 
                        id="fatherName" 
                        name="fatherName" 
                        placeholder="Father's Name *"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          borderRadius: '4px', 
                          border: fieldErrors.fatherName ? '1px solid #dc3545' : '1px solid #ccc', 
                          fontFamily: "'Outfit', sans-serif" 
                        }}
                      />
                      {fieldErrors.fatherName && (
                        <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px', fontFamily: "'Outfit', sans-serif" }}>
                          {fieldErrors.fatherName}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="text" 
                        id="motherName" 
                        name="motherName" 
                        placeholder="Mother's Name *"
                        value={formData.motherName}
                        onChange={handleInputChange}
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          borderRadius: '4px', 
                          border: fieldErrors.motherName ? '1px solid #dc3545' : '1px solid #ccc', 
                          fontFamily: "'Outfit', sans-serif" 
                        }}
                      />
                      {fieldErrors.motherName && (
                        <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px', fontFamily: "'Outfit', sans-serif" }}>
                          {fieldErrors.motherName}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="text" 
                        id="dob" 
                        name="dob" 
                        placeholder="Date of Birth (Format: DD/MM/YYYY) *"
                        value={formData.dob}
                        onChange={handleInputChange}
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          borderRadius: '4px', 
                          border: fieldErrors.dob ? '1px solid #dc3545' : '1px solid #ccc', 
                          fontFamily: "'Outfit', sans-serif" 
                        }}
                      />
                      {fieldErrors.dob && (
                        <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px', fontFamily: "'Outfit', sans-serif" }}>
                          {fieldErrors.dob}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="number" 
                        id="age" 
                        name="age" 
                        placeholder="Age as on 01/01/2025 *"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          borderRadius: '4px', 
                          border: fieldErrors.age ? '1px solid #dc3545' : '1px solid #ccc', 
                          fontFamily: "'Outfit', sans-serif" 
                        }}
                      />
                      {fieldErrors.age && (
                        <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px', fontFamily: "'Outfit', sans-serif" }}>
                          {fieldErrors.age}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group mb-3">
                      <input 
                        type="text" 
                        id="aadhaar" 
                        name="aadhaar" 
                        placeholder="Aadhaar Number *"
                        value={formData.aadhaar}
                        onChange={handleInputChange}
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          borderRadius: '4px', 
                          border: fieldErrors.aadhaar ? '1px solid #dc3545' : '1px solid #ccc', 
                          fontFamily: "'Outfit', sans-serif" 
                        }}
                      />
                      {fieldErrors.aadhaar && (
                        <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px', fontFamily: "'Outfit', sans-serif" }}>
                          {fieldErrors.aadhaar}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group mb-3">
                      <select 
                        id="gender" 
                        name="gender" 
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          borderRadius: '4px', 
                          border: fieldErrors.gender ? '1px solid #dc3545' : '1px solid #ccc', 
                          fontFamily: "'Outfit', sans-serif" 
                        }}
                      >
                        <option value="">Gender *</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {fieldErrors.gender && (
                        <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px', fontFamily: "'Outfit', sans-serif" }}>
                          {fieldErrors.gender}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group mb-3">
                      <select 
                        id="maritalStatus" 
                        name="maritalStatus" 
                        value={formData.maritalStatus}
                        onChange={handleInputChange}
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          borderRadius: '4px', 
                          border: fieldErrors.maritalStatus ? '1px solid #dc3545' : '1px solid #ccc', 
                          fontFamily: "'Outfit', sans-serif" 
                        }}
                      >
                        <option value="">Marital Status *</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                      </select>
                      {fieldErrors.maritalStatus && (
                        <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px', fontFamily: "'Outfit', sans-serif" }}>
                          {fieldErrors.maritalStatus}
                        </div>
                      )}
                    </div>
                    
                    <div className="form-group mb-4">
                      <select 
                        id="category" 
                        name="category" 
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          borderRadius: '4px', 
                          border: fieldErrors.category ? '1px solid #dc3545' : '1px solid #ccc', 
                          fontFamily: "'Outfit', sans-serif" 
                        }}
                      >
                        <option value="">Category *</option>
                        <option value="general">General</option>
                        <option value="obc">OBC</option>
                        <option value="sc">SC</option>
                        <option value="st">ST</option>
                        <option value="ews">EWS</option>
                      </select>
                      {fieldErrors.category && (
                        <div style={{ color: '#dc3545', fontSize: '0.875rem', marginTop: '5px', fontFamily: "'Outfit', sans-serif" }}>
                          {fieldErrors.category}
                        </div>
                      )}
                    </div>
                    
                    {submitMessage && (
                      <div className="mb-3" style={{ 
                        padding: '10px', 
                        borderRadius: '4px', 
                        backgroundColor: submitMessage.includes('error') || submitMessage.includes('Failed') ? '#f8d7da' : '#d4edda',
                        color: submitMessage.includes('error') || submitMessage.includes('Failed') ? '#721c24' : '#155724',
                        border: `1px solid ${submitMessage.includes('error') || submitMessage.includes('Failed') ? '#f5c6cb' : '#c3e6cb'}`,
                        fontFamily: "'Outfit', sans-serif"
                      }}>
                        {submitMessage}
                      </div>
                    )}
                    
                    <button 
                      type="submit"
                      className="tf-btn"
                      disabled={isSubmitting}
                      style={{ opacity: isSubmitting ? 0.7 : 1 }}
                    >
                      {isSubmitting ? 'Processing...' : 'Pay ₹150 & Submit Application'}
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