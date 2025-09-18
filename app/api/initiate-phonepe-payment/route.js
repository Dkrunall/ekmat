import { NextResponse } from 'next/server';
import phonePeService from '../../../lib/services/phonepe-service';
import { StandardCheckoutPayRequest } from 'pg-sdk-node';

export async function GET() {
  return NextResponse.json({ 
    message: 'This endpoint only accepts POST requests for initiating PhonePe payments.'
  }, { status: 405 });
}

export async function POST(request) {
  try {
    const { amount, userData, redirectUrl, callbackUrl } = await request.json();
    
    console.log('=== Payment initiation request received ===');
    console.log('Amount:', amount);
    console.log('Redirect URL:', redirectUrl);
    console.log('Callback URL:', callbackUrl);
    console.log('User Data:', JSON.stringify(userData, null, 2));
    
    // Validate the amount (should be 100 paise = 1 rupee as per requirement)
    if (amount !== 100) {
      console.log('Invalid amount provided:', amount);
      return NextResponse.json({ 
        error: 'Invalid amount. Only 1 rupee payment is allowed.' 
      }, { status: 400 });
    }
    
    // Check if required environment variables are set
    console.log('=== Environment variables check ===');
    console.log('- PHONEPE_MERCHANT_ID:', process.env.PHONEPE_MERCHANT_ID ? 'SET' : 'NOT SET');
    console.log('- PHONEPE_CLIENT_ID:', process.env.PHONEPE_CLIENT_ID ? 'SET' : 'NOT SET');
    console.log('- PHONEPE_CLIENT_SECRET:', process.env.PHONEPE_CLIENT_SECRET ? 'SET' : 'NOT SET');
    console.log('- NODE_ENV:', process.env.NODE_ENV || 'NOT SET');
    
    if (!process.env.PHONEPE_MERCHANT_ID || !process.env.PHONEPE_CLIENT_ID || !process.env.PHONEPE_CLIENT_SECRET) {
      console.log('Missing required environment variables');
      return NextResponse.json({ 
        error: 'Payment gateway is not properly configured. Please contact support.' 
      }, { status: 500 });
    }
    
    // Generate a unique merchant order ID
    const merchantOrderId = `MO_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    console.log('Generated merchant order ID:', merchantOrderId);
    
    // Prepare payment request data using the SDK builder
    console.log('=== Building payment request ===');
    const payRequestBuilder = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(amount) // 100 paise = 1 rupee
      .redirectUrl(redirectUrl || 'http://localhost:3000/payment-success');
    
    const payRequest = payRequestBuilder.build();
    console.log('Payment request built successfully:', JSON.stringify(payRequest, null, 2));
    
    // Check if PhonePe service is properly initialized
    if (!phonePeService.client) {
      console.error('PhonePe service not properly initialized');
      return NextResponse.json({ 
        error: 'Payment gateway is not properly initialized. Please check the service configuration.' 
      }, { status: 500 });
    }
    
    // Log the environment being used
    console.log('=== Environment Information ===');
    console.log('Current environment:', process.env.NODE_ENV || 'development');
    console.log('Using PhonePe SDK in', process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'SANDBOX', 'mode');
    
    // Initiate payment using our PhonePe service
    console.log('=== Initiating payment with PhonePe service ===');
    const response = await phonePeService.initiatePayment(payRequest);
    
    console.log('PhonePe API response:', JSON.stringify(response, null, 2));
    
    if (response.success && response.data?.redirectUrl) {
      console.log('Payment initiated successfully, redirect URL:', response.data.redirectUrl);
      // Return the payment URL to redirect the user
      return NextResponse.json({ 
        paymentUrl: response.data.redirectUrl,
        merchantOrderId: merchantOrderId
      });
    } else {
      console.error('PhonePe payment initiation failed:', response);
      
      // Handle specific error cases
      if (response.error) {
        // If it's an authentication error, provide a more specific message
        if (response.type === 'UnauthorizedAccess') {
          console.error('PhonePe authentication failed');
          return NextResponse.json({ 
            error: 'Payment gateway authentication failed. Please verify your PhonePe SDK credentials are correct and activated. You may need to contact PhonePe support to verify your SDK credentials.' 
          }, { status: 500 });
        }
        
        console.error('Payment initiation error:', response.error);
        return NextResponse.json({ 
          error: response.error
        }, { status: 500 });
      }
      
      console.error('Unknown payment initiation error');
      return NextResponse.json({ 
        error: 'Payment initiation failed. Please try again later.'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('=== ERROR in payment initiation ===');
    console.error('Error initiating PhonePe payment:', error);
    console.error('Error stack:', error.stack);
    
    // Handle specific error messages
    if (error.message.includes('configuration error')) {
      return NextResponse.json({ 
        error: 'Payment gateway configuration error. Please contact support to verify merchant account setup.' 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      error: error.message || 'Failed to initiate payment. Please try again.',
      details: error.stack
    }, { status: 500 });
  }
}