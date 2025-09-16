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
    
    // Validate the amount (should be 100 paise = 1 rupee as per requirement)
    if (amount !== 100) {
      return NextResponse.json({ 
        error: 'Invalid amount. Only 1 rupee payment is allowed.' 
      }, { status: 400 });
    }
    
    // Check if required environment variables are set
    if (!process.env.PHONEPE_MERCHANT_ID || !process.env.PHONEPE_CLIENT_ID || !process.env.PHONEPE_CLIENT_SECRET) {
      return NextResponse.json({ 
        error: 'Payment gateway is not properly configured. Please contact support.' 
      }, { status: 500 });
    }
    
    // Generate a unique merchant order ID
    const merchantOrderId = `MO_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    
    // Prepare payment request data using the SDK builder
    const payRequestBuilder = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(amount) // 100 paise = 1 rupee
      .redirectUrl(redirectUrl || 'http://localhost:3000/payment-success');
    
    // Note: Callback URL is configured in the PhonePe dashboard, not in the request
    // The callbackUrl parameter is used for server-side notification configuration
    
    const payRequest = payRequestBuilder.build();
    
    // Initiate payment using our PhonePe service
    const response = await phonePeService.initiatePayment(payRequest);
    
    console.log('PhonePe API response:', JSON.stringify(response, null, 2));
    
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
        // If it's an authentication error, provide a more specific message
        if (response.type === 'UnauthorizedAccess') {
          return NextResponse.json({ 
            error: 'Payment gateway authentication failed. Please verify your PhonePe SDK credentials are correct and activated. You may need to contact PhonePe support to verify your SDK credentials.' 
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