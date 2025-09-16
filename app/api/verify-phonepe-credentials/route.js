import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Get environment variables
    const merchantId = process.env.PHONEPE_MERCHANT_ID;
    const saltKey = process.env.PHONEPE_SALT_KEY;
    const saltIndex = process.env.PHONEPE_SALT_INDEX || '1';
    const environment = process.env.NODE_ENV;
    
    // Basic validation
    if (!merchantId || !saltKey) {
      return NextResponse.json({ 
        success: false,
        message: 'Missing required credentials',
        suggestions: [
          'Check your .env.local file',
          'Ensure PHONEPE_MERCHANT_ID is set',
          'Ensure PHONEPE_SALT_KEY is set'
        ]
      }, { status: 400 });
    }
    
    // Check if using placeholder values
    if (merchantId === 'YOUR_MERCHANT_ID_FROM_DASHBOARD' || 
        saltKey === 'YOUR_SALT_KEY_FROM_DASHBOARD' ||
        saltKey === '0987654321fedcba') {
      return NextResponse.json({ 
        success: false,
        message: 'Using placeholder credentials',
        suggestions: [
          'Update your .env.local file with actual credentials',
          'Get real credentials from your PhonePe Business Dashboard',
          'Look for "API Keys" or "Merchant Credentials" section'
        ]
      }, { status: 400 });
    }
    
    // Validate the format
    const merchantIdValid = merchantId.length > 5;
    const saltKeyValid = saltKey.length > 10;
    const saltIndexValid = !isNaN(parseInt(saltIndex));
    
    if (!merchantIdValid || !saltKeyValid || !saltIndexValid) {
      return NextResponse.json({ 
        success: false,
        message: 'Invalid credential format',
        details: {
          merchantIdValid,
          saltKeyValid,
          saltIndexValid
        },
        suggestions: [
          'Verify your Merchant ID format',
          'Verify your Salt Key format',
          'Verify your Salt Index is a number',
          'Contact PhonePe support if format seems correct'
        ]
      }, { status: 400 });
    }
    
    // If we get here, the credentials look valid
    return NextResponse.json({ 
      success: true,
      message: 'PhonePe credentials format appears valid',
      details: {
        merchantId: `***${merchantId.slice(-4)}`,
        saltKey: `***${saltKey.slice(-4)}`,
        saltIndex: saltIndex,
        environment: environment || 'development'
      },
      suggestions: [
        'Try making a test payment',
        'If payment fails, contact PhonePe support with error details'
      ]
    });
    
  } catch (error) {
    console.error('Error verifying credentials:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      message: 'Failed to verify credentials'
    }, { status: 500 });
  }
}