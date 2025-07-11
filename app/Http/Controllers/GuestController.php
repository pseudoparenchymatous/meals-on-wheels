<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class GuestController extends Controller
{
    public function home(): Response|RedirectResponse
    {
        if (auth()->user()) {
            return to_route('dashboard');
        }

        return Inertia::render('Home');
    }

    public function about(): Response
    {
        return Inertia::render('About');
    }

    public function contact(): Response
    {
        return Inertia::render('Contact');
    }

    public function donation(): Response
    {
        return Inertia::render('Donation');
    }
}
