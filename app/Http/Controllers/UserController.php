<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Users', [
            'users' => User::with('userable')->get(),
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/EditUser', [
            'user' => $user->load('userable'),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $user->userable->first_name = $request->first_name;
        $user->userable->last_name = $request->last_name;
        $user->userable->save();

        return back()->with('message', 'User has been updated');
    }
}
