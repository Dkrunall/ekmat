import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'This endpoint only accepts POST requests for instructor applications. Please submit the form on the Become An Instructor page.'
  }, { status: 405 });
}

export async function POST(request) {
  try {
    const formData = await request.json();
    
    console.log('Instructor application received:', formData);
    
    // In a real application, you would save this to your database
    // and send an email notification
    
    // After successful form submission, initiate PhonePe payment
    // Use the proper API endpoint for production
    
    // Get the base URL for constructing proper URLs
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === 'production'
      ? 'https://ekmat.vercel.app'  // Replace with your actual domain
      : 'http://localhost:3000';
    
    console.log('Base URL for payment:', baseUrl);
    
    // Use a relative URL instead of absolute URL to avoid deployment issues
    const paymentResponse = await fetch(`${baseUrl}/api/initiate-phonepe-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 100, // 1 rupee in paise
        userData: formData,
        redirectUrl: `${baseUrl}/payment-success`,
        callbackUrl: `${baseUrl}/api/payment-callback`
      }),
    });
    
    console.log('Payment response status:', paymentResponse.status);
    
    // Check if the response is OK before trying to parse JSON
    if (!paymentResponse.ok) {
      const errorText = await paymentResponse.text();
      console.error('Payment response error text:', errorText);
      throw new Error(`Payment API returned ${paymentResponse.status}: ${errorText}`);
    }
    
    const paymentData = await paymentResponse.json();
    console.log('Payment response data:', paymentData);
    
    if (!paymentData.paymentUrl) {
      console.error('Payment initiation failed:', paymentData);
      // Even if payment fails, we still want to save the application
      return NextResponse.json({ 
        success: true, 
        message: 'Application submitted successfully. However, there was an issue initiating the payment. Please contact support.',
        paymentError: paymentData.error || 'Payment initiation failed'
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully',
      paymentUrl: paymentData.paymentUrl,
      merchantOrderId: paymentData.merchantOrderId
    });
    
  } catch (error) {
    console.error('Error processing instructor application:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process application',
      details: error.message
    }, { status: 500 });
  }
}