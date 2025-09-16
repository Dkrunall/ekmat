import { NextResponse } from 'next/server';

export async function GET() {
  // Return the environment variables (masked for security)
  const merchantId = process.env.PHONEPE_MERCHANT_ID;
  const saltKey = process.env.PHONEPE_SALT_KEY;
  const saltIndex = process.env.PHONEPE_SALT_INDEX;
  
  // Mask the sensitive data for security
  const maskedMerchantId = merchantId ? `${merchantId.substring(0, 4)}****${merchantId.substring(merchantId.length - 4)}` : 'NOT SET';
  const maskedSaltKey = saltKey ? `${saltKey.substring(0, 4)}****${saltKey.substring(saltKey.length - 4)}` : 'NOT SET';
  
  return NextResponse.json({ 
    success: true,
    environment: process.env.NODE_ENV,
    merchantId: maskedMerchantId,
    saltKeySet: !!saltKey,
    saltIndex: saltIndex || 'NOT SET',
    // Add more detailed info for debugging
    hasMerchantId: !!merchantId,
    hasSaltKey: !!saltKey,
    hasSaltIndex: !!saltIndex
  });
}

export async function POST() {
  // Test the actual values
  const merchantId = process.env.PHONEPE_MERCHANT_ID;
  const saltKey = process.env.PHONEPE_SALT_KEY;
  const saltIndex = process.env.PHONEPE_SALT_INDEX;
  
  return NextResponse.json({ 
    merchantId: merchantId ? 'SET' : 'NOT SET',
    saltKey: saltKey ? 'SET' : 'NOT SET',
    saltIndex: saltIndex || 'NOT SET'
  });
}