<?php

namespace App\Http\Controllers;

use App\Models\Caregiver;
use App\Models\KitchenPartner;
use App\Models\Member;
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
            'users' => User::with('userable')
                ->get()
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'email' => $user->email,
                        'name' => $this->userName($user),
                        'type' => $user->userable_type,
                    ];
                }),
            'unverifiedMembers' => Member::where('verified', false)
                ->get()
                ->map(function ($member) {
                    return [
                        'id' => $member->id,
                        'birth_date' => $member->birth_date,
                        'first_name' => $member->first_name,
                        'last_name' => $member->last_name,
                        'proof_of_identity' => $member->proof_of_identity,
                        'medical_condition' => $member->medical_condition,
                    ];
                }),
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
        if ($user->userable_type == 'kitchen partner') {
            $request->validate([
                'org_name' => 'required|string|max:255',
            ]);

            $user->userable->org_name = $request->org_name;
        } else {
            $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
            ]);

            $user->userable->first_name = $request->first_name;
            $user->userable->last_name = $request->last_name;
        }
        $user->userable->save();

        $user->location_lat = $request->location_lat;
        $user->location_lng = $request->location_lng;
        $user->save();

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
            & $user->delete();
        });

        return back()->with('message', 'User has been deleted');
    }

    public function userName(User $user)
    {
        if ($user->userable_type == 'kitchen partner') {
            return $user->userable->org_name;
        } else {
            return $user->userable->first_name.' '.$user->userable->last_name;
        }
    }
}
