// PhonePe Credentials Verification Script
// This script helps verify that your PhonePe V2 credentials are correctly configured

export const verifyPhonePeCredentials = () => {
  const requiredEnvVars = [
    'PHONEPE_MERCHANT_ID',
    'PHONEPE_CLIENT_ID',
    'PHONEPE_CLIENT_SECRET'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  console.log('PhonePe Credentials Verification:');
  console.log('================================');

  if (missingVars.length > 0) {
    console.log('❌ Missing environment variables:');
    missingVars.forEach(varName => console.log(`   - ${varName}`));
    return false;
  }

  console.log('✅ All required environment variables are present');
  
  // Log credential information (masked)
  console.log('\nCredential Information:');
  console.log('- Merchant ID:', process.env.PHONEPE_MERCHANT_ID ? 
    `***${process.env.PHONEPE_MERCHANT_ID.slice(-4)}` : 'NOT SET');
  console.log('- Client ID:', process.env.PHONEPE_CLIENT_ID ? 
    `***${process.env.PHONEPE_CLIENT_ID.slice(-4)}` : 'NOT SET');
  console.log('- Client Secret:', process.env.PHONEPE_CLIENT_SECRET ? 
    `***${process.env.PHONEPE_CLIENT_SECRET.slice(-4)}` : 'NOT SET');
  console.log('- Environment:', process.env.NODE_ENV || 'development');

  // Check if credentials look like V2 credentials
  const clientId = process.env.PHONEPE_CLIENT_ID || '';
  const clientSecret = process.env.PHONEPE_CLIENT_SECRET || '';

  console.log('\nCredential Format Check:');
  if (clientId.startsWith('SU') || clientId.startsWith('PU')) {
    console.log('ℹ️  Client ID appears to be V2 format (SU/PU prefix)');
  } else {
    console.log('⚠️  Client ID may not be in V2 format');
  }

  if (clientSecret.includes('-') && clientSecret.length > 20) {
    console.log('ℹ️  Client Secret appears to be V2 format (UUID format)');
  } else {
    console.log('⚠️  Client Secret may not be in V2 format');
  }

  return true;
};