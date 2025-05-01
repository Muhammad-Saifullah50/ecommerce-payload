'use client'
import Image from 'next/image';

const RenderQRCode = ({ qrCodeUrl }: { qrCodeUrl: string }) => {
  if (qrCodeUrl) {
    return (
      <div className="mt-2">
        <h4>Payment QR Code</h4>
        <Image 
          src={qrCodeUrl} 
          alt="Payment QR Code" 
          style={{ maxWidth: '200px', margin: '10px 0' }}
        />
      </div>
    );
  }
  return null;
};

const PaymentField = ({ value }: { value: any }) => {
    if (!value) return null;
  
    return (
      <div className="payment-data">
        <h3>Payment Details</h3>
        <div>Reference: {value.referenceNumber}</div>
        <div>Status: {value.status || value.statusDescription}</div>
        <div>Amount: {value.amount} {value.currency}</div>
        <RenderQRCode qrCodeUrl={value.qrCodeUrl} />
      </div>
    );
  };

export default PaymentField
