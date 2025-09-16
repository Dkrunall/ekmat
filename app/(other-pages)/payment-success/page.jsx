import React from 'react';
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";

export const metadata = {
  title: 'Payment Success | Ekmat Gyan Jyoti',
  description: 'Your payment was successful. Thank you for your registration.',
};

export default function PaymentSuccessPage() {
  return (
    <>
      <div id="wrapper">
        <Header1 />
        <div className="main-content" style={{ paddingTop: '20px', paddingBottom: '63px' }}>
          <div className="tf-container tf-section">
            <div className="row">
              <div className="col-12">
                <div className="payment-success-container" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  minHeight: '60vh',
                  padding: '30px'
                }}>
                  <div className="success-icon" style={{ marginBottom: '25px' }}>
                    <i className="icon-check-circle" style={{ fontSize: '5rem', color: '#27ae60' }}></i>
                  </div>
                  <h1 className="font-cardo fw-7" style={{ fontSize: '2.8rem', marginBottom: '20px', textAlign: 'center' }}>
                    Payment Successful!
                  </h1>
                  <p className="fs-18" style={{ marginBottom: '15px', color: '#555', textAlign: 'center', maxWidth: '700px', fontSize: '1.3rem', lineHeight: '1.6' }}>
                    Thank you for completing your registration. Your application to become an instructor at Ekmat Gyan Jyoti has been successfully submitted.
                  </p>
                  <p className="fs-16" style={{ marginBottom: '25px', color: '#777', textAlign: 'center', maxWidth: '700px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                    We will review your application and get back to you within 2-3 business days.
                  </p>
                  <div className="mt-4">
                    <a 
                      href="/" 
                      className="tf-btn style-primary rounded-full"
                      style={{ 
                        padding: '12px 35px',
                        fontSize: '16px',
                        textDecoration: 'none',
                        display: 'inline-block'
                      }}
                    >
                      Back to Home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer1 />
      </div>
    </>
  );
}