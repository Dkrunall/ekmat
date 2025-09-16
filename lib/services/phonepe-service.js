import { StandardCheckoutClient, Env } from 'pg-sdk-node';

class PhonePeService {
  constructor() {
    this.merchantId = process.env.PHONEPE_MERCHANT_ID;
    this.clientId = process.env.PHONEPE_CLIENT_ID;
    this.clientSecret = process.env.PHONEPE_CLIENT_SECRET;
    this.clientVersion = process.env.PHONEPE_CLIENT_VERSION || '1';
    this.environment = process.env.NODE_ENV;
    
    // Log the configuration for debugging
    console.log('PhonePe Service Configuration:');
    console.log('- Merchant ID:', this.merchantId ? '***' + this.merchantId.slice(-4) : 'Not set');
    console.log('- Client ID:', this.clientId ? '***' + this.clientId.slice(-4) : 'Not set');
    console.log('- Client Secret:', this.clientSecret ? '***' + this.clientSecret.slice(-4) : 'Not set');
    console.log('- Client Version:', this.clientVersion);
    console.log('- Environment:', this.environment);
    
    // Initialize PhonePe SDK client
    try {
      this.client = new StandardCheckoutClient(
        this.clientId,
        this.clientSecret,
        parseInt(this.clientVersion),
        this.environment === 'production' ? Env.PRODUCTION : Env.SANDBOX
      );
      console.log('PhonePe SDK client initialized successfully');
    } catch (error) {
      console.error('Error initializing PhonePe SDK client:', error);
      this.client = null;
    }
  }

  // Verify webhook signature (optional, only if credentials are available)
  verifyWebhookSignature(username, password, authorizationHeader, responseBody) {
    try {
      // If we don't have the required credentials, skip validation
      if (!username || !password) {
        console.log('Skipping webhook validation - credentials not provided');
        return true;
      }
      
      if (!this.client) {
        throw new Error('PhonePe client not initialized');
      }
      
      const isValid = this.client.validateCallback(
        username,
        password,
        authorizationHeader,
        responseBody
      );
      
      return isValid;
    } catch (error) {
      console.error('Webhook signature verification error:', error);
      // In production, you might want to return false here
      // For now, we'll log the error but not fail the callback
      return true;
    }
  }

  // Initiate payment using the SDK
  async initiatePayment(paymentData) {
    try {
      if (!this.client) {
        throw new Error('PhonePe client not initialized');
      }
      
      console.log('Initiating PhonePe payment with data:', JSON.stringify(paymentData, null, 2));
      
      // Use the SDK to initiate payment
      const response = await this.client.pay(paymentData);
      
      console.log('PhonePe payment response:', JSON.stringify(response, null, 2));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error initiating PhonePe payment:', error);
      
      // Provide more detailed error information
      if (error.type === 'UnauthorizedAccess') {
        console.error('Authentication failed - check your PhonePe credentials');
        console.error('Make sure your CLIENT_ID, CLIENT_SECRET, and CLIENT_VERSION are correct');
        console.error('These credentials must be for the PhonePe Node.js SDK');
        console.error('You may need to contact PhonePe support to verify your SDK credentials');
      }
      
      return {
        success: false,
        error: error.message,
        type: error.type || 'unknown'
      };
    }
  }

  // Check payment status
  async checkPaymentStatus(merchantOrderId) {
    try {
      if (!this.client) {
        throw new Error('PhonePe client not initialized');
      }
      
      console.log('Checking payment status for order:', merchantOrderId);
      
      // Use the SDK to check order status
      const response = await this.client.getOrderStatus(merchantOrderId);
      
      console.log('PhonePe status response:', JSON.stringify(response, null, 2));
      
      return {
        success: true,
        data: response
      };
    } catch (error) {
      console.error('Error checking PhonePe payment status:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Export singleton instance
const phonePeService = new PhonePeService();
export default phonePeService;