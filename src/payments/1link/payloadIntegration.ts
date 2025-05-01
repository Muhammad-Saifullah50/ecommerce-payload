import oneLinkConfig from './config';
import oneLinkClient from './client'

// Add to your payload.config.js endpoints
const oneLinkEndpoints = [
  {
    path: '/api/payments/1link/create',
    method: 'post',
    handler: async (req, res, next) => {
      try {
        const { orderId } = req.body;
        
        if (!orderId) {
          throw new Error('Order ID is required');
        }

        // Fetch order from database
        const payload = req.payload;
        const order = await payload.findByID({
          collection: 'orders',
          id: orderId,
        });

        if (!order) {
          throw new Error('Order not found');
        }

        // Create payment request
        const paymentData = {
          id: order.id,
          amount: order.totalAmount,
          currency: order.currency || 'PKR',
          email: order.customer.email,
          phone: order.customer.phone, // Include phone for SMS notifications
          customerName: `${order.customer.firstName} ${order.customer.lastName}`,
        };

        const paymentResponse = await oneLinkClient.createPayment(paymentData);

        // Update order with payment information
        await payload.update({
          collection: 'orders',
          id: orderId,
          data: {
            paymentStatus: 'pending',
            paymentMethod: '1link-raast',
            paymentData: {
              referenceNumber: paymentResponse.referenceNumber,
              transactionId: paymentResponse.transactionId,
              qrCodeUrl: paymentResponse.qrCodeUrl,
              qrCodeData: paymentResponse.qrCodeData,
              paymentUrl: paymentResponse.paymentUrl,
              createdAt: new Date().toISOString(),
            },
          },
        });

        // Return both QR code and payment URL for flexible implementation
        res.status(200).json({
          success: true,
          paymentUrl: paymentResponse.paymentUrl,
          qrCodeUrl: paymentResponse.qrCodeUrl,
          qrCodeData: paymentResponse.qrCodeData,
          referenceNumber: paymentResponse.referenceNumber,
          transactionId: paymentResponse.transactionId,
        });
      } catch (error) {
        console.error('1GO RAAST payment creation error:', error);
        res.status(500).json({
          success: false,
          message: error.message || 'Failed to create payment',
        });
      }
    },
  },
  {
    path: '/api/payments/1link/callback',
    method: 'post',
    handler: async (req, res, next) => {
      try {
        const { 
          referenceNumber,
          merchantId,
          terminalId,
          statusCode,
          statusDescription,
          amount,
          currency
        } = req.body;

        // Basic validation
        if (!referenceNumber || !statusCode) {
          throw new Error('Invalid callback data');
        }

        // Verify the merchantId matches for additional security
        if (merchantId !== oneLinkClient.config.merchantId) {
          throw new Error('Invalid merchant ID');
        }

        // Extract order ID from the reference number (based on our generation method)
        const orderIdPart = referenceNumber.substring(10);
        const orderId = parseInt(orderIdPart, 10);

        const payload = req.payload;
        
        // Verify payment with 1GO RAAST
        const verificationResult = await oneLinkClient.verifyPayment(referenceNumber);
        
        // Map 1GO RAAST status to our status
        let paymentStatus;
        switch(statusCode) {
          case '00': // Success
          case '000': // Success (alternate code)
            paymentStatus = 'paid';
            break;
          case '01': // Pending
          case '001': // Pending (alternate code)
            paymentStatus = 'pending';
            break;
          default:
            paymentStatus = 'failed';
        }
        
        // Find the order by extracted ID
        const order = await payload.findByID({
          collection: 'orders',
          id: orderId,
        });

        if (!order) {
          throw new Error('Order not found');
        }
        
        // Update order status
        await payload.update({
          collection: 'orders',
          id: orderId,
          data: {
            paymentStatus,
            paymentData: {
              ...order.paymentData,
              ...verificationResult,
              statusCode,
              statusDescription,
              updatedAt: new Date().toISOString(),
            },
          },
        });

        // Return success for webhook callbacks
        res.status(200).json({ success: true });
      } catch (error) {
        console.error('1GO RAAST callback error:', error);
        res.status(500).json({
          success: false,
          message: error.message || 'Failed to process payment callback',
        });
      }
    },
  },
  {
    path: '/api/payments/1link/verify/:referenceNumber',
    method: 'get',
    handler: async (req, res, next) => {
      try {
        const { referenceNumber } = req.params;
        
        if (!referenceNumber) {
          throw new Error('Reference number is required');
        }

        const verificationResult = await oneLinkClient.verifyPayment(referenceNumber);
        
        res.status(200).json({
          success: true,
          status: verificationResult.status,
          amount: verificationResult.amount,
          currency: verificationResult.currency,
          details: verificationResult,
        });
      } catch (error) {
        console.error('1GO RAAST verification error:', error);
        res.status(500).json({
          success: false,
          message: error.message || 'Failed to verify payment',
        });
      }
    },
  },
];

export default oneLinkEndpoints
