import { NextResponse } from 'next/server';
import phonePeDirectService from '../../../lib/services/phonepe-direct-service';

export async function POST(request) {
  try {
    const { amount, userData, redirectUrl, callbackUrl, mobileNumber } = await request.json();
    
    // Validate the amount (should be 100 paise = 1 rupee as per requirement)
    if (amount !== 100) {
      return NextResponse.json({ 
        error: 'Invalid amount. Only 1 rupee payment is allowed.' 
      }, { status: 400 });
    }
    
    // Check if required environment variables are set
    if (!process.env.PHONEPE_MERCHANT_ID || !process.env.PHONEPE_SALT_KEY) {
      return NextResponse.json({ 
        error: 'Payment gateway is not properly configured. Please check your environment variables.' 
      }, { status: 500 });
    }
    
    // Generate a unique merchant order ID
    const merchantOrderId = `MO_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    
    // Prepare payment request data
    const paymentData = {
      merchantOrderId: merchantOrderId,
      amount: amount, // 100 paise = 1 rupee
      redirectUrl: redirectUrl || 'http://localhost:3000/payment-success',
      callbackUrl: callbackUrl || 'http://localhost:3000/api/payment-callback',
      mobileNumber: mobileNumber || userData?.phone || '9999999999'
    };
    
    // Initiate payment using our PhonePe direct service
    const response = await phonePeDirectService.initiatePayment(paymentData);
    
    console.log('PhonePe Direct API response:', JSON.stringify(response, null, 2));
    
    if (response.success && response.data?.redirectUrl) {
      // Return the payment URL to redirect the user
      return NextResponse.json({ 
        paymentUrl: response.data.redirectUrl,
        merchantOrderId: merchantOrderId
      });
    } else {
      console.error('PhonePe payment initiation failed:', response);
      
      // Handle specific error cases
      if (response.error) {
        // If it's a configuration error, provide a more specific message
        if (response.code === 'KEY_NOT_CONFIGURED') {
          return NextResponse.json({ 
            error: 'Payment gateway configuration error. Please verify your PhonePe merchant credentials are correct and activated. You may need to contact PhonePe support to activate your account.',
            code: response.code
          }, { status: 500 });
        }
        
        throw new Error(response.error);
      }
      
      throw new Error('Payment initiation failed. Please try again later.');
    }
  } catch (error) {
    console.error('Error initiating PhonePe payment:', error);
    
    // Handle specific error messages
    if (error.message.includes('configuration error')) {
      return NextResponse.json({ 
        error: 'Payment gateway configuration error. Please contact support to verify merchant account setup.' 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      error: error.message || 'Failed to initiate payment. Please try again.' 
    }, { status: 500 });
  }
}