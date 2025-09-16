'use client';

import React from 'react';
import Header1 from "@/components/headers/Header1";
import Footer1 from "@/components/footers/Footer1";

export const metadata = {
  title: 'Payment Processing | Ekmat Gyan Jyoti',
  description: 'Processing your payment. Please wait...',
};

export default function PaymentCallbackPage() {
  return (
    <>
      <div id="wrapper">
        <Header1 />
        <div className="main-content" style={{ paddingTop: '20px', paddingBottom: '63px' }}>
          <div className="tf-container tf-section">
            <div className="row">
              <div className="col-12">
                <div className="payment-processing-container" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  minHeight: '60vh',
                  padding: '30px'
                }}>
                  <div className="processing-icon" style={{ marginBottom: '25px' }}>
                    <i className="icon-refresh" style={{ fontSize: '5rem', color: '#3498db' }}></i>
                  </div>
                  <h1 className="font-cardo fw-7" style={{ fontSize: '2.8rem', marginBottom: '20px', textAlign: 'center' }}>
                    Processing Payment...
                  </h1>
                  <p className="fs-18" style={{ marginBottom: '15px', color: '#555', textAlign: 'center', maxWidth: '700px', fontSize: '1.3rem', lineHeight: '1.6' }}>
                    Please wait while we process your payment. This may take a few moments.
                  </p>
                  <p className="fs-16" style={{ marginBottom: '25px', color: '#777', textAlign: 'center', maxWidth: '700px', fontSize: '1.2rem', lineHeight: '1.6' }}>
                    You will be redirected automatically once the payment is confirmed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer1 />
      </div>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .processing-icon {
          animation: spin 2s linear infinite;
        }
      `}</style>
    </>
  );
}