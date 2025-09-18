import { NextResponse } from 'next/server';
import phonePeService from '@/lib/services/phonepe-service';

export async function GET() {
  try {
    // Log environment variables
    console.log('PhonePe V2 Test - Environment Check:');
    console.log('- PHONEPE_MERCHANT_ID:', process.env.PHONEPE_MERCHANT_ID);
    console.log('- PHONEPE_CLIENT_ID:', process.env.PHONEPE_CLIENT_ID);
    console.log('- PHONEPE_CLIENT_SECRET:', process.env.PHONEPE_CLIENT_SECRET ? 'SET' : 'NOT SET');
    console.log('- PHONEPE_CLIENT_VERSION:', process.env.PHONEPE_CLIENT_VERSION);
    console.log('- PHONEPE_ENV:', process.env.PHONEPE_ENV);
    
    // Test authentication
    console.log('Testing PhonePe V2 authentication...');
    const authTest = await phonePeService.getAuthToken();
    
    console.log('Auth test result:', JSON.stringify(authTest, null, 2));
    
    // Also test a direct API call to see what we get
    console.log('Testing direct API call...');
    const directTest = await testDirectApi();
    
    return NextResponse.json({ 
      success: true,
      message: 'Environment variables loaded successfully',
      authTest: authTest,
      directTest: directTest,
      env: {
        merchantId: process.env.PHONEPE_MERCHANT_ID,
        clientId: process.env.PHONEPE_CLIENT_ID,
        clientSecret: process.env.PHONEPE_CLIENT_SECRET ? 'SET' : 'NOT SET',
        clientVersion: process.env.PHONEPE_CLIENT_VERSION,
        environment: process.env.PHONEPE_ENV
      }
    });
  } catch (error) {
    console.error('Error in PhonePe V2 test:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}

async function testDirectApi() {
  try {
    // Use the correct OAuth endpoint that the SDK uses
    // Based on BaseUrl.js, for sandbox it should be:
    // https://api-preprod.phonepe.com/apis/pg-sandbox
    // And the TokenConstants says the path is /v1/oauth/token
    const baseUrl = process.env.PHONEPE_ENV === 'production' 
      ? 'https://api.phonepe.com/apis/identity-manager' 
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox';
      
    const authUrl = `${baseUrl}/v1/oauth/token`;
      
    console.log('Direct API Auth URL:', authUrl);
    
    // Try with the correct form data that the SDK uses
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
    
    console.log('Direct API response status:', response.status);
    
    const textResponse = await response.text();
    console.log('Direct API response text:', textResponse);
    
    let responseData;
    try {
      responseData = JSON.parse(textResponse);
    } catch (parseError) {
      console.log('Response is not JSON, returning as text');
      responseData = { message: textResponse };
    }
    
    console.log('Direct API response data:', JSON.stringify(responseData, null, 2));
    
    return {
      success: response.ok,
      status: response.status,
      data: responseData
    };
  } catch (error) {
    console.error('Direct API test error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}