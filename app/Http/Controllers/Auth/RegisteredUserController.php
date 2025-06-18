<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Caregiver;
use App\Models\KitchenPartner;
use App\Models\Member;
use App\Models\User;
use App\Models\Volunteer;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $userRules = [
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
        ];

        if ($request->user_type !== 'kitchen partner') {
            $userRules['first_name'] = 'required|string|max:255';
            $userRules['last_name'] = 'required|string|max:255';
        }

        $request->validate($userRules);

        $this->validateByUserType($request);

        DB::transaction(function () use ($request) {
            $createdUserType = $this->createUserType($request);

            $user = $createdUserType->user()->create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'address' => $request->address,
            ]);

            event(new Registered($user));
        });

        return to_route('home');
    }

    public function validateByUserType(Request $request)
    {
        if ($request->user_type == 'caregiver') {
            Validator::make($request->all(), [
                'member.first_name' => 'required|string|max:255|exists:users,first_name',
                'member.last_name' => 'required|string|max:255|exists:users,last_name',
            ], [
                'member.first_name.exists' => 'Could not find this name as a registerd member',
                'member.last_name.exists' => 'Could not find this name as a registerd member',
            ])->validate();
        }

        $rules = match ($request->user_type) {
            'member' => [
                'birth_date' => 'required|date|before:today',
                'proof_of_identity' => 'required|file',
                'medical_condition' => 'nullable|file',
                'diet' => 'nullable|in:vegetarian,vegan,halal,lactose_intolerant,diabetic',
            ],
            'caregiver' => [],
            'kitchen partner' => [
                'org_name' => 'required|string|max:255',
            ],
            'volunteer' => [
                'volunteer_service' => 'required|in:kitchen_staff,rider',
            ],
            'admin' => [],
        };

        $request->validate($rules);
    }

    public function createUserType(Request $request)
    {
        return match ($request->user_type) {
            'member' => Member::create([
                'birth_date' => $request->birth_date,
                'proof_of_identity' => $request->file('proof_of_identity')->store(),
                'medical_condition' => $request->file('medical_condition')?->store(),
                'diet' => $request->diet,
            ]),
            'caregiver' => Caregiver::create([
                'member_id' => User::firstWhere('first_name', $request->member['first_name'])
                    ->firstWhere('last_name', $request->member['last_name'])
                    ->userable
                    ->id,
            ]),
            'kitchen partner' => KitchenPartner::create([
                'org_name' => $request->org_name,
            ]),
            'volunteer' => Volunteer::create([
                'service' => $request->volunteer_service,
            ]),
            'admin' => Admin::create(),
        };
    }
}
