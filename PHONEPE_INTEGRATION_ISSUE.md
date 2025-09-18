# PhonePe V2 SDK Integration Issue Report

## Summary
We're experiencing authentication issues with the PhonePe V2 SDK integration. Despite our account showing as "Live and ready for payments" in the dashboard and using Live API credentials (confirmed by PhonePe support), we're getting "UnauthorizedAccess" errors when trying to authenticate.

## Environment Configuration
- **Merchant ID**: M23Y****TY8MA
- **Client ID**: SU25****7531
- **Client Secret**: Oa35****063a
- **Client Version**: 1
- **Environment**: production (using live credentials as confirmed by PhonePe support)
- **SDK Version**: pg-sdk-node@2.0.2
- **Integration Type**: Standard Checkout
- **Base URL**: https://bf6020a14e78.ngrok-free.app (using ngrok for HTTPS exposure)

## Issue Details
When attempting to authenticate with the PhonePe V2 SDK, we receive an "UnauthorizedAccess" error. Direct API testing confirms this issue:

### Direct API Test
- **Endpoint**: `https://api.phonepe.com/apis/identity-manager/v1/oauth/token`
- **Method**: POST
- **Status Code**: 401
- **Response**: 
  ```json
  {
    "code": "INVALID_CLIENT",
    "errorCode": "OIM004",
    "message": "Unauthorized: Invalid Client, trackingId: 363f6f5b1f17e0e5",
    "context": {
      "error_description": "Client authentication failure"
    }
  }
  ```

### SDK Test
- **Error**: `UnauthorizedAccess`
- **Message**: "Authentication failed - check your PhonePe V2 credentials"

## Steps Taken
1. Verified all environment variables are correctly set
2. Confirmed account status is "Live and ready for payments" in the dashboard
3. Confirmed with PhonePe support that these are Live API credentials
4. Updated environment to use production instead of development
5. Configured ngrok to expose localhost with HTTPS for proper testing
6. Updated redirect and callback URLs to use ngrok URL
7. Tested direct API calls using the same endpoint and parameters as the SDK
8. Verified we're using the correct V2 credentials (Client ID and Client Secret, not Salt Key)
9. Checked that we're using the correct SDK version (2.0.2)

## Expected Behavior
Authentication should succeed with our provided V2 credentials, allowing us to create payment requests.

## Actual Behavior
Authentication consistently fails with specific error:
- **Error Code**: `INVALID_CLIENT` (OIM004)
- **Message**: "Unauthorized: Invalid Client"
- **Description**: "Client authentication failure"

## Additional Information
According to PhonePe support: "It appears that you are currently integrating the web API by referring to V1 documentation which requires V1 credentials (salt key and salt index), whereas your account has been onboarded on V2 (client Id and client secret)."

However, we are using V2 credentials and the V2 SDK, yet authentication still fails. PhonePe has confirmed these are Live API credentials, so we've updated our environment to use production.

We're now using ngrok to expose our localhost with HTTPS, which should meet PhonePe's requirements for testing with live credentials.

The specific error code OIM004 and message "Unauthorized: Invalid Client" suggests that there's an issue with our client credentials, which could be due to:
1. Incorrect Client ID
2. Incorrect Client Secret
3. Incorrect Client Version
4. Credentials not properly activated for production use
5. Issues with the redirect/callback URLs

## Request
Please verify:
1. That our Client ID, Client Secret, and Client Version are correct for our merchant account
2. That our account is properly configured to use the Node.js SDK with these live credentials
3. If there are any additional steps needed to activate SDK access for our account
4. Whether there are any IP restrictions or other security settings that might be blocking our requests
5. The meaning of error code OIM004 and how to resolve it
6. If our ngrok URL (https://bf6020a14e78.ngrok-free.app) is properly configured for use with PhonePe