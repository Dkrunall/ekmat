"use client";
import { useState, useEffect } from "react";

const Popup = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timer to hide the popup after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={() => setIsVisible(false)}>
          &times;
        </button>
        <div className="popup-body">
          <img src="/popup.jpeg" alt="Welcome" className="popup-image" />
          <div className="popup-text">
            <h3>🎉 Welcome!</h3>
            <p>Join Ekmat Gyan Jyoti and start your journey with us.</p>
            <button className="btn btn-primary" onClick={() => setIsVisible(false)}>
              Apply Now
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        
        .popup-content {
          background: white;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          padding: 0;
          position: relative;
          max-width: 350px; /* Set to 350px as requested */
          width: 90%;
          text-align: center;
        }
        
        .popup-close {
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #333;
          z-index: 10000;
        }
        
        .popup-image {
          width: 100%;
          max-height: 500px; /* Increased to 500px as requested */
          object-fit: contain;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }
        
        .popup-text {
          padding: 20px;
        }
        
        .popup-text h3 {
          margin-top: 0;
          color: #333;
          font-size: 2.2rem;
        }
        
        .popup-text p {
          color: #666;
          margin-bottom: 20px;
          font-size: 1.4rem;
          line-height: 1.6;
        }
        
        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        .btn-primary {
          background-color: #ff6b00;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default Popup;