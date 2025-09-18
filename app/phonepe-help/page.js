import React from 'react';
import TestPaymentComponent from './test-payment';

export const metadata = {
  title: 'PhonePe Integration Help | Ekmat Gyan Jyoti',
  description: 'Help and troubleshooting for PhonePe payment integration',
};

// This component will run on the server side
const PhonePeHelpPage = async () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>PhonePe Integration Help</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <h2>Current Integration Status</h2>
        <p>You are currently using the <strong>PhonePe Node.js SDK (V2)</strong> which is the correct approach for your account.</p>
        <p>Based on PhonePe support confirmation, your account is onboarded on V2 which uses CLIENT_ID and CLIENT_SECRET.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Service Test</h2>
        <p>You've confirmed that the PhonePe service initializes correctly. Now let's test the actual payment initiation.</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Payment Initiation Test</h2>
        <TestPaymentComponent />
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Common Issues and Solutions</h2>
        <ul>
          <li><strong>"Client Not Found" Error</strong>: This typically occurs when:
            <ul>
              <li>Credentials are correct but client is not activated</li>
              <li>Using sandbox credentials in production mode</li>
              <li>There's a mismatch between your account configuration and credentials</li>
            </ul>
          </li>
          <li><strong>Authentication Failed</strong>: Verify that:
            <ul>
              <li>CLIENT_ID and CLIENT_SECRET are from the PhonePe Node.js SDK section</li>
              <li>Environment is set correctly (development/production)</li>
            </ul>
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2>Next Steps</h2>
        <ol>
          <li>Use the "Test Payment Initiation" button above to see if the actual payment request works</li>
          <li>If it fails, check the server logs for detailed error messages</li>
          <li>Contact PhonePe support with:
            <ul>
              <li>Your merchant ID: M23YUQTBTY8MA</li>
              <li>The exact error message you receive</li>
              <li>Confirmation that you're using V2 credentials</li>
            </ul>
          </li>
        </ol>
      </section>
    </div>
  );
};

export default PhonePeHelpPage;