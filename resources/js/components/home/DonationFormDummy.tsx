import React, { useState, useEffect, useMemo } from 'react';

// --- Dummy UI Components (to replace shadcn/ui) ---

const Button = ({ onClick, children, className, disabled }) => (
  <button onClick={onClick} className={className} disabled={disabled}>
    {children}
  </button>
);

const Input = ({ type, value, onChange, placeholder, disabled, className, min }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className={`border-2 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 ${className}`}
    min={min}
  />
);

const Textarea = ({ value, onChange, placeholder, disabled, className, rows }) => (
  <textarea
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className={`border-2 rounded-xl resize-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 ${className}`}
    rows={rows}
  />
);

const Checkbox = ({ id, checked, onCheckedChange, disabled, className }) => (
  <input
    id={id}
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    disabled={disabled}
    className={`accent-pink-500 ${className}`}
  />
);

const Select = ({ children, value, onValueChange, disabled }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    disabled={disabled}
    className="w-full h-12 px-4 text-base rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-pink-400 focus:border-pink-400"
  >
    {children}
  </select>
);

const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;

const AlertDialog = ({ open, onOpenChange, children }) => {
    if (!open) return null;
    return (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={() => onOpenChange(false)}
        >
            <div 
              className="bg-white w-full max-w-md m-4 p-6 rounded-2xl shadow-2xl text-center transform transition-transform duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

const AlertDialogContent = ({ children }) => <div>{children}</div>;
const AlertDialogHeader = ({ children }) => <div className="mb-4">{children}</div>;
const AlertDialogTitle = ({ children }) => <h2 className="text-2xl font-bold text-gray-800 mb-2">{children}</h2>;
const AlertDialogDescription = ({ children }) => <div className="text-gray-600 mb-6">{children}</div>;
const AlertDialogFooter = ({ children }) => <div className="flex justify-end gap-3">{children}</div>;
const AlertDialogCancel = ({ children, disabled, onClick }) => (
    <Button
        onClick={onClick}
        disabled={disabled}
        className="py-2 px-5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
    >
        {children}
    </Button>
);
const AlertDialogAction = ({ children, disabled, onClick }) => (
    <Button
        onClick={onClick}
        disabled={disabled}
        className="py-2 px-5 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-semibold disabled:bg-pink-300"
    >
        {children}
    </Button>
);

// --- Message Box Component ---
const MessageBox = ({ message, type, visible }) => (
    <div className={`fixed left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-lg text-white font-semibold transition-all duration-500 z-50 ${visible ? 'top-5' : '-top-20'} ${type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
        <p>{message}</p>
    </div>
);


// --- Main Donation Form Component ---
function DonationForm() {
    const [selectedAmount, setSelectedAmount] = useState(25);
    const [customAmount, setCustomAmount] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    const [donationType, setDonationType] = useState('one_time');
    const [frequency, setFrequency] = useState('monthly');
    const [paymentMethod, setPaymentMethod] = useState('stripe');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [donorInfo, setDonorInfo] = useState({ name: '', email: '', message: '' });
    const [message, setMessage] = useState({ text: '', type: 'error', visible: false });

    const predefinedAmounts = [10, 25, 50, 100, 200];

    const showMessage = (text, type = 'error') => {
        setMessage({ text, type, visible: true });
        setTimeout(() => {
            setMessage({ text: '', type, visible: false });
        }, 3000);
    };

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setIsCustom(false);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        setCustomAmount(e.target.value);
        if (e.target.value) {
            setIsCustom(true);
            setSelectedAmount(0);
        } else {
            setIsCustom(false);
            if (predefinedAmounts.includes(25)) {
                 setSelectedAmount(25);
            }
        }
    };
    
    const handleCustomAmountFocus = () => {
        setIsCustom(true);
        setSelectedAmount(0);
    };

    const getFinalAmount = useMemo(() => {
        return isCustom ? parseFloat(customAmount) || 0 : selectedAmount;
    }, [isCustom, customAmount, selectedAmount]);

    const validateForm = () => {
        if (getFinalAmount <= 0) {
            showMessage('Please select or enter a donation amount.');
            return false;
        }
        if (!isAnonymous && !donorInfo.name.trim()) {
            showMessage('Please enter your full name.');
            return false;
        }
        if (!donorInfo.email.trim()) {
            showMessage('Please enter your email address.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(donorInfo.email)) {
            showMessage('Please enter a valid email address.');
            return false;
        }
        return true;
    };

    const handleDonateClick = () => {
        if (validateForm()) {
            setShowConfirmDialog(true);
        }
    };

    const resetForm = () => {
        setSelectedAmount(25);
        setCustomAmount('');
        setIsCustom(false);
        setDonationType('one_time');
        setFrequency('monthly');
        setPaymentMethod('stripe');
        setIsAnonymous(false);
        setDonorInfo({ name: '', email: '', message: '' });
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        console.log('Submitting donation:', {
            amount: getFinalAmount,
            donorInfo,
            donationType,
            frequency,
            paymentMethod,
            isAnonymous
        });

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setShowConfirmDialog(false);
            showMessage(`Thank you for your $${getFinalAmount.toFixed(2)} donation!`, 'success');
            resetForm();
        }, 1500);
    };
    
    useEffect(() => {
        if (isAnonymous) {
            setDonorInfo(d => ({ ...d, name: 'Anonymous' }));
        } else {
             setDonorInfo(d => ({ ...d, name: '' }));
        }
    }, [isAnonymous]);


    return (
        <>
            <MessageBox message={message.text} type={message.type} visible={message.visible} />
            <div className="bg-gray-50 font-sans">
                <div className="max-w-2xl mx-auto px-4 py-12">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">Make a Difference</h1>
                        <p className="text-lg text-gray-600">Help us deliver nutritious meals to seniors in our community.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                        <div className="bg-white rounded-xl p-5 text-center shadow-sm border"><div className="text-3xl font-bold text-gray-800">$10</div><div className="text-gray-600">2 meals</div></div>
                        <div className="bg-white rounded-xl p-5 text-center shadow-sm border"><div className="text-3xl font-bold text-gray-800">$25</div><div className="text-gray-600">1 week of meals</div></div>
                        <div className="bg-white rounded-xl p-5 text-center shadow-sm border"><div className="text-3xl font-bold text-gray-800">$100</div><div className="text-gray-600">1 month of meals</div></div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border">
                        {/* Donation Type */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Donation Type</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Button onClick={() => setDonationType('one_time')} disabled={isSubmitting} className={`py-3 px-4 rounded-xl font-medium transition-all ${donationType === 'one_time' ? 'bg-pink-500 text-white shadow-md' : 'bg-gray-50 border'}`}>One-time</Button>
                                <Button onClick={() => setDonationType('recurring')} disabled={isSubmitting} className={`py-3 px-4 rounded-xl font-medium transition-all ${donationType === 'recurring' ? 'bg-pink-500 text-white shadow-md' : 'bg-gray-50 border'}`}>Recurring</Button>
                            </div>
                            {donationType === 'recurring' && (
                                <div className="mt-4">
                                    <Select value={frequency} onValueChange={setFrequency} disabled={isSubmitting}>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="quarterly">Quarterly</SelectItem>
                                        <SelectItem value="yearly">Yearly</SelectItem>
                                    </Select>
                                </div>
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className="mb-6">
                           <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Method</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Button onClick={() => setPaymentMethod('stripe')} disabled={isSubmitting} className={`py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${paymentMethod === 'stripe' ? 'bg-pink-500 text-white shadow-md' : 'bg-gray-50 border'}`}>Credit Card</Button>
                                <Button onClick={() => setPaymentMethod('paypal')} disabled={isSubmitting} className={`py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${paymentMethod === 'paypal' ? 'bg-pink-500 text-white shadow-md' : 'bg-gray-50 border'}`}>PayPal</Button>
                            </div>
                        </div>

                        {/* Amount Selection */}
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Amount</h3>
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                                {predefinedAmounts.map(amount => (
                                    <Button key={amount} onClick={() => handleAmountSelect(amount)} disabled={isSubmitting} className={`py-3 px-2 rounded-xl font-semibold text-lg transition-all ${!isCustom && selectedAmount === amount ? 'bg-pink-500 text-white shadow-md' : 'bg-gray-50 border'}`}>
                                        ${amount}
                                    </Button>
                                ))}
                            </div>
                             <div className="flex items-center gap-3">
                                <span className="text-2xl font-semibold text-gray-700">$</span>
                                <Input type="number" min="1" placeholder="Custom amount" value={customAmount} onChange={handleCustomAmountChange} onFocus={handleCustomAmountFocus} disabled={isSubmitting} className={`flex-1 px-4 py-3 text-lg ${isCustom ? 'border-pink-500' : 'border-gray-200'}`} />
                            </div>
                        </div>
                        
                        {/* Donor Info */}
                        <div className="space-y-4 mb-6">
                            <Input type="text" placeholder="Full Name *" value={donorInfo.name} onChange={(e) => setDonorInfo({...donorInfo, name: e.target.value})} disabled={isSubmitting || isAnonymous} className="w-full px-4 py-3 text-lg" />
                            <Input type="email" placeholder="Email Address *" value={donorInfo.email} onChange={(e) => setDonorInfo({...donorInfo, email: e.target.value})} disabled={isSubmitting} className="w-full px-4 py-3 text-lg" />
                            <Textarea placeholder="Message (optional)" rows={3} value={donorInfo.message} onChange={(e) => setDonorInfo({...donorInfo, message: e.target.value})} disabled={isSubmitting} className="w-full px-4 py-3 text-lg" />
                        </div>
                        
                        {/* Anonymous Option */}
                        <div className="flex items-center gap-3 mb-6">
                             <Checkbox id="anonymous" checked={isAnonymous} onCheckedChange={setIsAnonymous} disabled={isSubmitting} className="w-5 h-5"/>
                             <label htmlFor="anonymous" className="text-gray-700">Make this donation anonymous</label>
                        </div>
                        
                        {/* Summary */}
                        <div className="bg-blue-50 rounded-xl p-5 mb-6 border border-blue-100">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-semibold text-gray-800">
                                  Your {donationType === 'recurring' ? `${frequency} ` : ''}Donation:
                                </span>
                                <span className="text-3xl font-bold text-pink-500">${getFinalAmount.toFixed(2)}</span>
                            </div>
                             {donationType === 'recurring' && <p className="text-sm text-gray-600">This amount will be charged {frequency}.</p>}
                        </div>
                        
                        {/* Submit Button */}
                        <Button onClick={handleDonateClick} disabled={getFinalAmount <= 0 || (!isAnonymous && !donorInfo.name) || !donorInfo.email || isSubmitting} className={`w-full py-4 text-xl font-semibold rounded-xl text-white shadow-lg hover:shadow-xl disabled:cursor-not-allowed transition-all ${paymentMethod === 'paypal' ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300' : 'bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300'}`}>
                            {isSubmitting ? 'Processing...' : `Donate $${getFinalAmount.toFixed(2)}`}
                        </Button>

                    </div>
                </div>
            </div>

            <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Your Donation</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p dangerouslySetInnerHTML={{ __html: `You're about to donate <strong>$${getFinalAmount.toFixed(2)}</strong> ${donationType === 'recurring' ? `(${frequency})` : 'as a one-time donation'}.` }}></p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowConfirmDialog(false)} disabled={isSubmitting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? 'Processing...' : 'Confirm'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

// App component to render the form
export default function App() {
  return <DonationForm />;
}
