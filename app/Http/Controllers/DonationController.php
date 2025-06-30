<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonationController extends Controller
{
    /**
     * Store a newly created donation in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'donor_name' => 'required|string|max:255',
            'donor_email' => 'required|email|max:255',
            'amount' => 'required|numeric|min:1|max:99999999.99',
            'currency' => 'string|size:3',
            'donation_type' => 'required|in:one_time,recurring',
            'frequency' => 'nullable|required_if:donation_type,recurring|in:monthly,quarterly,yearly',
            'donor_message' => 'nullable|string|max:1000',
            'is_anonymous' => 'boolean',
            'payment_method' => 'required|in:stripe,paypal',
            'status' => 'string|in:pending,completed,failed,cancelled,refunded',
        ]);

        $validated['currency'] = $validated['currency'] ?? 'USD';
        $validated['status'] = $validated['status'] ?? 'pending';
        $validated['is_anonymous'] = $validated['is_anonymous'] ?? false;

        $donation = Donation::create($validated);

        // Process the payment (placeholder for real payment gateway integration)
        $paymentResult = $this->processPayment($donation);

        if ($paymentResult['success'] && $donation->donation_type === 'recurring') {
            $donation->setNextPaymentDate();
        }

        return back()->with('success', 'Donation submitted successfully!');
    }

    /**
     * Display a listing of the donations.
     */
    public function index()
    {
        $donations = Donation::latest()->paginate(10);

        return Inertia::render('Donations/Index', [
            'donations' => $donations,
        ]);
    }

    /**
     * Display the specified donation.
     */
    public function show(Donation $donation)
    {
        return Inertia::render('Donations/Show', [
            'donation' => $donation,
        ]);
    }

    /**
     * Show the donor management dashboard.
     */
    public function manage()
    {
        $donations = Donation::orderBy('created_at', 'desc')->get();

        $stats = [
            'total_donors' => $donations->count(),
            'total_amount' => $donations->sum('amount'),
            
            'recurring_donors' => $donations->where('donation_type', 'recurring')->where('status', 'pending')->count(),
            'recent_donors' => $donations->where('created_at', '>=', now()->subDays(30))->count(),
        ];

        return Inertia::render('Admin/DonorManagement', [
            'donors' => $donations,
            'stats' => $stats,
        ]);
    }

    /**
     * Update the specified donation in storage.
     */
    public function update(Request $request, Donation $donation)
    {
        $validated = $request->validate([
            'donor_name' => 'sometimes|required|string|max:255',
            'donor_email' => 'sometimes|required|email|max:255',
            'amount' => 'sometimes|required|numeric|min:1|max:99999999.99',
            'frequency' => 'nullable|in:monthly,quarterly,yearly',
            'next_payment_date' => 'nullable|date',
        ]);

        $donation->update($validated);

        return redirect()->back()->with('success', 'Recurring donation updated successfully!');
    }

    /**
     * Remove the specified donation from storage.
     */
    public function destroy(Donation $donation)
    {
        $donation->delete();

        return redirect()->back()->with('success', 'Donor record deleted successfully.');
    }

    /**
     * Cancel a recurring donation.
     */
    public function cancel(Donation $donation)
    {
        if ($donation->donation_type === 'recurring') {
            $donation->update([
                'status' => 'cancelled',
                'cancelled_at' => now(),
                'next_payment_date' => null,
            ]);

            return redirect()->back()->with('success', 'Recurring donation cancelled successfully.');
        }

        return redirect()->back()->with('error', 'This is not a recurring donation.');
    }

    /**
     * A placeholder for processing payments.
     */
    private function processPayment(Donation $donation)
    {
        // Simulate a successful payment
        $donation->markAsCompleted(); // Sets status to 'completed'

        // No need to change to 'active'
        // For recurring, it will be considered completed per cycle
        return [
            'success' => true,
            'payment_url' => null,
        ];
    }
}
