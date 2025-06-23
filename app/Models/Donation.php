<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
    ];

    public function setNextPaymentDate()
    {
        if ($this->donation_type === 'recurring' && $this->frequency) {
            $date = now();
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

    public function markAsCompleted()
    {
        $this->status = 'completed';
        $this->payment_date = now();
        $this->save();
    }
}
