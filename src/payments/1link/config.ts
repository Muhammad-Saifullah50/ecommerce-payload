interface OneLinkConfig {
    merchantId: string;
    merchantName: string;
    merchantIban: string;
    terminalId: string;
    clientId: string;
    clientSecret: string;
    baseUrl: string;
    callbackUrl: string;
    redirectUrl: string;
    merchantCategory: string;
  }
  
  const oneLinkConfig: OneLinkConfig = {
    merchantId: process.env.ONE_LINK_MERCHANT_ID!,
    merchantName: process.env.ONE_LINK_MERCHANT_NAME!,
    merchantIban: process.env.ONE_LINK_MERCHANT_IBAN!, // Your bank account IBAN for receiving payments
    terminalId: process.env.ONE_LINK_TERMINAL_ID!,
    clientId: process.env.ONE_LINK_CLIENT_ID!,
    clientSecret: process.env.ONE_LINK_CLIENT_SECRET!,
    baseUrl: process.env.ONE_LINK_API_URL || 'https://sandbox.1link.net.pk/p2m-service', // Use production URL in production
    callbackUrl: process.env.ONE_LINK_CALLBACK_URL || 'https://yourdomain.com/api/payments/1link/callback',
    redirectUrl: process.env.ONE_LINK_REDIRECT_URL || 'https://yourdomain.com/checkout/success',
    merchantCategory: process.env.ONE_LINK_MERCHANT_CATEGORY || '5411', // Standard MCC code for your business
  };
  
  export default oneLinkConfig;
  