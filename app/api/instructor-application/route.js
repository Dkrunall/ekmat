import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.json();
    
    console.log('Instructor application received:', formData);
    
    // In a real application, you would save this to your database
    // and send an email notification
    
    // For now, we'll just log it and simulate a successful response
    
    // After successful form submission, initiate PhonePe payment
    // We'll use the direct API approach since the SDK is not working
    
    const paymentResponse = await fetch('http://localhost:3000/api/initiate-phonepe-direct-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 100, // 1 rupee in paise
        userData: formData,
        redirectUrl: 'http://localhost:3000/payment-success',
        callbackUrl: 'http://localhost:3000/api/payment-callback'
      }),
    });
    
    const paymentData = await paymentResponse.json();
    
    if (!paymentResponse.ok || !paymentData.paymentUrl) {
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
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to process application' 
    }, { status: 500 });
  }
}