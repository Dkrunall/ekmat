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
    
    // Generate a unique merchant order ID
    const merchantOrderId = `MO_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    
    // Prepare payment data according to V2 documentation
    const paymentRequestData = {
      merchantOrderId: merchantOrderId,
      amount: 100, // 1 Rupee in paise
      paymentFlow: {
        type: "PG_CHECKOUT",
        merchantUrls: {
          redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-success`
        }
      }
    };
    
    console.log('Initiating PhonePe payment with data:', JSON.stringify(paymentRequestData, null, 2));
    
    // Call the phonepe-payment API directly
    const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/phonepe-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData }),
    });
    
    if (!paymentResponse.ok) {
      const errorData = await paymentResponse.json();
      console.error('PhonePe payment initiation failed:', errorData);
      
      return NextResponse.json({ 
        success: false, 
        error: 'Payment gateway authentication failed',
        details: errorData.error || 'There was an issue with the payment gateway. Please contact support.',
      }, { status: 500 });
    }
    
    const paymentData = await paymentResponse.json();
    
    if (!paymentData.success || !paymentData.paymentUrl) {
      throw new Error('Payment URL not found in response');
    }
    
    const paymentUrl = paymentData.paymentUrl;
    
    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully',
      paymentUrl: paymentUrl
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