import React, { useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const PayWithOneLink = ({ orderId }: { orderId: string }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [paymentData, setPaymentData] = useState(null)
  const [paymentOption, setPaymentOption] = useState<string>('qr') // 'qr' or 'redirect'

 

  const initiatePayment = async () => {
    setLoading(true)
    setError(null)
    setPaymentData(null)

    try {
      const response = await axios.post('/api/payments/1link/create', {
        orderId,
      })

      if (response.data.success) {
        if (paymentOption === 'qr' && (response.data.qrCodeUrl || response.data.qrCodeData)) {
          // Show QR code
          setPaymentData(response.data)
        } else if (response.data.paymentUrl) {
          // Redirect to 1Link payment page
          window.location.href = response.data.paymentUrl
        } else {
          throw new Error('No payment method available')
        }
      } else {
        throw new Error('Failed to create payment')
      }
    } catch (err) {
      console.error('Payment initiation error:', err)
      setError(err.response?.data?.message || 'Failed to initiate payment')
    } finally {
      setLoading(false)
    }
  }

  const checkPaymentStatus = async () => {
    if (!paymentData?.referenceNumber) return

    setLoading(true)
    try {
      const response = await axios.get(`/api/payments/1link/verify/${paymentData.referenceNumber}`)

      if (response.data.success && response.data.status === 'SUCCESSFUL') {
        // Redirect to success page
        window.location.href = `/order/success?orderId=${orderId}`
      } else if (response.data.status === 'FAILED') {
        setError('Payment failed. Please try again.')
        setPaymentData(null)
      } else {
        // Still pending
        alert('Payment is still processing. Please complete the payment in your banking app.')
      }
    } catch (err) {
      console.error('Payment verification error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full py-4">
      <h3 className="text-xl font-semibold text-center">Pay with 1GO RAAST</h3>
      <p className="text-center">Securely pay using your bank account via 1GO RAAST.</p>

      {!paymentData && !loading && (
        <div className="flex flex-col gap-2">
          <RadioGroup defaultValue="qr">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="qr" id="qr" onChange={() => setPaymentOption('qr')} />
              <Label htmlFor="qr"> QR Code Payment (Scan & Pay)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="redirect"
                id="redirect"
                onChange={() => setPaymentOption('redirect')}
              />
              <Label htmlFor="redirect"> Bank App/Website</Label>
            </div>
          </RadioGroup>

          {error && <div className="payment-error">{error}</div>}

          <Button type="submit" onClick={initiatePayment} disabled={loading} className="w-full">
            {loading ? 'Processing...' : 'Pay Now with 1GO RAAST'}
          </Button>
        </div>
      )}

      {paymentData && paymentData.qrCodeUrl && paymentOption === 'qr' && (
        <div className="qr-payment-section">
          <h4>Scan this QR code with your banking app</h4>
          <p>Reference: {paymentData.referenceNumber}</p>

          <div className="qr-code-container">
            <Image src={paymentData.qrCodeUrl} alt="Payment QR Code" className="qr-code-image" />
          </div>

          <p className="qr-instructions">
            1. Open your banking app
            <br />
            2. Select "Scan QR" or "QR Payment"
            <br />
            3. Point your camera at this QR code
            <br />
            4. Confirm the payment amount
          </p>

          <div className="verify-payment">
            <button onClick={checkPaymentStatus} disabled={loading} className="verify-button">
              {loading ? 'Checking...' : "I've Completed Payment"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PayWithOneLink
