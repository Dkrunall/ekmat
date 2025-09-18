'use client';

import React, { useState } from 'react';

const TestPaymentComponent = () => {
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const testServiceInitialization = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const response = await fetch('/api/test-phonepe', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setTestResult({ type: 'service', data });
    } catch (error) {
      setTestResult({ type: 'error', data: { error: error.message } });
    } finally {
      setIsLoading(false);
    }
  };

  const testPaymentInitiation = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const response = await fetch('/api/test-phonepe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 100,
          userData: { name: 'Test User', email: 'test@example.com' },
          redirectUrl: 'http://localhost:3000/payment-success'
        }),
      });
      
      const data = await response.json();
      setTestResult({ type: 'payment', data });
    } catch (error) {
      setTestResult({ type: 'error', data: { error: error.message } });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>PhonePe Integration Test</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testServiceInitialization}
          disabled={isLoading}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Testing...' : 'Test Service Initialization'}
        </button>
        
        <button 
          onClick={testPaymentInitiation}
          disabled={isLoading}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Testing...' : 'Test Payment Initiation'}
        </button>
      </div>
      
      {testResult && (
        <div style={{ 
          padding: '15px', 
          borderRadius: '4px',
          backgroundColor: testResult.type === 'error' ? '#f8d7da' : 
                          testResult.type === 'service' && testResult.data.success ? '#d4edda' : 
                          testResult.type === 'payment' && testResult.data.success ? '#d4edda' : '#f8d7da',
          border: `1px solid ${testResult.type === 'error' ? '#f5c6cb' : 
                              testResult.type === 'service' && testResult.data.success ? '#c3e6cb' : 
                              testResult.type === 'payment' && testResult.data.success ? '#c3e6cb' : '#f5c6cb'}`
        }}>
          <h3>Test Result:</h3>
          <pre style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '10px', 
            borderRadius: '4px',
            overflow: 'auto',
            maxHeight: '300px'
          }}>
            {JSON.stringify(testResult.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestPaymentComponent;