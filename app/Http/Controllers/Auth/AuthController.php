<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'user_type' => 'required|in:member,caregiver,partner,volunteer,donor',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:500',
            'emergency_contact' => 'nullable|string|max:255',
            'dietary_requirements' => 'nullable|string|max:500',
            'medical_conditions' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'user_type' => $request->user_type,
                'phone' => $request->phone,
                'address' => $request->address,
                'emergency_contact' => $request->emergency_contact,
                'dietary_requirements' => $request->dietary_requirements,
                'medical_conditions' => $request->medical_conditions,
                'email_verification_token' => Str::random(64),
                'status' => 'pending_verification',
            ]);

            // Send verification email
            $this->sendVerificationEmail($user);

            return response()->json([
                'success' => true,
                'message' => 'Registration successful. Please check your email for verification.',
                'user' => $user->makeHidden(['password', 'email_verification_token']),
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Registration failed. Please try again.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'errors' => $validator->errors(),
            ], 422);
        }

        if (! Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        $user = Auth::user();

        if ($user->status !== 'active') {
            Auth::logout();

            return response()->json([
                'success' => false,
                'message' => 'Account not verified or inactive. Please verify your email.',
            ], 401);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'user' => $user->makeHidden(['password']),
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'success' => true,
            'user' => $request->user()->makeHidden(['password']),
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();
        $token = Str::random(64);

        $user->update([
            'password_reset_token' => $token,
            'password_reset_expires_at' => Carbon::now()->addHour(),
        ]);

        // Send password reset email
        $this->sendPasswordResetEmail($user, $token);

        return response()->json([
            'success' => true,
            'message' => 'Password reset link sent to your email',
        ]);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)
            ->where('password_reset_token', $request->token)
            ->where('password_reset_expires_at', '>', Carbon::now())
            ->first();

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired reset token',
            ], 400);
        }

        $user->update([
            'password' => Hash::make($request->password),
            'password_reset_token' => null,
            'password_reset_expires_at' => null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Password reset successfully',
        ]);
    }

    public function verifyEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string',
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)
            ->where('email_verification_token', $request->token)
            ->first();

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid verification token',
            ], 400);
        }

        $user->update([
            'email_verified_at' => Carbon::now(),
            'email_verification_token' => null,
            'status' => 'active',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Email verified successfully',
        ]);
    }

    private function sendVerificationEmail($user)
    {
        // Implementation for sending verification email
        // You can use Laravel's Mail facade here
    }

    private function sendPasswordResetEmail($user, $token)
    {
        // Implementation for sending password reset email
        // You can use Laravel's Mail facade here
    }
}

// ==================================================
// DATABASE MIGRATION - CREATE_USERS_TABLE
// ==================================================

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('user_type', ['member', 'caregiver', 'partner', 'volunteer', 'donor']);
            $table->string('phone');
            $table->text('address');
            $table->string('emergency_contact')->nullable();
            $table->text('dietary_requirements')->nullable();
            $table->text('medical_conditions')->nullable();
            $table->enum('status', ['pending_verification', 'active', 'inactive', 'suspended'])->default('pending_verification');
            $table->string('email_verification_token')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password_reset_token')->nullable();
            $table->timestamp('password_reset_expires_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
