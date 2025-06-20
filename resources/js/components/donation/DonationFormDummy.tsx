import { SetStateAction, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard } from 'lucide-react';
import { router } from '@inertiajs/react';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DonationFormDummy() {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [donationType, setDonationType] = useState('one_time');
  const [frequency, setFrequency] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: ''
  });

  const predefinedAmounts = [10, 25, 50, 100, 200];

  const handleAmountSelect = (amount: SetStateAction<number>) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setIsCustom(true);
    setSelectedAmount(0);
  };

  const getFinalAmount = () => {
    return isCustom ? parseFloat(customAmount) || 0 : selectedAmount;
  };

  const validateForm = () => {
    if (getFinalAmount() <= 0) {
      alert('Please select or enter a donation amount greater than $0.');
      return false;
    }

    if (!donorInfo.name.trim()) {
      alert('Please enter your full name.');
      return false;
    }

    if (!donorInfo.email.trim()) {
      alert('Please enter your email address.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(donorInfo.email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    const donationData = {
      donor_name: isAnonymous ? 'Anonymous' : donorInfo.name,
      donor_email: donorInfo.email,
      amount: getFinalAmount(),
      currency: 'USD',
      donation_type: donationType,
      frequency: donationType === 'recurring' ? frequency : null,
      donor_message: donorInfo.message || null,
      is_anonymous: isAnonymous,
      status: 'pending',
      payment_method: paymentMethod,
      payment_details: null,
      payment_metadata: null,
      payment_date: null,
      next_payment_date: donationType === 'recurring' ? new Date(Date.now() + (frequency === 'monthly' ? 30 : frequency === 'quarterly' ? 90 : 365) * 24 * 60 * 60 * 1000).toISOString() : null,
    };

    try {
      // Using Inertia.js for Laravel backend
      router.post('/donations', donationData, {
        onSuccess: (page) => {
          // Success - redirect to payment or show success message
          if (page.props.payment_url) {
            window.location.href = page.props.payment_url;
          } else {
            alert(`Thank you for your donation of $${getFinalAmount().toFixed(2)}! You will receive a confirmation email shortly.`);
            
            // Reset form
            setSelectedAmount(25);
            setCustomAmount('');
            setIsCustom(false);
            setDonorInfo({ name: '', email: '', message: '' });
            setDonationType('one_time');
            setPaymentMethod('stripe');
            setIsAnonymous(false);
          }
        },
        onError: (errors) => {
          // Handle validation errors
          if (errors.amount) {
            alert(`Amount error: ${errors.amount}`);
          } else if (errors.donor_email) {
            alert(`Email error: ${errors.donor_email}`);
          } else if (errors.donor_name) {
            alert(`Name error: ${errors.donor_name}`);
          } else {
            alert('Something went wrong. Please try again.');
          }
        },
        onFinish: () => {
          setIsSubmitting(false);
          setShowConfirmDialog(false);
        }
      });

      // Alternative: Direct fetch for API-ready approach (commented out for now)
      /*
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify(donationData),
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.payment_url) {
          window.location.href = result.payment_url;
        } else {
          alert(`Thank you for your donation of $${getFinalAmount().toFixed(2)}! You will receive a confirmation email shortly.`);
          
          // Reset form
          setSelectedAmount(25);
          setCustomAmount('');
          setIsCustom(false);
          setDonorInfo({ name: '', email: '', message: '' });
          setDonationType('one_time');
          setPaymentMethod('stripe');
          setIsAnonymous(false);
        }
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Something went wrong. Please try again.'}`);
      }
      */
    } catch (error) {
      console.error('Donation submission error:', error);
      alert('Network error. Please check your connection and try again.');
      setIsSubmitting(false);
      setShowConfirmDialog(false);
    }
  };

  const handleDonateClick = () => {
    if (!validateForm()) return;
    setShowConfirmDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-50 to-white-100 dark:from-black-900 dark:to-black-800 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
          </div>
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
            Make a Difference
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
            Help us deliver nutritious meals to seniors in our community
          </p>
        </div>

        {/* Impact Cards */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">$10</div>
            <div className="text-gray-600 dark:text-gray-400">2 meals</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">$25</div>
            <div className="text-gray-600 dark:text-gray-400">1 week of meals</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="text-3xl font-bold text-gray-800 dark:text-white">$100</div>
            <div className="text-gray-600 dark:text-gray-400">1 month of meals</div>
          </div>
        </div>

        {/* Donation Form */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          {isSubmitting && (
            <div className="mb-8 space-y-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}

          {/* Donation Type */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Donation Type</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDonationType('one_time')}
                disabled={isSubmitting}
                className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 ${
                  donationType === 'one_time'
                    ? 'bg-pink-500 dark:bg-pink-600 text-white shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                }`}
              >
                One-time
              </button>
              <button
                type="button"
                onClick={() => setDonationType('recurring')}
                disabled={isSubmitting}
                className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 ${
                  donationType === 'recurring'
                    ? 'bg-pink-500 dark:bg-pink-600 text-white shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                }`}
              >
                Recurring
              </button>
            </div>
            
            {donationType === 'recurring' && (
              <div className="mt-4 w-full max-w-md mx-auto px-4 sm:px-6">
                <Select value={frequency} onValueChange={setFrequency} disabled={isSubmitting}>
                  <SelectTrigger className="w-full h-14 px-5 text-base sm:text-lg rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-500">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent className="text-base">
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          {/* Payment Method Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('stripe')}
                disabled={isSubmitting}
                className={`py-4 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 ${
                  paymentMethod === 'stripe'
                    ? 'bg-pink-500 dark:bg-pink-600 text-white shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Credit Card</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                disabled={isSubmitting}
                className={`py-4 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 ${
                  paymentMethod === 'paypal'
                    ? 'bg-pink-500 dark:bg-pink-600 text-white shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                }`}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.79c.058-.365.394-.632.764-.632h8.116c.365 0 .693.206.855.53.162.324.138.715-.062 1.02L9.644 11.2a.641.641 0 0 0 .555.96h4.132c2.251 0 4.268-1.469 4.942-3.599.674-2.13-.122-4.431-1.947-5.628-.365-.239-.532-.679-.425-1.116.107-.437.49-.738.955-.754 2.316-.08 4.402 1.411 5.129 3.668.727 2.257-.122 4.716-2.086 6.046l-1.275 6.784a.641.641 0 0 1-.633.526H14.27a.641.641 0 0 1-.633-.526l.894-4.756H9.398l-.894 4.756a.641.641 0 0 1-.633.526z"/>
                </svg>
                <span>PayPal</span>
              </button>
            </div>
            
            {paymentMethod === 'paypal' && donationType === 'recurring' && (
              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors duration-300">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Note:</strong> PayPal recurring donations will redirect you to PayPal to set up automatic payments.
                </p>
              </div>
            )}
          </div>

          {/* Amount Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Choose Amount</h3>
            
            <div className="grid grid-cols-5 gap-3 mb-6">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountSelect(amount)}
                  disabled={isSubmitting}
                  className={`py-4 px-2 rounded-xl font-semibold text-lg transition-all duration-200 disabled:opacity-50 ${
                    selectedAmount === amount && !isCustom
                      ? 'bg-pink-500 dark:bg-pink-600 text-white shadow-lg'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">$</span>
              <Input
                type="number"
                min="1"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => handleCustomAmount(e.target.value)}
                disabled={isSubmitting}
                className={`flex-1 px-4 py-4 text-lg border-2 rounded-xl h-auto ${
                  isCustom ? 'border-pink-500 dark:border-pink-500' : 'border-gray-200 dark:border-gray-600'
                }`}
              />
            </div>
          </div>

          {/* Donor Info */}
          <div className="space-y-6 mb-8">
            <div>
              <Input
                type="text"
                required
                value={donorInfo.name}
                onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                placeholder="Full Name *"
                disabled={isAnonymous || isSubmitting}
                className="w-full px-4 py-4 text-lg h-auto"
              />
            </div>
            <div>
              <Input
                type="email"
                required
                value={donorInfo.email}
                onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                placeholder="Email Address *"
                disabled={isSubmitting}
                className="w-full px-4 py-4 text-lg h-auto"
              />
            </div>
            <div>
              <Textarea
                rows={3}
                value={donorInfo.message}
                onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                placeholder="Message (optional)"
                disabled={isSubmitting}
                className="w-full px-4 py-4 text-lg resize-none"
              />
            </div>
            
            {/* Anonymous Donation Option */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={checked => setIsAnonymous(checked === true)}
                disabled={isSubmitting}
                className="w-5 h-5"
              />
              <label htmlFor="anonymous" className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                Make this donation anonymous
              </label>
            </div>
          </div>

          {/* Donation Summary */}
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6 mb-8 border border-blue-100 dark:border-blue-800 transition-colors duration-300">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xl font-semibold text-gray-800 dark:text-white transition-colors duration-300">
                Your {donationType === 'recurring' ? `${frequency} ` : ''}Donation:
              </span>
              <span className="text-3xl font-bold text-pink-600 dark:text-pink-400 transition-colors duration-300">
                ${getFinalAmount().toFixed(2)}
              </span>
            </div>
            {donationType === 'recurring' && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This amount will be charged {frequency}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
            <AlertDialogTrigger asChild>
              <Button
                onClick={handleDonateClick}
                disabled={getFinalAmount() <= 0 || !donorInfo.name || !donorInfo.email || isSubmitting}
                className={`w-full py-6 text-xl font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed h-auto ${
                  paymentMethod === 'paypal' 
                    ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting 
                  ? 'Processing...' 
                  : `Donate $${getFinalAmount().toFixed(2)} with ${paymentMethod === 'stripe' ? 'Card' : 'PayPal'}`
                }
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Your Donation</AlertDialogTitle>
                <AlertDialogDescription>
                  You're about to donate <strong>${getFinalAmount().toFixed(2)}</strong> {donationType === 'recurring' ? `${frequency}` : 'as a one-time donation'} via {paymentMethod === 'stripe' ? 'credit card' : 'PayPal'}.
                  {isAnonymous && <span className="block mt-2 text-sm">This donation will be made anonymously.</span>}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Confirm Donation'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <p className="text-center text-gray-600 dark:text-gray-400 mt-6 transition-colors duration-300">
            Secure and encrypted donation via {paymentMethod === 'stripe' ? 'Stripe' : 'PayPal'}
          </p>
        </div>
      </div>
    </div>
  );
}