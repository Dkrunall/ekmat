# PhonePe Payment Gateway Setup

## Prerequisites

Before you can use the PhonePe payment gateway, you need to:

1. Have a PhonePe Business Account
2. Complete your business verification
3. Get your account approved for live transactions

## Steps to Complete PhonePe Integration

### 1. Complete Business Verification
- Log in to your PhonePe Business Dashboard
- Complete all required business verification steps
- Wait for your account to be approved for live transactions

### 2. Create Webhook
- In your PhonePe Business Dashboard, navigate to the Webhooks section
- For development, you'll need to use a tunneling service like ngrok to expose your localhost:
  1. Install ngrok: `npm install -g ngrok`
  2. Run your development server: `npm run dev`
  3. In another terminal, run: `ngrok http 3000`
  4. Use the ngrok URL for your webhook:
     ```
     https://your-ngrok-url.ngrok.io/api/payment-callback
     ```
- For production, use your production domain:
  ```
  https://yourdomain.com/api/payment-callback
  ```

### 3. Get API Credentials
Visit https://developer.phonepe.com and navigate to Developer Settings to get your credentials:

1. **MERCHANT_ID** - Your merchant identifier
2. **CLIENT_ID** - Your client identifier for SDK access
3. **CLIENT_SECRET** - Your client secret for SDK access
4. **SALT_KEY** - Your salt key for API authentication (see below for location)
5. **SALT_INDEX** - Usually "1" but confirm in your dashboard

#### Where to Find Your Salt Key
The salt key is often located in a different section of your PhonePe dashboard:

1. Look for sections like:
   - "API Keys"
   - "Merchant Credentials"
   - "Security Settings"
   - "Integration Settings"
   - "Payment Gateway Settings"
2. The salt key might be labeled as:
   - "Salt"
   - "Merchant Salt"
   - "Security Key"
   - "Auth Key"
   - "Secret Key"
   - "Hash Key"
3. It's often a long string of characters, different from your Client ID/Secret

#### If You Can't Find Your Salt Key
If you've checked all the common locations and still can't find your salt key:

1. **Check Your Email**: PhonePe often sends credentials via email after account approval
2. **Contact PhonePe Support**: Reach out to merchant support for assistance
3. **Check Account Status**: Ensure your account is approved for live transactions
4. **Request New Credentials**: Some dashboards allow you to regenerate or request new API keys

### 4. Update Environment Variables
Update the [.env.local](file:///Users/krunaldarji/Downloads/upskill/.env.local) file with your actual credentials:

```bash
PHONEPE_MERCHANT_ID=your_actual_merchant_id
PHONEPE_CLIENT_ID=your_actual_client_id
PHONEPE_CLIENT_SECRET=your_actual_client_secret
PHONEPE_SALT_KEY=your_actual_salt_key
PHONEPE_SALT_INDEX=1
```

### 5. Test the Integration
- Start your development server: `npm run dev`
- If using ngrok, start it: `ngrok http 3000`
- Visit http://localhost:3000/test-direct-payment
- Test the payment flow with a ₹1 transaction

## Troubleshooting

### Common Issues

1. **"Payment gateway configuration error" / "Key not found for the merchant"**
   - **Cause**: Your account is not yet approved for live transactions
   - **Solution**: Contact PhonePe support to verify your account status and request live access

2. **"UnauthorizedAccess"**
   - Your CLIENT_ID or CLIENT_SECRET is incorrect
   - Your SDK credentials are not activated

3. **Webhook Not Receiving Callbacks**
   - Check that your webhook URL is correctly configured
   - For localhost development, use ngrok or similar tunneling service
   - Verify the webhook is active in your dashboard
   - Test your ngrok URL is working: https://your-ngrok-url.ngrok.io/api/test-webhook

### Testing Your Webhook
You can test if your ngrok URL is working properly by:
1. Visiting: https://06d831075ba1.ngrok-free.app/api/test-webhook (GET request)
2. Sending a POST request to the same URL with any JSON data

## Development vs Production

### Development Environment
- Use ngrok to expose your localhost
- Use sandbox/testing credentials
- Test with small amounts (₹1)

### Production Environment
- Use your production domain
- Use live credentials
- Ensure SSL/HTTPS is configured

## Security Notes

- Never commit your actual credentials to version control
- Use environment variables for all sensitive information
- Rotate your keys periodically for security
- Use different keys for development and production environments

## Support

If you continue to have issues:
1. Contact PhonePe Merchant Support
2. Verify your account status in the dashboard
3. Check the PhonePe Developer Documentation: https://developer.phonepe.com