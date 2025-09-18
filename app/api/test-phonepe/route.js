import { NextResponse } from 'next/server';
import phonePeService from '../../../lib/services/phonepe-service';
import { StandardCheckoutPayRequest } from 'pg-sdk-node';

export async function GET() {
  try {
    // Log ALL environment variables for debugging
    console.log('=== ALL ENVIRONMENT VARIABLES ===');
    console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
    console.log('process.env.PHONEPE_ENV:', process.env.PHONEPE_ENV);
    console.log('process.env.PHONEPE_MERCHANT_ID:', process.env.PHONEPE_MERCHANT_ID ? 'SET' : 'NOT SET');
    console.log('process.env.PHONEPE_CLIENT_ID:', process.env.PHONEPE_CLIENT_ID ? 'SET' : 'NOT SET');
    console.log('process.env.PHONEPE_CLIENT_SECRET:', process.env.PHONEPE_CLIENT_SECRET ? 'SET' : 'NOT SET');
    
    // Check if PhonePe service is initialized
    const isServiceInitialized = !!phonePeService.client;
    console.log('PhonePe Service Initialized:', isServiceInitialized);
    
    if (!isServiceInitialized) {
      return NextResponse.json({ 
        success: false,
        error: 'PhonePe service not initialized',
        details: 'Check your environment variables and credentials',
        env: {
          nodeEnv: process.env.NODE_ENV,
          phonepeEnv: process.env.PHONEPE_ENV,
          merchantId: process.env.PHONEPE_MERCHANT_ID ? 'SET' : 'NOT SET',
          clientId: process.env.PHONEPE_CLIENT_ID ? 'SET' : 'NOT SET',
          clientSecret: process.env.PHONEPE_CLIENT_SECRET ? 'SET' : 'NOT SET'
        }
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'PhonePe service is properly initialized',
      environment: process.env.PHONEPE_ENV || process.env.NODE_ENV || 'development',
      merchantId: process.env.PHONEPE_MERCHANT_ID ? '***' + process.env.PHONEPE_MERCHANT_ID.slice(-4) : 'NOT SET',
      clientId: process.env.PHONEPE_CLIENT_ID ? '***' + process.env.PHONEPE_CLIENT_ID.slice(-4) : 'NOT SET',
      allEnv: {
        nodeEnv: process.env.NODE_ENV,
        phonepeEnv: process.env.PHONEPE_ENV,
        merchantId: process.env.PHONEPE_MERCHANT_ID ? 'SET' : 'NOT SET',
        clientId: process.env.PHONEPE_CLIENT_ID ? 'SET' : 'NOT SET',
        clientSecret: process.env.PHONEPE_CLIENT_SECRET ? 'SET' : 'NOT SET'
      }
    });
    
  } catch (error) {
    console.error('Error testing PhonePe service:', error);
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST() {
  try {
    // Log environment variables for debugging
    console.log('=== PhonePe Test Payment Route ===');
    console.log('- PHONEPE_MERCHANT_ID:', process.env.PHONEPE_MERCHANT_ID ? 'SET' : 'NOT SET');
    console.log('- PHONEPE_CLIENT_ID:', process.env.PHONEPE_CLIENT_ID ? 'SET' : 'NOT SET');
    console.log('- PHONEPE_CLIENT_SECRET:', process.env.PHONEPE_CLIENT_SECRET ? 'SET' : 'NOT SET');
    console.log('- NODE_ENV:', process.env.NODE_ENV || 'NOT SET');
    console.log('- PHONEPE_ENV:', process.env.PHONEPE_ENV || 'NOT SET');
    console.log('- Using Environment:', (process.env.PHONEPE_ENV || process.env.NODE_ENV) === 'production' ? 'PRODUCTION' : 'SANDBOX');
    
    // Check if PhonePe service is initialized
    const isServiceInitialized = !!phonePeService.client;
    console.log('PhonePe Service Initialized:', isServiceInitialized);
    
    if (!isServiceInitialized) {
      return NextResponse.json({ 
        success: false,
        error: 'PhonePe service not initialized',
        details: 'Check your environment variables and credentials'
      }, { status: 500 });
    }
    
    // Try to create a test payment request
    console.log('Creating test payment request...');
    
    // Generate a unique merchant order ID
    const merchantOrderId = `TEST_MO_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    console.log('Generated test merchant order ID:', merchantOrderId);
    
    // Prepare payment request data using the SDK builder
    const payRequestBuilder = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(100) // 1 rupee in paise
      .redirectUrl('http://localhost:3000/payment-success');
    
    const payRequest = payRequestBuilder.build();
    console.log('Test payment request built successfully');
    console.log('Payment Request Details:', JSON.stringify(payRequest, null, 2));
    
    // Try to initiate the payment
    console.log('Attempting to initiate test payment...');
    const response = await phonePeService.initiatePayment(payRequest);
    
    console.log('PhonePe test payment response:', JSON.stringify(response, null, 2));
    
    if (response.success && response.data?.redirectUrl) {
      console.log('Test payment initiated successfully, redirect URL:', response.data.redirectUrl);
      return NextResponse.json({ 
        success: true,
        message: 'Test payment initiated successfully',
        redirectUrl: response.data.redirectUrl,
        merchantOrderId: merchantOrderId,
        environment: (process.env.PHONEPE_ENV || process.env.NODE_ENV) === 'production' ? 'PRODUCTION' : 'SANDBOX'
      });
    } else {
      console.error('Test payment initiation failed:', response);
      return NextResponse.json({ 
        success: false,
        error: response.error || 'Test payment initiation failed',
        type: response.type || 'unknown',
        details: response,
        environment: (process.env.PHONEPE_ENV || process.env.NODE_ENV) === 'production' ? 'PRODUCTION' : 'SANDBOX'
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('=== ERROR in payment initiation ===');
    console.error('Error testing PhonePe payment:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json({ 
      success: false,
      error: error.message,
      stack: error.stack,
      type: error.type || 'unknown'
    }, { status: 500 });
  }
}