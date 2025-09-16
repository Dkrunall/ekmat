import crypto from 'crypto';

class PhonePeDirectService {
  constructor() {
    this.merchantId = process.env.PHONEPE_MERCHANT_ID;
    this.saltKey = process.env.PHONEPE_SALT_KEY;
    this.saltIndex = process.env.PHONEPE_SALT_INDEX || '1';
    this.environment = process.env.NODE_ENV;
    this.host = this.environment === 'production' 
      ? 'https://api.phonepe.com/apis/hermes' 
      : 'https://api-preprod.phonepe.com/apis/hermes';
    
    console.log('PhonePe Direct Service Configuration:');
    console.log('- Merchant ID:', this.merchantId ? '***' + this.merchantId.slice(-4) : 'Not set');
    console.log('- Salt Key:', this.saltKey ? '***' + this.saltKey.slice(-4) : 'Not set');
    console.log('- Salt Index:', this.saltIndex);
    console.log('- Environment:', this.environment);
    console.log('- Host:', this.host);
  }

  // Generate X-VERIFY header
  generateXVerify(endpoint, payload) {
    const payloadString = JSON.stringify(payload);
    const base64Payload = Buffer.from(payloadString).toString('base64');
    const stringToHash = base64Payload + endpoint + this.saltKey;
    const sha256Hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
    return sha256Hash + '###' + this.saltIndex;
  }

  // Initiate payment using direct API
  async initiatePayment(paymentData) {
    try {
      const endpoint = '/pg/v1/pay';
      const url = this.host + endpoint;
      
      // Prepare the request payload
      const payload = {
        merchantId: this.merchantId,
        merchantTransactionId: paymentData.merchantOrderId,
        merchantUserId: 'MU_' + Date.now(),
        amount: paymentData.amount,
        redirectUrl: paymentData.redirectUrl || 'http://localhost:3000/payment-success',
        redirectMode: 'REDIRECT',
        callbackUrl: paymentData.callbackUrl || 'http://localhost:3000/api/payment-callback',
        mobileNumber: paymentData.mobileNumber || '9999999999',
        paymentInstrument: {
          type: 'PAY_PAGE'
        }
      };

      const xVerify = this.generateXVerify(endpoint, payload);
      
      console.log('Initiating PhonePe payment with direct API:', JSON.stringify(payload, null, 2));
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': xVerify,
          'accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log('PhonePe direct API response:', JSON.stringify(data, null, 2));
      
      if (data.code === 'PAYMENT_INITIATED' && data.data?.instrumentResponse?.redirectInfo?.url) {
        return {
          success: true,
          data: {
            redirectUrl: data.data.instrumentResponse.redirectInfo.url
          }
        };
      } else {
        // Provide more detailed error information
        if (data.code === 'KEY_NOT_CONFIGURED') {
          console.error('PhonePe configuration error: Key not found for the merchant');
          console.error('Please verify the following:');
          console.error('1. Your MERCHANT_ID is correct:', this.merchantId);
          console.error('2. Your SALT_KEY is correct and activated in the PhonePe dashboard');
          console.error('3. Your merchant account is properly configured for API access');
          console.error('4. You may need to contact PhonePe support to activate your credentials');
        }
        
        return {
          success: false,
          error: data.message || 'Payment initiation failed',
          code: data.code || 'UNKNOWN_ERROR',
          data: data
        };
      }
    } catch (error) {
      console.error('Error initiating PhonePe payment via direct API:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Export singleton instance
const phonePeDirectService = new PhonePeDirectService();
export default phonePeDirectService;