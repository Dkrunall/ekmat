import { NextResponse } from 'next/server';
import phonePeService from '../../../lib/services/phonepe-service';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantTransactionId = searchParams.get('transactionId');
    
    if (!merchantTransactionId) {
      return NextResponse.json({ 
        error: 'Missing transactionId parameter' 
      }, { status: 400 });
    }
    
    // Check if required environment variables are set
    if (!process.env.PHONEPE_MERCHANT_ID || !process.env.PHONEPE_SALT_KEY || !process.env.PHONEPE_SALT_INDEX) {
      return NextResponse.json({ 
        error: 'Payment gateway is not properly configured. Please contact support.' 
      }, { status: 500 });
    }
    
    // Check payment status using our PhonePe service
    const response = await phonePeService.checkPaymentStatus(merchantTransactionId);
    
    console.log('PhonePe Status Check Response:', JSON.stringify(response, null, 2));
    
    if (response.success) {
      return NextResponse.json({ 
        success: true,
        data: response.data
      });
    } else {
      return NextResponse.json({ 
        success: false,
        error: response.data?.message || 'Failed to check payment status'
      }, { status: response.status || 500 });
    }
  } catch (error) {
    console.error('Error checking PhonePe payment status:', error);
    
    return NextResponse.json({ 
      success: false,
      error: error.message || 'Failed to check payment status' 
    }, { status: 500 });
  }
}