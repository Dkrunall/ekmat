"use client";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [applicationData, setApplicationData] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  
  const transactionId = searchParams.get('transactionId');
  const merchantOrderId = searchParams.get('merchantOrderId');

  useEffect(() => {
    // Get stored application data
    const storedData = localStorage.getItem('teacherApplicationData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setApplicationData(data);
      
      // Send email if we have the data and payment was successful
      if (transactionId && merchantOrderId && !emailSent) {
        sendConfirmationEmail(data);
      }
      
      // Clear the stored data
      localStorage.removeItem('teacherApplicationData');
    }
  }, [transactionId, merchantOrderId, emailSent]);

  const sendConfirmationEmail = async (data) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: data.formData,
          paymentDetails: {
            transactionId: transactionId || data.transactionId,
            merchantOrderId: merchantOrderId || data.merchantOrderId,
            amount: '150',
            status: 'Completed'
          }
        }),
      });
      
      if (response.ok) {
        setEmailSent(true);
        console.log('Confirmation email sent successfully');
      }
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  };

  return (
    <>
      <style jsx>{`
        .success-container {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }
        
        .success-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          padding: 40px;
          text-align: center;
          max-width: 600px;
          width: 100%;
        }
        
        .success-icon {
          width: 80px;
          height: 80px;
          background: #28a745;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: white;
          font-size: 40px;
        }
        
        .success-title {
          color: #28a745;
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 15px;
          font-family: 'Cardo', serif;
        }
        
        .success-message {
          color: #666;
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 30px;
          font-family: 'Outfit', sans-serif;
        }
        
        .details-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: left;
        }
        
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e9ecef;
        }
        
        .detail-row:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        
        .detail-label {
          font-weight: 600;
          color: #495057;
        }
        
        .detail-value {
          color: #6c757d;
        }
        
        .next-steps {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: left;
        }
        
        .next-steps h4 {
          color: #856404;
          margin-bottom: 15px;
          font-family: 'Cardo', serif;
        }
        
        .next-steps ul {
          color: #856404;
          margin: 0;
          padding-left: 20px;
        }
        
        .next-steps li {
          margin-bottom: 8px;
          font-family: 'Outfit', sans-serif;
        }
        
        .btn-home {
          background: #ff6b00;
          color: white;
          padding: 12px 30px;
          border: none;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 600;
          display: inline-block;
          margin-top: 20px;
          font-family: 'Outfit', sans-serif;
          transition: background 0.3s ease;
        }
        
        .btn-home:hover {
          background: #e55a00;
          color: white;
          text-decoration: none;
        }
        
        @media (max-width: 768px) {
          .success-card {
            padding: 30px 20px;
          }
          
          .success-title {
            font-size: 1.5rem;
          }
          
          .success-message {
            font-size: 1rem;
          }
          
          .detail-row {
            flex-direction: column;
            gap: 5px;
          }
        }
      `}</style>
      
      <div id="wrapper">
        <Header1 />
        
        <div className="success-container">
          <div className="success-card">
            <div className="success-icon">
              ✓
            </div>
            
            <h1 className="success-title">Payment Successful!</h1>
            
            <p className="success-message">
              Thank you for your application! Your payment of ₹150 has been processed successfully, 
              and your teacher application has been submitted to Ekmat Gyan Jyoti.
            </p>
            
            {(transactionId || merchantOrderId) && (
              <div className="details-card">
                <h4 style={{ marginBottom: '15px', color: '#495057', fontFamily: "'Cardo', serif" }}>Payment Details</h4>
                {transactionId && (
                  <div className="detail-row">
                    <span className="detail-label">Transaction ID:</span>
                    <span className="detail-value">{transactionId}</span>
                  </div>
                )}
                {merchantOrderId && (
                  <div className="detail-row">
                    <span className="detail-label">Order ID:</span>
                    <span className="detail-value">{merchantOrderId}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">Amount Paid:</span>
                  <span className="detail-value">₹150</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value" style={{ color: '#28a745', fontWeight: '600' }}>Completed</span>
                </div>
              </div>
            )}
            
            {applicationData && (
              <div className="details-card">
                <h4 style={{ marginBottom: '15px', color: '#495057', fontFamily: "'Cardo', serif" }}>Application Details</h4>
                <div className="detail-row">
                  <span className="detail-label">Applicant Name:</span>
                  <span className="detail-value">{applicationData.formData.fullName}</span>
                </div>
                {applicationData.formData.email && (
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{applicationData.formData.email}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{applicationData.formData.category?.toUpperCase()}</span>
                </div>
              </div>
            )}
            
            <div className="next-steps">
              <h4>What's Next?</h4>
              <ul>
                <li>You will receive a confirmation email shortly (if email was provided)</li>
                <li>Written Examination: 05/10/2025 (Online Mode)</li>
                <li>Merit List will be published based on exam results</li>
                <li>Document verification for selected candidates</li>
                <li>Final selection and appointment</li>
              </ul>
            </div>
            
            {emailSent && (
              <div style={{ 
                background: '#d4edda', 
                color: '#155724', 
                padding: '10px 15px', 
                borderRadius: '6px', 
                margin: '20px 0',
                fontFamily: "'Outfit', sans-serif"
              }}>
                ✓ Confirmation email sent successfully!
              </div>
            )}
            
            <Link href="/" className="btn-home">
              Return to Home
            </Link>
          </div>
        </div>
        
        <Footer1 parentClass="footer has-border-top" />
      </div>
    </>
  );
}