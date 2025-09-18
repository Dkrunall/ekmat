import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { formData } = await request.json();
    
    if (!formData || !formData.fullName || !formData.email) {
      return NextResponse.json(
        { error: 'Missing required form data' },
        { status: 400 }
      );
    }

    // Get PhonePe V2 credentials
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

    // Step 1: Get OAuth Bearer token
    const authUrl = environment === 'production' 
      ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

    const formData_auth = new URLSearchParams();
    formData_auth.append('client_id', clientId);
    formData_auth.append('client_secret', clientSecret);
    formData_auth.append('client_version', clientVersion);
    formData_auth.append('grant_type', 'client_credentials');

    const authResponse = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData_auth,
    });

    if (!authResponse.ok) {
      console.error('PhonePe auth failed:', await authResponse.text());
      return NextResponse.json(
        { error: 'Failed to authenticate with PhonePe' },
        { status: 500 }
      );
    }

    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Failed to get access token' },
        { status: 500 }
      );
    }

    // Step 2: Generate unique merchant transaction ID
    const merchantTransactionId = `MT${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Create V2 payment payload according to PhonePe V2 API documentation
    const paymentPayload = {
      merchantOrderId: merchantTransactionId,
      amount: 15000, // 150 RS in paise
      paymentFlow: {
        type: 'PG_CHECKOUT',
        merchantUrls: {
          redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-success?merchantTransactionId=${merchantTransactionId}`
        }
      }
    };

    console.log('Initiating PhonePe V2 payment for:', formData.fullName);
    console.log('Merchant Transaction ID:', merchantTransactionId);
    console.log('Amount: ₹150');

    // Step 3: Determine V2 API URL based on environment
    const isProduction = environment === 'production';
    const paymentUrl = isProduction
      ? 'https://api.phonepe.com/apis/pg/checkout/v2/pay'
      : 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay';

    console.log('Making V2 payment request to:', paymentUrl);
    console.log('Using OAuth Bearer token authentication');

    // Make V2 payment request to PhonePe with O-Bearer token (PhonePe specific format)
    const paymentResponse = await fetch(paymentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `O-Bearer ${accessToken}`
      },
      body: JSON.stringify(paymentPayload)
    });

    if (!paymentResponse.ok) {
      console.log('V2 Payment response status:', paymentResponse.status);
      console.log('V2 Payment response headers:', Object.fromEntries(paymentResponse.headers));
      const paymentText = await paymentResponse.text();
      console.log('V2 Payment response text:', paymentText);
      return NextResponse.json(
        { error: `V2 Payment request failed: ${paymentResponse.status}`, details: paymentText },
        { status: paymentResponse.status }
      );
    }

    const paymentData = await paymentResponse.json();
    console.log('V2 Payment response:', paymentData);

    if (paymentData.orderId && paymentData.redirectUrl) {
      return NextResponse.json({
        success: true,
        paymentUrl: paymentData.redirectUrl,
        orderId: paymentData.orderId,
        merchantTransactionId: merchantTransactionId,
        message: 'V2 Payment initiated successfully'
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid V2 payment response from PhonePe', details: paymentData },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('PhonePe V2 payment error:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}