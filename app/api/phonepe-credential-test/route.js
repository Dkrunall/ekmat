import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Log all environment variables for PhonePe
    console.log('PhonePe Credential Test - All Environment Variables:');
    console.log('- PHONEPE_MERCHANT_ID:', process.env.PHONEPE_MERCHANT_ID);
    console.log('- PHONEPE_CLIENT_ID:', process.env.PHONEPE_CLIENT_ID);
    console.log('- PHONEPE_CLIENT_SECRET:', process.env.PHONEPE_CLIENT_SECRET);
    console.log('- PHONEPE_CLIENT_VERSION:', process.env.PHONEPE_CLIENT_VERSION);
    console.log('- PHONEPE_ENV:', process.env.PHONEPE_ENV);
    
    // Check if all required variables are set
    const requiredVars = [
      'PHONEPE_MERCHANT_ID',
      'PHONEPE_CLIENT_ID',
      'PHONEPE_CLIENT_SECRET',
      'PHONEPE_CLIENT_VERSION'
    ];
    
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Missing required environment variables',
        missing: missingVars
      }, { status: 400 });
    }
    
    // Return the environment variables (masked for security)
    return NextResponse.json({
      success: true,
      message: 'All PhonePe environment variables are set',
      env: {
        merchantId: maskString(process.env.PHONEPE_MERCHANT_ID),
        clientId: maskString(process.env.PHONEPE_CLIENT_ID),
        clientSecret: maskString(process.env.PHONEPE_CLIENT_SECRET),
        clientVersion: process.env.PHONEPE_CLIENT_VERSION,
        environment: process.env.PHONEPE_ENV
      },
      // Include unmasked values for debugging (only in development)
      debug: process.env.NODE_ENV === 'development' ? {
        merchantId: process.env.PHONEPE_MERCHANT_ID,
        clientId: process.env.PHONEPE_CLIENT_ID,
        clientSecret: process.env.PHONEPE_CLIENT_SECRET,
        clientVersion: process.env.PHONEPE_CLIENT_VERSION,
        environment: process.env.PHONEPE_ENV
      } : undefined
    });
  } catch (error) {
    console.error('Error in PhonePe credential test:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

function maskString(str) {
  if (!str) return 'NOT SET';
  if (str.length <= 8) return '*'.repeat(str.length);
  const start = str.substring(0, 4);
  const end = str.substring(str.length - 4);
  return `${start}****${end}`;
}

export async function POST() {
  try {
    // This endpoint will help us test our credentials with PhonePe support
    // We'll create a detailed report of our configuration and test results
    
    const config = {
      merchantId: process.env.PHONEPE_MERCHANT_ID,
      clientId: process.env.PHONEPE_CLIENT_ID,
      clientSecret: process.env.PHONEPE_CLIENT_SECRET,
      clientVersion: process.env.PHONEPE_CLIENT_VERSION,
      environment: process.env.PHONEPE_ENV,
      sdkVersion: 'pg-sdk-node@2.0.2',
      integrationType: 'Standard Checkout',
      accountStatus: 'Live and ready for payments (as per dashboard)',
      credentialType: 'Live API credentials (confirmed by PhonePe support)',
      timestamp: new Date().toISOString(),
      testResults: {
        directApiTest: await testDirectApi(),
        sdkTest: await testSdk()
      }
    };
    
    console.log('PhonePe Credential Test Report:', JSON.stringify(config, null, 2));
    
    return NextResponse.json({
      success: true,
      message: 'Credential test report generated',
      config: config
    });
  } catch (error) {
    console.error('Error in PhonePe credential test POST:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

async function testDirectApi() {
  try {
    // Test the direct API call that matches what the SDK does
    // Since these are live credentials, we should test with production endpoints
    const baseUrl = process.env.PHONEPE_ENV === 'production' 
      ? 'https://api.phonepe.com/apis/identity-manager' 
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox';
      
    const authUrl = `${baseUrl}/v1/oauth/token`;
    
    const formBody = new URLSearchParams();
    formBody.append('client_id', process.env.PHONEPE_CLIENT_ID);
    formBody.append('client_secret', process.env.PHONEPE_CLIENT_SECRET);
    formBody.append('client_version', process.env.PHONEPE_CLIENT_VERSION || '1');
    formBody.append('grant_type', 'client_credentials');
    
    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      body: formBody
    });
    
    const textResponse = await response.text();
    
    let responseData;
    try {
      responseData = JSON.parse(textResponse);
    } catch (parseError) {
      responseData = { message: textResponse };
    }
    
    return {
      success: response.ok,
      status: response.status,
      url: authUrl,
      data: responseData
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function testSdk() {
  try {
    // This would test the SDK, but we can't import it here
    // We'll just return a placeholder
    return {
      success: false,
      message: 'SDK test not available in this endpoint',
      reason: 'Cannot import SDK in API route'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}