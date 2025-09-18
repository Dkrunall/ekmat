import { NextResponse } from 'next/server';
import phonePeService from '../../../lib/services/phonepe-service';

export async function POST(request) {
  try {
    // Get the raw body for signature verification
    const rawBody = await request.text();
    const headers = Object.fromEntries(request.headers);
    
    console.log('Payment callback received:');
    console.log('- Headers:', headers);
    console.log('- Body:', rawBody);
    
    // Parse the body for processing
    const callbackData = JSON.parse(rawBody);
    
    // Extract order information
    const merchantOrderId = callbackData.payload?.merchantId;
    const transactionId = callbackData.payload?.transactionId;
    const state = callbackData.payload?.state;
    
    console.log('Payment callback details:');
    console.log('- Merchant Order ID:', merchantOrderId);
    console.log('- Transaction ID:', transactionId);
    console.log('- State:', state);
    
    // In a real application, you would:
    // 1. Verify the callback signature (if credentials are available)
    // 2. Update your database with the payment status
    // 3. Send confirmation emails
    // 4. Activate services/products
    
    // For now, we'll just log the information
    
    // If the payment was successful, you might want to save this information
    if (state === 'COMPLETED') {
      console.log('Payment completed successfully');
      // Update database, send confirmation, etc.
    } else {
      console.log('Payment not completed, status:', state);
    }
    
    // Return success response to PhonePe
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error('Error processing payment callback:', error);
    // Even if there's an error, we should return 200 to PhonePe
    // to acknowledge receipt of the callback
    return new NextResponse(null, { status: 200 });
  }
}

export async function GET(request) {
  try {
    // Handle redirect from PhonePe after payment
    const url = new URL(request.url);
    const transactionId = url.searchParams.get('transactionId');
    const merchantOrderId = url.searchParams.get('merchantOrderId');
    
    console.log('Payment redirect received:');
    console.log('- Transaction ID:', transactionId);
    console.log('- Merchant Order ID:', merchantOrderId);
    
    // In a real application, you would:
    // 1. Check the payment status in your database
    // 2. Redirect to appropriate page based on status
    
    // For now, we'll redirect to a success page
    return Response.redirect('http://localhost:3000/payment-success');
  } catch (error) {
    console.error('Error processing payment redirect:', error);
    return Response.redirect('http://localhost:3000/payment-success'); // Redirect to success page anyway
  }
}