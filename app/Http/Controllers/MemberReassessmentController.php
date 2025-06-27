<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MemberReassessmentController extends Controller
{
    public function index()
    {
        $member = Auth::user()->userable;

        $reassessments = $member
            ->reassessments()
            ->latest()
            ->get();

        return Inertia::render('Member/Reassessments', [
            'reassessments' => $reassessments,
        ]);
    }
}
