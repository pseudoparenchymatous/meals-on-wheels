import { SetStateAction, useState } from 'react';
import { Heart, Users, Utensils } from 'lucide-react';

export default function DonationHero() {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
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

  const handleSubmit = () => {
    const finalAmount = isCustom ? parseFloat(customAmount) : selectedAmount;
    
    // Here you would typically integrate with a payment processor
    alert(`Thank you for your donation of ${finalAmount}! This would redirect to payment processing.`);
  };

  const getFinalAmount = () => {
    return isCustom ? parseFloat(customAmount) || 0 : selectedAmount;
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Make a Difference Today
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your donation helps us deliver nutritious meals to seniors in our community. 
            Every contribution brings comfort and nourishment to those who need it most.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Utensils className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">$10</div>
            <div className="text-gray-600">Provides 2 meals</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">$25</div>
            <div className="text-gray-600">Feeds 1 senior for a week</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <Heart className="h-8 w-8 text-red-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">$100</div>
            <div className="text-gray-600">Supports 1 senior for a month</div>
          </div>
        </div>

        {/* Donation Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div>
            {/* Amount Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Your Donation Amount</h3>
              
              {/* Predefined Amounts */}
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleAmountSelect(amount)}
                    className={`py-3 px-4 rounded-lg border-2 font-semibold transition-colors ${
                      selectedAmount === amount && !isCustom
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 text-gray-700 hover:border-green-400'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="flex items-center gap-3">
                <span className="text-gray-700">$</span>
                <input
                  type="number"
                  min="1"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className={`flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    isCustom ? 'border-green-500' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>

            {/* Donor Information */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={donorInfo.name}
                  onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={donorInfo.email}
                  onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Optional Message */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                rows={3}
                value={donorInfo.message}
                onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Share why you're supporting MerryMeal..."
              />
            </div>

            {/* Donation Summary */}
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">
                  Your Donation:
                </span>
                <span className="text-2xl font-bold text-green-600">
                  ${getFinalAmount().toFixed(2)}
                </span>
              </div>
              {getFinalAmount() >= 25 && (
                <p className="text-sm text-gray-600 mt-2">
                  This will provide meals for 1 senior for a week!
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={getFinalAmount() <= 0}
              className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Donate ${getFinalAmount().toFixed(2)}
            </button>
          </div>

          {/* Security Note */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>🔒 Your donation is secure and encrypted. We never store your payment information.</p>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Thank you for being part of the MerryMeal community. Together, we're making a difference 
            in the lives of seniors who need our support.
          </p>
        </div>
      </div>
    </div>
  );
}