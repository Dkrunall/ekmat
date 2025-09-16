export const dynamic = 'force-dynamic';

export default function PhonePeHelpPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>PhonePe Integration Help</h1>
      
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#d4edda', 
        color: '#155724',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <strong>✅ Great News:</strong>
        <p>Your PhonePe account is now "Live and ready for payments" according to your dashboard!</p>
      </div>
      
      <h2>Current Issue: "Key not found for the merchant"</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <p>Even though your account is live, you're still getting this error. This typically means one of the following:</p>
        <ul>
          <li>Your Merchant ID is incorrect or not properly activated</li>
          <li>Your Salt Key is incorrect</li>
          <li>There's a mismatch between your credentials and what's configured in PhonePe's system</li>
        </ul>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>1. Where to Find Your Real Credentials</h3>
        <p>In your PhonePe Business Dashboard, look for:</p>
        <ul>
          <li><strong>Merchant ID:</strong> Usually in the "Business Profile" or "Account Information" section</li>
          <li><strong>Salt Key:</strong> In the "API Keys" or "Merchant Credentials" section</li>
          <li><strong>Important:</strong> Make sure you're not using test/placeholder values</li>
        </ul>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>2. Common Credential Issues</h3>
        <ul>
          <li>Using test merchant IDs instead of live ones</li>
          <li>Using placeholder values like "YOUR_MERCHANT_ID_FROM_DASHBOARD"</li>
          <li>Copy-pasting extra spaces or characters</li>
          <li>Using credentials from a different environment (sandbox vs production)</li>
        </ul>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>3. Webhook Configuration</h3>
        <p><strong>Your ngrok URL:</strong> https://06d831075ba1.ngrok-free.app/</p>
        <p><strong>Webhook URL:</strong> https://06d831075ba1.ngrok-free.app/api/payment-callback</p>
        <p><strong>Redirect URL:</strong> https://06d831075ba1.ngrok-free.app/payment-success</p>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>4. Environment Variables</h3>
        <p>Current values in your [.env.local](file:///Users/krunaldarji/Downloads/upskill/.env.local) file:</p>
        <ul>
          <li>PHONEPE_MERCHANT_ID: {process.env.PHONEPE_MERCHANT_ID ? `***${process.env.PHONEPE_MERCHANT_ID.slice(-4)}` : 'Not set'}</li>
          <li>PHONEPE_SALT_KEY: {process.env.PHONEPE_SALT_KEY ? `***${process.env.PHONEPE_SALT_KEY.slice(-4)}` : 'Not set'}</li>
          <li>Environment: {process.env.NODE_ENV || 'Not set'}</li>
        </ul>
      </div>
      
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#fff3cd', 
        color: '#856404',
        borderRadius: '4px',
        marginBottom: '20px'
      }}>
        <strong>💡 Pro Tip:</strong>
        <p>Double-check that you're using the exact values from your PhonePe dashboard, including any special characters or case sensitivity.</p>
      </div>
      
      <div style={{ 
        padding: '15px', 
        backgroundColor: '#d1ecf1', 
        color: '#0c5460',
        borderRadius: '4px'
      }}>
        <strong>📞 If Credentials Are Correct:</strong>
        <p>If you've verified your credentials are correct but still get this error, contact PhonePe support with:</p>
        <ul>
          <li>Exact error message: "Key not found for the merchant"</li>
          <li>Your Merchant ID (last 4 digits only for privacy)</li>
          <li>Confirmation that your account shows "Live and ready for payments"</li>
          <li>Timestamp of when you started getting this error</li>
        </ul>
      </div>
    </div>
  );
}