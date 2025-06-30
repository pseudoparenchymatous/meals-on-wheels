import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { router } from '@inertiajs/react';

// Type definitions
interface DonationData {
  donor_name: string;
  donor_email: string;
  amount: number;
  currency: string;
  donation_type: 'one_time' | 'recurring';
  frequency?: 'monthly' | 'quarterly' | 'yearly' | null;
  donor_message?: string | null;
  is_anonymous: boolean;
}

interface StripeTestProps {
  donationData: DonationData;
  onSuccess: () => void;
  onCancel: () => void;
}

// Initialize Stripe
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51RaWcFPjCTAsAkUkE08jzymhCBYpiU0A4qAwqDUiJF0mD4qR6YDS3YWHbKD0x8ApNsojTCwE3ZNPWnbiMxCrP9cn00vpJNSmOF';
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const DonationForm: React.FC<StripeTestProps> = ({ donationData, onSuccess, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please try again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        setError('Card element not found. Please refresh and try again.');
        setLoading(false);
        return;
      }
      
      // Create payment method
      const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: donationData.donor_name,
          email: donationData.donor_email,
        },
      });

      if (methodError) {
        setError(methodError.message || 'An error occurred with your payment method.');
        setLoading(false);
        return;
      }

      if (!paymentMethod) {
        setError('Failed to create payment method. Please try again.');
        setLoading(false);
        return;
      }

      // Prepare data for Laravel backend
      const backendData = {
        donor_name: donationData.donor_name,
        donor_email: donationData.donor_email,
        amount: donationData.amount,
        currency: donationData.currency,
        donation_type: donationData.donation_type,
        frequency: donationData.frequency,
        donor_message: donationData.donor_message,
        is_anonymous: donationData.is_anonymous,
        payment_method: 'stripe',
        payment_method_id: paymentMethod.id, // This is the key field for your Laravel controller
      };

      // Call your Laravel API using Inertia.js
      router.post('/donations', backendData, {
        onSuccess: (page) => {
          // Success - call the success callback
          onSuccess();
          alert(`Thank you for your donation of $${donationData.amount.toFixed(2)}! You will receive a confirmation email shortly.`);
        },
        onError: (errors) => {
          // Handle validation errors from Laravel
          console.error('Donation submission errors:', errors);
          
          if (errors.amount) {
            setError(`Amount error: ${errors.amount}`);
          } else if (errors.donor_email) {
            setError(`Email error: ${errors.donor_email}`);
          } else if (errors.donor_name) {
            setError(`Name error: ${errors.donor_name}`);
          } else if (errors.payment_method_id) {
            setError(`Payment method error: ${errors.payment_method_id}`);
          } else {
            setError('Something went wrong with your donation. Please try again.');
          }
        },
        onFinish: () => {
          setLoading(false);
        }
      });

    } catch (err) {
      console.error('Donation error:', err);
      setError('An error occurred while processing your donation. Please try again.');
      setLoading(false);
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: '#424770',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146',
        iconColor: '#9e2146'
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Complete Your Donation</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Element */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Card Information *
          </label>
          <div className="p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white">
            <CardElement options={cardStyle} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2 px-4 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!stripe || loading}
            className={`flex-1 py-2 px-4 rounded-md text-white font-medium transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-pink-600 hover:bg-pink-700'
            }`}
          >
            {loading ? 'Processing...' : `Donate $${donationData.amount.toFixed(2)}`}
          </button>
        </div>
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Your payment information is secure and encrypted.</p>
        <p>Powered by Stripe</p>
      </div>
    </div>
  );
};

// Main component that wraps the form with Stripe Elements
const StripeTest: React.FC<StripeTestProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <DonationForm {...props} />
    </Elements>
  );
};

export default StripeTest;