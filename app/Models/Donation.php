<?php

// app/Models/Donation.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'donor_name',
        'donor_email',
        'amount',
        'currency',
        'donation_type',
        'frequency',
        'status',
        'payment_method',
        'payment_id',
        'payment_intent_id',
        'transaction_id',
        'donor_message',
        'is_anonymous',
        'payment_metadata',
        'processed_at',
        'next_payment_date',
        'receipt_url',
        'failure_reason',
        'fee_amount',
        'net_amount',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'fee_amount' => 'decimal:2',
        'net_amount' => 'decimal:2',
        'is_anonymous' => 'boolean',
        'payment_metadata' => 'array',
        'processed_at' => 'datetime',
        'next_payment_date' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function generateTransactionId(): string
    {
        return 'TXN-' . strtoupper(uniqid()) . '-' . time();
    }
}