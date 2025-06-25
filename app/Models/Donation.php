<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Donation extends Model
{
    use HasFactory;

    protected $fillable = [
        'donor_name',
        'donor_email',
        'amount',
        'currency',
        'donation_type',
        'frequency',
        'donor_message',
        'is_anonymous',
        'payment_method',
        'status',
        'payment_details',
        'payment_metadata',
        'payment_date',
        'next_payment_date',
        'cancelled_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'payment_details' => 'array',
        'payment_metadata' => 'array',
        'payment_date' => 'datetime',
        'next_payment_date' => 'datetime',
        'cancelled_at' => 'datetime',
        'is_anonymous' => 'boolean',
    ];

    /**
     * Set the next payment date for a recurring donation.
     */
    public function setNextPaymentDate()
    {
        if ($this->donation_type === 'recurring' && $this->frequency) {
            $date = $this->payment_date ? $this->payment_date->copy() : now();

            switch ($this->frequency) {
                case 'monthly':
                    $date->addMonth();
                    break;
                case 'quarterly':
                    $date->addMonths(3);
                    break;
                case 'yearly':
                    $date->addYear();
                    break;
            }
            $this->next_payment_date = $date;
            $this->save();
        }
    }

    /**
     * Mark the donation as completed.
     */
    public function markAsCompleted()
    {
        $this->status = 'completed';
        $this->payment_date = now();
        $this->save();
    }
}
