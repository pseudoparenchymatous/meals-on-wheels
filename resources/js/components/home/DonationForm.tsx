import { SetStateAction, useState } from 'react';
import { Button } from "@/components/ui/button";

export default function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [donationType, setDonationType] = useState('one_time');
  const [frequency, setFrequency] = useState('monthly');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleCustomAmount = (value: SetStateAction<string>) => {
    setCustomAmount(value);
    setIsCustom(true);
    setSelectedAmount(0);
  };

  const getFinalAmount = () => {
    return isCustom ? parseFloat(customAmount) || 0 : selectedAmount;
  };

  const handleSubmit = async () => {
    if (getFinalAmount() <= 0 || !donorInfo.name || !donorInfo.email) {
      alert('Please fill in all required fields and select a donation amount.');
      return;
    }

    setIsSubmitting(true);

    const donationData = {
      donor_name: donorInfo.name,
      donor_email: donorInfo.email,
      amount: getFinalAmount(),
      currency: 'USD',
      donation_type: donationType,
      frequency: donationType === 'recurring' ? frequency : null,
      donor_message: donorInfo.message || null,
      is_anonymous: isAnonymous,
      status: 'pending',
      payment_method: paymentMethod,
    };

    try {
      // Add The actual API endpoint
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
        
        // Redirect to payment processor or show success message
        if (result.payment_url) {
          window.location.href = result.payment_url;
        } else {
          alert(`Thank you for your donation of $${getFinalAmount()}! You will receive a confirmation email shortly.`);
          
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
    } catch (error) {
      console.error('Donation submission error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          {/* Donation Type */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 transition-colors duration-300">Donation Type</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDonationType('one_time')}
                className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
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
                className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  donationType === 'recurring'
                    ? 'bg-pink-500 dark:bg-pink-600 text-white shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                }`}
              >
                Recurring
              </button>
            </div>
            
            {donationType === 'recurring' && (
              <div className="mt-4">
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-pink-400 dark:focus:border-pink-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 transition-colors duration-300"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            )}
          </div>

          {/* Amount Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Choose Amount</h3>
            
            <div className="grid grid-cols-5 gap-3 mb-6">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountSelect(amount)}
                  className={`py-4 px-2 rounded-xl font-semibold text-lg transition-all ${
                    selectedAmount === amount && !isCustom
                      ? 'bg-pink-500 text-white shadow-lg'
                      : 'bg-background text-foreground hover:bg-gray-100'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-foreground">$</span>
              <input
                type="number"
                min="1"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => handleCustomAmount(e.target.value)}
                className={`flex-1 px-4 py-4 text-lg border-2 rounded-xl focus:outline-none transition-colors text-foreground bg-background ${
                  isCustom ? 'border-pink-500 focus:ring-2 focus:ring-pink-200' : 'border-gray-200 focus:border-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Donor Info */}
          <div className="space-y-6 mb-8">
            <div>
              <input
                type="text"
                required
                value={donorInfo.name}
                onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 text-foreground bg-background placeholder-gray-500"
                placeholder="Full Name *"
                disabled={isAnonymous}
              />
            </div>
            <div>
              <input
                type="email"
                required
                value={donorInfo.email}
                onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 text-foreground bg-background placeholder-gray-500"
                placeholder="Email Address *"
              />
            </div>
            <div>
              <textarea
                rows={3}
                value={donorInfo.message}
                onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 text-foreground bg-background placeholder-gray-500"
                placeholder="Message (optional)"
              />
            </div>
            
            {/* Anonymous Donation Option */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-5 h-5 rounded accent-pink-500"
              />
              <label htmlFor="anonymous" className="text-foreground">
                Make this donation anonymous
              </label>
            </div>
          </div>

          {/* Donation Summary */}
          <div className="bg-background rounded-xl p-6 mb-8 border border-blue-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xl font-semibold text-foreground">
                Your {donationType === 'recurring' ? `${frequency} ` : ''}Donation:
              </span>
              <span className="text-3xl font-bold text-pink-600">
                ${getFinalAmount().toFixed(2)}
              </span>
            </div>
            {donationType === 'recurring' && (
              <p className="text-sm text-foreground">
                This amount will be charged {frequency}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={getFinalAmount() <= 0 || !donorInfo.name || !donorInfo.email || isSubmitting}
            className="w-full py-6 text-xl font-semibold rounded-xl bg-pink-500 hover:bg-pink-600 disabled:bg-background disabled:cursor-not-allowed transition-colors text-foreground"
          >
            {isSubmitting ? 'Processing...' : `Donate $${getFinalAmount().toFixed(2)}`}
          </Button>

          <p className="text-center text-foreground mt-6">
            Secure and encrypted donation
          </p>
        </div>
      </div>
    </div>
  );
}