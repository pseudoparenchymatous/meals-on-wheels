<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Caregiver;
use App\Models\Member;
use App\Models\User;
use App\Models\Partner;
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
    public function store(Request $request): RedirectResponse
    {
        $userRules = [
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:255',
        ];

        if ($request->user_type === 'member') {
            $userRules['birthday'] = 'required|date|before:today|after:1900-01-01';
        }

        if ($request->user_type !== 'partner') {
            $userRules['first_name'] = 'required|string|max:255';
            $userRules['last_name'] = 'required|string|max:255';
        }

        $request->validate($userRules);

        $this->validateByUserType($request);

        DB::transaction(function () use ($request) {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name'=> $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'address' => $request->address,
            ]);

            $this->createUserType($user, $request);

            event(new Registered($user));

            Auth::login($user);
        });

        return to_route('dashboard');
    }

    public function validateByUserType(Request $request)
    {
        if ($request->user_type == 'caregiver') {
            Validator::make($request->all(),[
                'member.first_name' => 'required|string|max:255|exists:users,first_name',
                'member.last_name' => 'required|string|max:255|exists:users,last_name',
            ], [
                'member.first_name.exists' => 'Could not find this name as a registerd member',
                'member.last_name.exists' => 'Could not find this name as a registerd member',
            ])->validate();
        }

        $rules = match($request->user_type) {
            'member' => [
                'diet' => 'nullable|in:vegetarian,vegan,halal,lactose_intolerant,diabetic',
            ],
            'caregiver' => [],
            'partner' => [
                'org_name' => 'required|string|max:255',
                'partner_service' => 'required|in:kitchen,delivery',
            ],
            'volunteer' => [
                'volunteer_service' => 'required|in:kitchen_staff,rider',
            ],
        };

        $request->validate($rules);
    }

    public function createUserType(User $user, Request $request)
    {
        match($request->user_type) {
            'member' => Member::create([
                'user_id' => $user->id,
                'diet' => $request->diet,
            ]),
            'caregiver' => Caregiver::create([
                'user_id' => $user->id,
                'member_id' => User::firstWhere('first_name', $request->member["first_name"])
                    ->firstWhere('last_name', $request->member["last_name"])
                    ->member
                    ->id,
            ]),
            'partner' => Partner::create([
                'user_id' => $user->id,
                'org_name' => $request->org_name,
                'service' => $request->partner_service,
            ]),
            'volunteer' => Volunteer::create([
                'user_id' => $user->id,
                'service' => $request->volunteer_service,
            ]),
        };
    }
}
