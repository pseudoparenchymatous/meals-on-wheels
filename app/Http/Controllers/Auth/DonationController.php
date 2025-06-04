<?php

// app/Http/Controllers/DonationController.php
namespace App\Http\Controllers;

use App\Models\Donation;
use App\Http\Requests\StoreDonationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function index()
    {
        return Inertia::render('Donations/Index');
    }

    public function store(StoreDonationRequest $request)
    {
        try {
            DB::beginTransaction();

            $donation = new Donation();
            $donation->user_id = auth()->id(); // null if guest
            $donation->donor_name = $request->donor_name;
            $donation->donor_email = $request->donor_email;
            $donation->amount = $request->amount;
            $donation->currency = $request->currency ?? 'USD';
            $donation->donation_type = $request->donation_type ?? 'one_time';
            $donation->donor_message = $request->donor_message;
            $donation->is_anonymous = $request->is_anonymous ?? false;
            $donation->status = 'pending';
            $donation->transaction_id = $donation->generateTransactionId();

            $donation->save();

            // Here you would integrate with payment processor
            // For now, we'll simulate successful payment
            $paymentResult = $this->processPayment($donation, $request);

            if ($paymentResult['success']) {
                $donation->update([
                    'status' => 'completed',
                    'payment_method' => $paymentResult['method'],
                    'payment_id' => $paymentResult['payment_id'],
                    'processed_at' => now(),
                    'net_amount' => $donation->amount - ($paymentResult['fee'] ?? 0),
                    'fee_amount' => $paymentResult['fee'] ?? 0,
                ]);

                DB::commit();

                return response()->json([
                    'success' => true,
                    'message' => 'Thank you for your donation!',
                    'donation' => $donation->load('user'),
                    'redirect_url' => route('donations.success', $donation->transaction_id)
                ]);
            } else {
                $donation->update([
                    'status' => 'failed',
                    'failure_reason' => $paymentResult['error']
                ]);

                DB::commit();

                return response()->json([
                    'success' => false,
                    'message' => 'Payment failed: ' . $paymentResult['error']
                ], 422);
            }

        } catch (\Exception $e) {
            DB::rollback();
            Log::error('Donation processing failed: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'An error occurred while processing your donation. Please try again.'
            ], 500);
        }
    }

    public function success($transactionId)
    {
        $donation = Donation::where('transaction_id', $transactionId)->firstOrFail();
        
        return Inertia::render('Donations/Success', [
            'donation' => $donation
        ]);
    }

    public function userDonations()
    {
        $donations = auth()->user()->donations()
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Donations/UserDonations', [
            'donations' => $donations
        ]);
    }

    private function processPayment(Donation $donation, Request $request): array
    {
        // This is where you'd integrate with Stripe, PayPal, etc.
        // For demo purposes, we'll simulate a successful payment
        
        // Simulate processing time
        usleep(500000); // 0.5 seconds

        // Simulate success/failure (90% success rate)
        $isSuccess = rand(1, 10) <= 9;

        if ($isSuccess) {
            return [
                'success' => true,
                'method' => 'stripe', // or whatever payment method
                'payment_id' => 'pi_' . uniqid(),
                'fee' => $donation->amount * 0.029 + 0.30, // Stripe-like fees
            ];
        } else {
            return [
                'success' => false,
                'error' => 'Payment declined by bank'
            ];
        }
    }
}