import { NextResponse } from 'next/server';

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
    
    // If the payment was successful, send confirmation email
    if (state === 'COMPLETED') {
      console.log('Payment completed successfully');
      
      try {
        // Send email notification
        const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formData: callbackData.formData || {},
            paymentDetails: {
              transactionId,
              merchantOrderId,
              amount: '150',
              status: 'Completed'
            }
          }),
        });
        
        if (emailResponse.ok) {
          console.log('Confirmation email sent successfully');
        } else {
          console.error('Failed to send confirmation email');
        }
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
      }
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
    
    // Redirect based on payment status
    if (transactionId && merchantOrderId) {
      // Redirect to success page with transaction details
      return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-success?transactionId=${transactionId}&merchantOrderId=${merchantOrderId}`);
    } else {
      // Redirect to success page anyway
      return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-success`);
    }
  } catch (error) {
    console.error('Error processing payment redirect:', error);
    return Response.redirect(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-success`); // Redirect to success page anyway
  }
}