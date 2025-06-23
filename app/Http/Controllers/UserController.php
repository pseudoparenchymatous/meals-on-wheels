<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Caregiver;
use App\Models\KitchenPartner;
use App\Models\Rider;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function destroy(User $user)
    {

        DB::transaction(function () use (&$user) {
            $userable = $user->userable;

            match ($user->userable_type) {
                'caregiver' => Caregiver::destroy($userable->id),
                'member' => Member::destroy($userable->id),
                'rider' => Rider::destroy($userable->id),
                'kitchen partner' => KitchenPartner::destroy($userable->id),
            }
            &$user->delete();
        });

        return back()->with('message', 'User has been deleted');
    }
}
