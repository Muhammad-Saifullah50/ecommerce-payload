import axios, { AxiosInstance } from 'axios';
import crypto from 'crypto';
import qs from 'querystring';
import oneLinkConfig from './config';

interface Config {
  baseUrl: string;
  clientId: string;
  clientSecret: string;
  merchantId: string;
  terminalId: string;
  merchantName: string;
  merchantIban: string;
  merchantCategory: string;
  callbackUrl: string;
  redirectUrl: string;
}

interface OrderData {
  id: number;
  amount: number | string;
  currency?: string;
  customerName: string;
  email: string;
  phone?: string;
}

interface PaymentResponse {
  transactionId: string;
  referenceNumber: string;
  qrCodeData: string;
  qrCodeUrl: string;
  paymentUrl: string;
  status: string;
}

interface VerifyPaymentResponse {
  referenceNumber: string;
  status: string;
  amount: string;
  currency: string;
  transactionDate: string;
  details: any;
}

class OneLinkClient {
  private config: Config;
  private axios: AxiosInstance;
  private authToken: string | null;
  private tokenExpiry: number | null;

  constructor() {
    this.config = oneLinkConfig;
    this.axios = axios.create({
      baseURL: this.config.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    this.authToken = null;
    this.tokenExpiry = null;
  }

  private generateSequence(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private generateTimestamp(): string {
    const now = new Date();
    return now.toISOString().replace(/[-:.TZ]/g, '');
  }

  private generateReferenceNumber(orderId: number): string {
    const timestamp = Date.now().toString().substring(0, 10);
    return `${timestamp}${orderId.toString().padStart(6, '0')}`;
  }

  private async getAuthToken(): Promise<string> {
    if (this.authToken && this.tokenExpiry && this.tokenExpiry > Date.now()) {
      return this.authToken;
    }

    try {
      const tokenResponse = await axios.post(
        `${this.config.baseUrl}/token`,
        qs.stringify({
          grant_type: 'client_credentials',
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          scope: 'payment',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const data = tokenResponse.data;

      if (data?.access_token) {
        this.authToken = data.access_token;
        this.tokenExpiry = Date.now() + (data.expires_in - 300) * 1000;
        return this.authToken;
      } else {
        throw new Error('Invalid token response');
      }
    } catch (error: any) {
      console.error('Error getting auth token:', error.response?.data || error.message);
      throw new Error('Failed to authenticate with 1GO RAAST P2M');
    }
  }

  public async createPayment(orderData: OrderData): Promise<PaymentResponse> {
    try {
      const token = await this.getAuthToken();
      const referenceNumber = this.generateReferenceNumber(orderData.id);
      const timestamp = this.generateTimestamp();
      const sequence = this.generateSequence();
      const formattedAmount = parseFloat(orderData.amount as string).toFixed(2);

      const paymentData = {
        merchantId: this.config.merchantId,
        terminalId: this.config.terminalId,
        merchantName: this.config.merchantName,
        merchantIban: this.config.merchantIban,
        merchantCategory: this.config.merchantCategory,
        referenceNumber: referenceNumber,
        amount: formattedAmount,
        currency: orderData.currency || 'PKR',
        customerReference: orderData.id.toString(),
        customerName: orderData.customerName,
        customerEmail: orderData.email,
        customerPhone: orderData.phone || '',
        description: `Payment for order #${orderData.id}`,
        callbackUrl: this.config.callbackUrl,
        redirectUrl: this.config.redirectUrl,
        timestamp: timestamp,
        sequence: sequence,
      };

      const response = await this.axios.post('/api/qrcode/generate', paymentData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Sequence': sequence,
          'X-Timestamp': timestamp,
        },
      });

      const data = response.data;

      return {
        transactionId: data.transactionId || referenceNumber,
        referenceNumber: referenceNumber,
        qrCodeData: data.qrCodeData,
        qrCodeUrl: data.qrCodeUrl,
        paymentUrl: data.paymentUrl,
        status: data.status,
      };
    } catch (error: any) {
      console.error('Error creating 1GO RAAST payment:', error.response?.data || error.message);
      throw new Error('Failed to create payment request');
    }
  }

  public async verifyPayment(referenceNumber: string): Promise<VerifyPaymentResponse> {
    try {
      const token = await this.getAuthToken();
      const timestamp = this.generateTimestamp();
      const sequence = this.generateSequence();

      const response = await this.axios.get(`/api/transaction/status/${referenceNumber}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Sequence': sequence,
          'X-Timestamp': timestamp,
        },
      });

      const data = response.data;

      return {
        referenceNumber,
        status: data.status,
        amount: data.amount,
        currency: data.currency,
        transactionDate: data.transactionDate,
        details: data,
      };
    } catch (error: any) {
      console.error('Error verifying 1GO RAAST payment:', error.response?.data || error.message);
      throw new Error('Failed to verify payment');
    }
  }
}

export default new OneLinkClient();
