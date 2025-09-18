import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Log environment variables
    console.log('Direct PhonePe Test - Environment Check:');
    console.log('- PHONEPE_MERCHANT_ID:', process.env.PHONEPE_MERCHANT_ID);
    console.log('- PHONEPE_CLIENT_ID:', process.env.PHONEPE_CLIENT_ID);
    console.log('- PHONEPE_CLIENT_SECRET:', process.env.PHONEPE_CLIENT_SECRET);
    console.log('- PHONEPE_ENV:', process.env.PHONEPE_ENV);
    
    return NextResponse.json({ 
      success: true,
      message: 'Environment variables loaded successfully',
      env: {
        merchantId: process.env.PHONEPE_MERCHANT_ID,
        clientId: process.env.PHONEPE_CLIENT_ID,
        clientSecret: process.env.PHONEPE_CLIENT_SECRET ? 'SET' : 'NOT SET',
        environment: process.env.PHONEPE_ENV
      }
    });
  } catch (error) {
    console.error('Error in direct PhonePe test:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    // Try to get an auth token using V2 API with proper headers
    console.log('Attempting to get auth token using V2 API...');
    
    const authUrl = process.env.PHONEPE_ENV === 'production' 
      ? 'https://api.phonepe.com/apis/v1/authenticate' 
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/authenticate';
      
    console.log('Auth URL:', authUrl);
    
    // For V2, we need to use the X-Client-Id and X-Client-Secret headers
    const authResponse = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Client-Id': process.env.PHONEPE_CLIENT_ID,
        'X-Client-Secret': process.env.PHONEPE_CLIENT_SECRET
      },
      body: JSON.stringify({
        clientId: process.env.PHONEPE_CLIENT_ID,
        clientSecret: process.env.PHONEPE_CLIENT_SECRET,
        clientVersion: process.env.PHONEPE_CLIENT_VERSION || '1',
        grantType: 'client_credentials'
      })
    });
    
    console.log('Auth response status:', authResponse.status);
    
    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      console.error('Auth error response:', errorText);
      throw new Error(`Auth failed with status ${authResponse.status}: ${errorText}`);
    }
    
    const authData = await authResponse.json();
    console.log('Auth response data:', JSON.stringify(authData, null, 2));
    
    return NextResponse.json({ 
      success: true,
      message: 'Auth token obtained successfully',
      authData: authData
    });
    
  } catch (error) {
    console.error('Error in direct PhonePe test:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}