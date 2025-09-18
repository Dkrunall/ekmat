import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const clientId = process.env.PHONEPE_CLIENT_ID;
    const clientSecret = process.env.PHONEPE_CLIENT_SECRET;
    const clientVersion = process.env.PHONEPE_CLIENT_VERSION || '1';
    const environment = process.env.PHONEPE_ENV || 'production';

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'PhonePe credentials not configured' },
        { status: 500 }
      );
    }

    // Use appropriate URL based on environment
    const authUrl = environment === 'production' 
      ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

    const formData = new URLSearchParams();
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);
    formData.append('client_version', clientVersion);
    formData.append('grant_type', 'client_credentials');

    console.log('Requesting PhonePe auth token...');
    
    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('PhonePe auth error:', responseData);
      return NextResponse.json(
        { error: 'Failed to authenticate with PhonePe', details: responseData },
        { status: response.status }
      );
    }

    console.log('PhonePe auth successful');
    
    return NextResponse.json({
      success: true,
      accessToken: responseData.access_token,
      tokenType: responseData.token_type,
      expiresIn: responseData.expires_in,
    });
  } catch (error) {
    console.error('Error in PhonePe authentication:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}