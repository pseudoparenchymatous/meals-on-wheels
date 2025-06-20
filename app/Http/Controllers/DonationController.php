<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Donation;
use Inertia\Inertia;

class DonationController extends Controller
{
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

        if ($donation->donation_type === 'recurring') {
            $donation->setNextPaymentDate();
        }

        return back()->with('success', 'Donation submitted successfully!');
    }

    public function index()
    {
        $donations = Donation::latest()->paginate(10);
        return Inertia::render('Donations/Index', [
            'donations' => $donations
        ]);
    }

    public function show(Donation $donation)
    {
        return Inertia::render('Donations/Show', [
            'donation' => $donation
        ]);
    }

    // Add this method for donor management
    public function manage()
    {
        $donations = Donation::orderBy('created_at', 'desc')->get();
        
        // Calculate stats
        $stats = [
            'total_donors' => $donations->count(),
            'total_amount' => $donations->sum('amount'),
            'recurring_donors' => $donations->where('donation_type', 'recurring')->count(),
            'recent_donors' => $donations->where('created_at', '>=', now()->subDays(30))->count(),
        ];

        return Inertia::render('Admin/DonorManagement', [
            'donors' => $donations,
            'stats' => $stats
        ]);
    }

    // Add delete method
    public function destroy(Donation $donation)
    {
        $donation->delete();
        
        return redirect()->back()->with('success', 'Donor record deleted successfully.');
    }

    private function processPayment(Donation $donation)
    {
        $donation->markAsCompleted();
        return [
            'success' => true,
            'payment_url' => null
        ];
    }
}