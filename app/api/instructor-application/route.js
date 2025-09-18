import { NextResponse } from 'next/server';
import phonePeService from '@/lib/services/phonepe-service';

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
    const paymentData = {
      merchantOrderId: merchantOrderId,
      amount: 100, // 1 Rupee in paise
      paymentFlow: {
        type: "PG_CHECKOUT",
        merchantUrls: {
          redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-success`
        }
      }
    };
    
    console.log('Initiating PhonePe payment with data:', JSON.stringify(paymentData, null, 2));
    
    // Initiate PhonePe payment
    const paymentResponse = await phonePeService.initiatePayment(paymentData);
    
    if (!paymentResponse.success) {
      console.error('PhonePe payment initiation failed:', paymentResponse);
      
      // If it's an authentication error, provide more specific information
      if (paymentResponse.type === 'UnauthorizedAccess') {
        return NextResponse.json({ 
          success: false, 
          error: 'Payment gateway authentication failed',
          details: 'There was an issue authenticating with the payment gateway. Please contact support.',
          errorCode: paymentResponse.errorCode,
          errorMessage: paymentResponse.errorMessage
        }, { status: 500 });
      }
      
      throw new Error(`Payment initiation failed: ${paymentResponse.error}`);
    }
    
    // Extract payment URL from response
    let paymentUrl = '';
    if (paymentResponse.data && paymentResponse.data.redirectUrl) {
      paymentUrl = paymentResponse.data.redirectUrl;
    } else if (paymentResponse.data && paymentResponse.data.payload && paymentResponse.data.payload.url) {
      paymentUrl = paymentResponse.data.payload.url;
    }
    
    console.log('Payment URL:', paymentUrl);
    
    if (!paymentUrl) {
      throw new Error('Payment URL not found in response');
    }
    
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